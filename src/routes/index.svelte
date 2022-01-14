<style lang="sass">
  .boards
    display: grid
    column-gap: .5em
    row-gap: .5em
    width: calc(100% - 1em)
    max-width: 1200px
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))

  .center-h
    width: 100%
    display: flex
    justify-content: center
    overflow-y: auto
    
  .center-v
    height: 100%
    display: flex
    flex-direction: column-reverse
    justify-content: space-between


  input
    font-size: 1.5rem
    padding: .5em
    max-width: 800px
    width: 100%
    box-sizing: border-box
    align-self: center
    margin: .5em
    border: none
    background-color: #EAE4E9
    border-radius: .3em

  .wrapper
    height: 100vh

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

  const handleSearch = debounce(_search, 200);
</script>

<div class="wrapper">
  <div class="center-v">
    <div class="bottom">
      <input type="text" on:input={handleSearch} placeholder="Search..." />
    </div>
    <div class="center-h">
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
  </div>
</div>

<!-- {#await promise}
  <span>Loading</span>
{:then boards}
  {#each boards as board}
    <p>{board.description}</p>
  {/each}
{:catch error}
  <span>{error.message}</span>
{/await}
 -->
