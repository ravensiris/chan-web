<style lang="sass">
  @use "../themes/common" as *
  .boards
    display: grid
    column-gap: .5em
    row-gap: .5em
    width: calc(100% - 1em)
    max-width: 1200px
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))

  .boards-wrapper
    margin-top: .5em
    width: 100%
    display: flex
    justify-content: center
    overflow-y: auto
    
  input
    position: fixed
    bottom: 0
    font-size: 1.5rem
    padding: .5em
    max-width: 800px
    width: calc(100% - 1em)
    box-sizing: border-box
    align-self: center
    margin: .5em 0
    border: .1em solid transparent
    background-color: $input-background
    border-radius: .3em
    outline: none
    &:focus
      border-color: $input-border-focus 

  .bottom
    display: flex
    justify-content: center

</style>

<script lang="ts">
  import BoardSelect from "../ui/BoardSelect.svelte";
  import Board from "../api/board";
  import Fuse from "fuse.js";
  import debounce from "debounce";

  const search_opts: Fuse.IFuseOptions<Board> = {
    keys: ["name"],
  };
  let search = "";
  let fuse: Fuse<Board>;
  let promise = Board.fetchAll().then((bs) => {
    fuse = new Fuse(bs, { keys: ["name"] });
    return bs;
  });
  $: filtered = promise.then((bs) => {
    if (!search.trim()) {
      return bs;
    }
    return fuse.search(search).map((r) => r.item);
  });

  function _search(e: Event) {
    if (!fuse) {
      return;
    }
    search = (e.target as HTMLInputElement).value;
  }

  function _toggle_fullscreen() {
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

  const handle_search = debounce(_search, 200);
  let is_fullscreen = false;
  const handle_search_click = debounce(_toggle_fullscreen, 200);
</script>

<div class="boards-wrapper">
  {#await filtered}
    <p>Loading</p>
  {:then boards}
    <div class="boards">
      {#each boards as board}
        <BoardSelect board={board} />
      {/each}
    </div>
  {/await}
</div>

<div class="bottom">
  <input
    type="text"
    on:input={handle_search}
    on:click={handle_search_click}
    placeholder="Search..."
  />
</div>
