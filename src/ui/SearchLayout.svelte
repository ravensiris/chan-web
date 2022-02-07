<style lang="sass">
    footer
        position: fixed
        bottom: 0
        margin-bottom: .5em
        width: 100%
    .actions
        display: flex
        margin: .5em
        gap: .5em
        justify-content: center
        align-items: stretch
    main
        display: flex
        justify-content: center
        align-items: center
        margin-bottom: 6em
    .wrapper
      width: 100%
</style>

<script lang="ts">
import { goto } from "@roxi/routify";

  import { debounce } from "debounce";

  import Search from "./Search.svelte";

  export let search: string = "";
  let is_fullscreen = false;

  function toggle_fullscreen() {
    if (window.innerHeight < 300) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          is_fullscreen = true;
        })
        .catch(() => {
          is_fullscreen = false;
        });
    } else if (is_fullscreen) {
      document.exitFullscreen();
    }
  }

  const search_click = debounce(toggle_fullscreen, 200);
</script>

<div class="wrapper">
  <main>
    <slot />
  </main>
  <footer>
    <div class="actions">
      <Search bind:value={search} on_click={search_click} />
      <button on:click={$goto("/")}>Home</button>
      <slot name="actions" />
    </div>
  </footer>
</div>
