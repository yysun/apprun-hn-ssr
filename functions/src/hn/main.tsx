import app from 'apprun';

const view = (children) => <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>AppRun - HN - SSR</title>
    <style>{`
      *{box-sizing:border-box;margin:0;padding:0}body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;line-height:1.42857143;color:#333;background-color:#fff;overflow:scroll}a{color:#337ab7;text-decoration:none;background-color:transparent}ul{padding:0;list-style:none}.inner{padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width: 992px){.inner{width:970px}}@media (min-width: 768px){.inner{width:750px}}.hn .header{position:fixed;background-color:#faffe6;top:0px;width:100%;padding:10px 0}.hn .main{padding:50px 0px}.hn .footer{position:fixed;background-color:#fff;right:0;bottom:0;left:0;padding:1rem}.hn .story-list li{padding:10px 0}.hn .score{color:#666;font-size:1.1em;font-weight:700;width:60px;height:60px;text-align:center;float:left;padding-top:10px}.hn .meta{color:#aaa;white-space:nowrap}.hn .meta a{color:#096;cursor:pointer}.hn .comment{padding:5px 0 5px 10px;border-left:1px solid #eeeeee}.hn .text{padding:10px 0}.hn .toggle{color:#096;padding-bottom:10px;cursor:pointer}.hn .collapsed{display:none}.hn .toggle:before{content:' [-] '}.hn .toggle.closed:before{content:' [+] '}.hn .toggle.closed:after{content:' (...)'}.hn .more{margin-top:20px;margin-left:20px}.hn .more a{cursor:pointer;padding-bottom:150px}
    `}
    </style>
  </head>
  <body>
    <div id="my-app">
      {children || ''}
    </div>
    <script src="https://unpkg.com/apprun@latest/dist/apprun.js"></script>
    <script src="spa.js"></script>
  </body>
</html>

export default view;

import './hacker-news';