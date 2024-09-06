export const redirects = JSON.parse("{\"/CTF/DASCTF%20X%20GFCTF%202024%20Cool_index.html\":\"/article/ywmmccvs/\",\"/CTF/Sekai%20CTF%20Writeup.html\":\"/article/h1j75q4w/\",\"/CTF/Web1234.html\":\"/article/nr3skugp/\",\"/CTF/%E7%BE%8A%E5%9F%8E%E6%9D%AF2024-Writeup.html\":\"/article/cl01mvdv/\",\"/preview/custom-component.example.html\":\"/article/z33s27bd/\",\"/preview/markdown.html\":\"/article/140zqqxc/\",\"/notes/demo/bar.html\":\"/demo/4u0rcedv/\",\"/notes/demo/foo.html\":\"/demo/46d6u82j/\",\"/notes/demo/\":\"/demo/\"}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/article/ywmmccvs/", { loader: () => import(/* webpackChunkName: "article_ywmmccvs_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/article/ywmmccvs/index.html.js"), meta: {"title":"DASCTF X GFCTF 2024 Cool_index"} }],
  ["/article/h1j75q4w/", { loader: () => import(/* webpackChunkName: "article_h1j75q4w_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/article/h1j75q4w/index.html.js"), meta: {"title":"Sekai CTF Writeup-Tagless"} }],
  ["/article/nr3skugp/", { loader: () => import(/* webpackChunkName: "article_nr3skugp_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/article/nr3skugp/index.html.js"), meta: {"title":"Web1234"} }],
  ["/article/cl01mvdv/", { loader: () => import(/* webpackChunkName: "article_cl01mvdv_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/article/cl01mvdv/index.html.js"), meta: {"title":"羊城杯2024-Writeup"} }],
  ["/article/z33s27bd/", { loader: () => import(/* webpackChunkName: "article_z33s27bd_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/article/z33s27bd/index.html.js"), meta: {"title":"自定义组件"} }],
  ["/article/140zqqxc/", { loader: () => import(/* webpackChunkName: "article_140zqqxc_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/article/140zqqxc/index.html.js"), meta: {"title":"Markdown"} }],
  ["/demo/4u0rcedv/", { loader: () => import(/* webpackChunkName: "demo_4u0rcedv_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/demo/4u0rcedv/index.html.js"), meta: {"title":"bar"} }],
  ["/demo/46d6u82j/", { loader: () => import(/* webpackChunkName: "demo_46d6u82j_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/demo/46d6u82j/index.html.js"), meta: {"title":"foo"} }],
  ["/demo/", { loader: () => import(/* webpackChunkName: "demo_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/demo/index.html.js"), meta: {"title":"Demo"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/blog/", { loader: () => import(/* webpackChunkName: "blog_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/blog/index.html.js"), meta: {"title":"博客"} }],
  ["/blog/tags/", { loader: () => import(/* webpackChunkName: "blog_tags_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/blog/tags/index.html.js"), meta: {"title":"标签"} }],
  ["/blog/archives/", { loader: () => import(/* webpackChunkName: "blog_archives_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/blog/archives/index.html.js"), meta: {"title":"归档"} }],
  ["/blog/categories/", { loader: () => import(/* webpackChunkName: "blog_categories_index.html" */"C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/blog/categories/index.html.js"), meta: {"title":"分类"} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
