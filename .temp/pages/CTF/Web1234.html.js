import comp from "C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/CTF/Web1234.html.vue"
const data = JSON.parse("{\"path\":\"/CTF/Web1234.html\",\"title\":\"Web1234复现题解\",\"lang\":\"zh-CN\",\"frontmatter\":{\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[{\"level\":2,\"title\":\"源码\",\"slug\":\"源码\",\"link\":\"#源码\",\"children\":[{\"level\":3,\"title\":\"class.php\",\"slug\":\"class-php\",\"link\":\"#class-php\",\"children\":[]},{\"level\":3,\"title\":\"index.php\",\"slug\":\"index-php\",\"link\":\"#index-php\",\"children\":[]},{\"level\":3,\"title\":\"分析&题解\",\"slug\":\"分析-题解\",\"link\":\"#分析-题解\",\"children\":[]},{\"level\":3,\"title\":\"反序列化链路挖掘\",\"slug\":\"反序列化链路挖掘\",\"link\":\"#反序列化链路挖掘\",\"children\":[]}]}],\"readingTime\":{\"minutes\":3.04,\"words\":912},\"filePathRelative\":\"CTF/Web1234.md\",\"categoryList\":[{\"id\":\"59db91\",\"sort\":10001,\"name\":\"CTF\"}]}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
