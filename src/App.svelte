<script lang="ts">
  import './i18n';
  import routes from '../.routify/routes.default';
  import {Router} from '@roxi/routify';
</script>

<Router {routes}/>
<style lang="sass">
  @use './themes/common' as *
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap')
  :global(html, body, body div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, figure, footer, header, hgroup, menu, nav, section, time, mark, audio, video)
    margin: 0
    padding: 0
    border: 0
    outline: 0
    font-size: 100%
    vertical-align: baseline
    font-family: Poppins
    box-sizing: border-box
  :global(html, body)
    background-color: $light-background
  @media (prefers-color-scheme: dark)
    :global(html, body)
      background-color: $dark-background
      color: $dark-foreground
  :global(input[type=text]), :global(textarea)
    font-size: 1.5rem
    box-sizing: border-box
    padding: .5em
    border: .1em solid transparent
    background-color: $input-background
    border-radius: .3em
    outline: none
    border-color: $input-border
    &:focus
      border-color: $input-border-focus 
</style>