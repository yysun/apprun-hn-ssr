import * as firebase from 'firebase-admin';
import * as functions from 'firebase-functions';

firebase.initializeApp(
  functions.config().firebase
);

const db = firebase.database().ref('/v0');

const fetch = async (path): Promise<any> => {
  const ref = db.child(path);
  return new Promise((resolve, reject) => {
    ref.once('value', snapshot => resolve(snapshot.val()), reject);
  })
}

export const getItem = async id => {
  const item = await fetch(`item/${id}`);
  if (item && item.kids) item.kids = await Promise.all(item.kids.map(async kid => {
    return typeof kid === 'number' ?
      await getItem(kid) : kid
  }));
  return item;
}

export const getList = async (type, list) => {
  if (!list.items.length) list.items = await fetch(`${type}stories`);
  list.items = await Promise.all(list.items.map(async (id, idx) => {
    return (idx >= list.min && idx < list.max && (typeof id === 'number')) ?
      await fetch(`item/${id}`) : id
  }));
};



