import comp from "C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"pageLayout\":\"home\",\"config\":[{\"type\":\"banner\",\"banner\":\"/06.png\",\"bannerMask\":{\"light\":0.1,\"dark\":0.3},\"hero\":{\"name\":\"Casmine\",\"tagline\":\"For The Deeper and Darker\",\"text\":\"天高地迥，觉宇宙之无穷；兴尽悲来，识盈虚之有数\",\"actions\":[{\"text\":\"Space\",\"link\":\"/blog/\",\"theme\":\"brand\"},{\"text\":\"Github\",\"link\":\"https://github.com/Ec3o\",\"theme\":\"alt\"}]}},{\"type\":\"custom\"}],\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.19,\"words\":58},\"filePathRelative\":\"README.md\",\"categoryList\":[]}")
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
