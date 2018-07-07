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

const menus = document.querySelectorAll('a.menu');
for (let i = 0; i < menus.length; ++i) {
  //menus[i].classList.remove('active');
  const menu = menus[i];
  menu.onclick = (event) => {
    event.preventDefault();
    history.pushState(null, '', menu.href);
    app.run('/', menu.pathname);
  };
}

const view = (state) => state;

const update = {
  '/': async (_, path) => {
    const json = await get(path);
    return json;
  }
};

app.start('my-app', null, view, update);