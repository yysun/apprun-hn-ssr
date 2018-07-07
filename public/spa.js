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