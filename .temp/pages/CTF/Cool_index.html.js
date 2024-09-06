import comp from "C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/CTF/Cool_index.html.vue"
const data = JSON.parse("{\"path\":\"/CTF/Cool_index.html\",\"title\":\"JavaScript-类型混淆赛题笔记\",\"lang\":\"zh-CN\",\"frontmatter\":{\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[{\"level\":2,\"title\":\"Bypass WAF1\",\"slug\":\"bypass-waf1\",\"link\":\"#bypass-waf1\",\"children\":[{\"level\":3,\"title\":\"关于NaN...\",\"slug\":\"关于nan\",\"link\":\"#关于nan\",\"children\":[]}]},{\"level\":2,\"title\":\"Bypass WAF2\",\"slug\":\"bypass-waf2\",\"link\":\"#bypass-waf2\",\"children\":[]},{\"level\":2,\"title\":\"Bypass WAF3\",\"slug\":\"bypass-waf3\",\"link\":\"#bypass-waf3\",\"children\":[{\"level\":3,\"title\":\"parseInt 函数的工作原理：\",\"slug\":\"parseint-函数的工作原理\",\"link\":\"#parseint-函数的工作原理\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.53,\"words\":1359},\"filePathRelative\":\"CTF/Cool_index.md\",\"categoryList\":[{\"id\":\"59db91\",\"sort\":10001,\"name\":\"CTF\"}]}")
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
