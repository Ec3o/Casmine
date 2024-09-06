import { defineClientConfig } from 'vuepress/client'
import Plot from 'C:/Users/24993/Desktop/Casmine/Casmine/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.94_typescript@5.5.4_vuepress@2.0.0-rc.15/node_modules/vuepress-plugin-md-power/lib/client/components/Plot.vue'
import FileTreeItem from 'C:/Users/24993/Desktop/Casmine/Casmine/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.94_typescript@5.5.4_vuepress@2.0.0-rc.15/node_modules/vuepress-plugin-md-power/lib/client/components/FileTreeItem.vue'
import '@internal/md-power/file-tree.css'

export default defineClientConfig({
  enhance({ router, app }) {
    app.component('Plot', Plot)
    app.component('FileTreeItem', FileTreeItem)
  }
})
