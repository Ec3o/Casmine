import comp from "C:/Users/24993/Desktop/Casmine/Casmine/.temp/pages/article/cl01mvdv/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/cl01mvdv/\",\"title\":\"羊城杯2024-Writeup\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"羊城杯2024-Writeup\",\"createTime\":\"2024/09/06 12:36:29\",\"tags\":[\"Write-ups\",\"CTF\",\"Web Security\",\"Pickle 反序列化\",\"RCE\"],\"permalink\":\"/article/cl01mvdv/\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[{\"level\":2,\"title\":\"Lyrics For You\",\"slug\":\"lyrics-for-you\",\"link\":\"#lyrics-for-you\",\"children\":[]},{\"level\":2,\"title\":\"任意文件读\",\"slug\":\"任意文件读\",\"link\":\"#任意文件读\",\"children\":[{\"level\":3,\"title\":\"进程信息读取\",\"slug\":\"进程信息读取\",\"link\":\"#进程信息读取\",\"children\":[]},{\"level\":3,\"title\":\"本题利用\",\"slug\":\"本题利用\",\"link\":\"#本题利用\",\"children\":[]}]},{\"level\":2,\"title\":\"源码分析\",\"slug\":\"源码分析\",\"link\":\"#源码分析\",\"children\":[]},{\"level\":2,\"title\":\"Waf绕过\",\"slug\":\"waf绕过\",\"link\":\"#waf绕过\",\"children\":[]},{\"level\":2,\"title\":\"回显Flag\",\"slug\":\"回显flag\",\"link\":\"#回显flag\",\"children\":[{\"level\":3,\"title\":\"思路1:反弹shell\",\"slug\":\"思路1-反弹shell\",\"link\":\"#思路1-反弹shell\",\"children\":[]},{\"level\":3,\"title\":\"思路2:将命令执行结果写入临时文件，配合任意文件读实现回显\",\"slug\":\"思路2-将命令执行结果写入临时文件-配合任意文件读实现回显\",\"link\":\"#思路2-将命令执行结果写入临时文件-配合任意文件读实现回显\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.77,\"words\":1431},\"filePathRelative\":\"CTF/羊城杯2024-Writeup.md\",\"categoryList\":[{\"id\":\"59db91\",\"sort\":10000,\"name\":\"CTF\"}]}")
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
