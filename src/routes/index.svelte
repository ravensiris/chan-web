<script lang="ts">
    import SearchLayout from "../ui/SearchLayout.svelte";
    import BoardSelect from "../ui/BoardSelect.svelte";
    import Board from "../api/board";
    import Fuse from "fuse.js";
    
    let fuse: Fuse<Board>;
    let promise = Board.fetchAll().then((bs) => {
        fuse = new Fuse(bs, { keys: ["name"] });
        return bs;
    });
    let search = '';

    $: filtered = promise.then((bs) => {
        if (!search.trim()) {
            return bs;
        }
        return fuse.search(search).map((r) => r.item);
    });
</script>

<style lang="sass">
    .boards
        display: grid
        column-gap: .5em
        row-gap: .5em
        width: calc(100% - 1em)
        max-width: 1200px
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))
</style>

<SearchLayout bind:search={search}>
        {#await filtered}
            <p>Loading</p>
        {:then boards}
            <div class="boards">
                {#each boards as board}
                    <BoardSelect board={board} />
                {/each}
            </div>
        {/await}
</SearchLayout>