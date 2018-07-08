import apprun from 'apprun';
import * as viewEngine from 'apprun/viewEngine';
import * as compression from 'compression';
import * as express from 'express';
const app = express();

app.use(compression());
// app.use(express.static('public'));

// set apprun as view engine
app.engine('js', viewEngine());
app.set('view engine', 'js');
app.set('views', __dirname);

// set global ssr flag
app.use((req, res, next) => {
  global['ssr'] = req.headers.accept.indexOf('application/json') < 0;
  next();
});

import layout from './hn/main';

const route = async (req) => new Promise((resolve, reject) => {
  apprun.on('debug', p => {
    if (p.vdom) resolve(p.vdom);
  });
  setTimeout(() => { reject('Timeout') }, 10000);
  try {
    apprun.run('route', '#' + req.path);
  } catch (ex) {
    reject(ex.message);
  }
});

app.get(/^\/(top|new|best|show|ask|job|item)?\/?(\d+)?$/, async (req, res) => {
  try {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=120');
    const vdom = await route(req);
    res.render('view', { layout, vdom });
  } catch (ex) {
    res.set('Cache-Control', 'private');
    res.render('view', { layout, vdom: ex });
  }
});

// const listener = app.listen(process.env.PORT || 3000, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

export default app;