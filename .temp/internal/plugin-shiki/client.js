
import { useCopyCode } from 'C:/Users/24993/Desktop/Casmine/Casmine/node_modules/.pnpm/@vuepress-plume+plugin-shikiji@1.0.0-rc.94_typescript@5.5.4_vue@3.5.2_vuepress@2.0.0-rc.15/node_modules/@vuepress-plume/plugin-shikiji/lib/client/composables/copy-code.js'
import { useCollapsedLines } from 'C:/Users/24993/Desktop/Casmine/Casmine/node_modules/.pnpm/@vuepress-plume+plugin-shikiji@1.0.0-rc.94_typescript@5.5.4_vue@3.5.2_vuepress@2.0.0-rc.15/node_modules/@vuepress-plume/plugin-shikiji/lib/client/composables/collapsed-lines.js'

export default {
  
  setup() {
    useCopyCode({
      selector: __CC_SELECTOR__,
      duration: __CC_DURATION__,
    })
    useCollapsedLines()
  },
}
