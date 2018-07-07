import app from 'apprun';
import { getItem, getList } from './api';

const page_size = 30;

function pluralize(number, label) {
  if (!number) number = 0;
  return (number === 1) ? number + label : number + label + 's'
}

function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

const Comment = ({ comment }) => {
  if (!comment) return;
  return <li className='comment'>
    <div className='meta'>
      <span>by {comment.by}</span> |&nbsp;
      <span>{timeAgo(comment.time)} ago</span>
    </div>
    <div className='text'>{`_html:${comment.text}`}</div>
    <Comments item={comment} />
  </li>
}

const Comments = ({ item }) => {
  if (!item || !item.kids) return;
  const list = item.kids;
  const num = item.kids && item.kids.filter(items => !item.deleted && !item.dead).length;
  return <div>
    {num && <div className='toggle'>{pluralize(num, ' comment')} </div>}
    <ul className='comment-list'> {
      list.filter(comment => !comment.deleted)
        .map(comment => <Comment comment={comment} />)
    }
    </ul>
  </div>;
}

const Item = ({ item }) => {
  if (!item) return;
  return <div className='story'>
    <h4><a href={item.url} target="_blank">{item.title}</a></h4>
    {(item.text) && <div className='text'>{`_html:${item.text}`}</div>}
    <div className='meta'>
      <span>{pluralize(item.score, ' point')}</span> |&nbsp;
        <span>by {item.by}</span> |&nbsp;
        <span>{timeAgo(item.time)} ago</span> |&nbsp;
        <span>{pluralize(item.descendants, ' comment')} (in total)  |&nbsp;</span>
      <span><a onclick="history.back()">back</a></span>
    </div>
    <Comments item={item} />
  </div>
}

const ListItem = ({ item, idx }) => {
  if (!item) return;
  const item_link = `/item/${item.id}`;
  return <li>
    <div className={'score'}>{item.score}</div>
    <div><a href={item.url || item_link} target="_blank">{item.title}</a></div>
    <div className='meta'>
      <span>by {item.by}</span> |&nbsp;
        <span>{timeAgo(item.time)} ago</span> |&nbsp;
        <span><a className="menu" href={`${item_link}`}>{pluralize(item.descendants, ' comment')}</a></span>
    </div>
  </li>
}

const List = ({ list }) => {
  if (!list || !list.items) return;
  return <div>
    <ul className='story-list'> {
      list.items.filter((item, i) => i >= list.min && i < list.max && (typeof item !== 'number'))
        .map(item => <ListItem item={item} idx={list.items.indexOf(item) + 1} />)
    }
    </ul>
    <div className='more'>
      <span>{list.min + 1} - {list.max} ({list.items.length}) &nbsp;</span>
      {list.items && list.max < list.items.length ?
        <a className="menu" href={`/${list.type}/${list.max}`}> |&nbsp; More ...</a> : ''}
    </div>
  </div>;
}

const view = state => {
  if (state instanceof Promise) return;
  const style = (type) => ({ 'font-weight': type === state.type ? 'bold' : 'normal' });
  return state.type === 'item' ?
    <Item item={state[state.id]} /> :
    <List list={state[state.type]} />
}

const update = {
  '#': (state, type, id) => {
    type = type || 'top';
    state.type = type;
    if (type === 'item') {
      state.id = id;
      getItem(state);
    } else {
      if (!state[type]) state[type] = { type, min: 0, max: page_size, items: [] };
      else {
        const max = parseInt(id) || 0;
        state[type].max = Math.min(max + page_size, state[type].items.length);
      }
      getList(state);
    }
  },
  'render': state => state,
}

app.start(null, {}, view, update);



