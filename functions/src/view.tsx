declare var global;
export default ({ layout, vdom, path }) => global.ssr ? layout(vdom, path) : vdom;