import app from 'apprun';

const view = (children, path='') => {
  const active = (href) => path === href ? ' active' : '';
  return <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>AppRun - HN - SSR</title>
      <style>{`
      *{box-sizing:border-box;margin:0;padding:0}body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;line-height:1.42857143;color:#333;background-color:#fff;overflow:scroll}a{color:#337ab7;text-decoration:none;background-color:transparent}ul{padding:0;list-style:none}.inner{padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width: 992px){.inner{width:970px}}@media (min-width: 768px){.inner{width:750px}}.hn .header{position:fixed;background-color:#faffe6;top:0px;width:100%;padding:10px 0}.hn .main{padding:50px 0px}.hn .footer{position:fixed;background-color:#fff;right:0;bottom:0;left:0;padding:1rem}.hn .story-list li{padding:10px 0}.hn .score{color:#666;font-size:1.1em;font-weight:700;width:60px;height:60px;text-align:center;float:left;padding-top:10px}.hn .meta{color:#aaa;white-space:nowrap}.hn .meta a{color:#096;cursor:pointer}.hn .comment{padding:5px 0 5px 10px;border-left:1px solid #eeeeee}.hn .text{padding:10px 0}.hn .toggle{color:#096;padding-bottom:10px;cursor:pointer}.hn .collapsed{display:none}.hn .toggle:before{content:' [-] '}.hn .toggle.closed:before{content:' [+] '}.hn .toggle.closed:after{content:' (...)'}.hn .more{margin-top:20px;margin-left:20px}.hn .more a{cursor:pointer;padding-bottom:150px} a.active{font-weight:bold}
    `}
      </style>
    </head>
    <body>
      <div className="hn">
        <div className='header'>
          <div className='inner'>
            <div style={{ 'float': 'left' }}>
              <span style={{ 'margin-right': '20px' }}>
                <a href='/'>AppRun&#10084;HN</a>
              </span>
              <a className={`menu${active('/top')} ${active('/')}`} href={`/top`}>Top</a>{' | '}
              <a className={`menu${active('/new')}`} href={`/new`}>New</a> {' | '}
              <a className={`menu${active('/best')}`} href={`/best`}>Best</a> {' | '}
              <a className={`menu${active('/show')}`} href={`/show`}>Show</a> {' | '}
              <a className={`menu${active('/ask')}`} href={`/ask`}>Ask</a> {' | '}
              <a className={`menu${active('/job')}`} href={`/job`}>Jobs</a>
            </div>
          </div>
        </div>
        <div className='main'>
          <div className='inner' id="my-app">
            {children || ''}
          </div>
        </div>
        <div className='footer'>
          <div className='inner'>
            Powered by <a href='https://github.com/yysun/apprun'>AppRun</a>,
            Source code: <a href='https://github.com/yysun/apprun-hn'>Github</a>
            &nbsp; {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
      <script src="apprun.js"></script>
      <script>{`
const get = async (url) => {
  const response = await fetch(url,
    { headers: { accept: 'application/json' } });
  if (!response.ok) {
    const data = await response.text();
    throw data;
  }
  return response.json();
}

window.addEventListener('popstate', (e) => {
  const path = document.location.pathname;
  app.run('/', path);
});

document.body.addEventListener('click', e => {
  const t = e.target;
  if (t.matches('.toggle')) {
    t.classList.toggle('closed');
    t.nextElementSibling && t.nextElementSibling.classList.toggle('collapsed');
  } else if (t.matches('.menu')) {
    e.preventDefault();
    history.pushState(null, '', t.href);
    app.run('/', t.pathname);
    const menus = document.querySelectorAll('a.menu');
    for (let i = 0; i < menus.length; ++i) menus[i].classList.remove('active');
    t.classList.add('active');
  }
});

const view = (state) => state;

const update = {
  '/': async (_, path) => {
    const json = await get(path);
    return json;
  }
};

app.start('my-app', null, view, update);
      `}</script>
    </body>
  </html>
}

export default view;

import './hacker-news';