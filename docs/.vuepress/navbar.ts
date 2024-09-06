import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: 'Home', link: '/' },
  { text: 'Blog', link: '/blog/' },
  { text: 'Labels', link: '/blog/tags/' },
  { text: 'Archives', 
    items:[
      {text: 'CTF WriteUps', link: '/notes/demo/README.md'},
      {text: 'The Magic Of Life', link: '/notes/demo/README.md'}
    ]},
  {
    text: 'Notes',
    items: [{ text: 'Example', link: '/notes/demo/README.md' }]
  },
])
