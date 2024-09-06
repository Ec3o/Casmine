import './articleTagColors.css'
export const articleTagColors = {"Write-ups":"j263","CTF":"uu7h","Web Security":"zvoz","XSS":"j263","Pickle 反序列化":"50ko","RCE":"j263","预览":"fe8c","组件":"4y95","markdown":"tgrz"}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateArticleTagColors) {
    __VUE_HMR_RUNTIME__.updateArticleTagColors(articleTagColors)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ articleTagColors }) => {
    __VUE_HMR_RUNTIME__.updateArticleTagColors(articleTagColors)
  })
}
