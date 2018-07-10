import * as viewEngine from 'apprun/viewEngine';
import * as compression from 'compression';
import * as express from 'express';
const app = express();

app.use(compression());

// set apprun as view engine
app.engine('js', viewEngine());
app.set('view engine', 'js');
app.set('views', __dirname + '/hn');

import hn from './hn/hacker-news';

const route = async (req) => new Promise((resolve) => {
  const params = req.path.split('/');
  params[0] = vdom => resolve(vdom);
  hn.run('#', ...params);
});

app.get(/^\/(top|new|best|show|ask|job|item)?\/?(\d+)?$/, async (req, res) => {
  const ssr = req.headers.accept.indexOf('application/json') < 0;
  try {
    if (global['ssr']) res.set('Cache-Control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=120');
    const vdom = await route(req);
    res.render('layout', { ssr, vdom, path: req.path });
  } catch (ex) {
    res.set('Cache-Control', 'private');
    res.render('layout', { ssr, vdom: ex });
  }
});

// // for testing
// app.use(express.static('public'));
// const listener = app.listen(process.env.PORT || 3000, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

export default app;