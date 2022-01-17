<script lang="ts">
    import {params} from '@roxi/routify';
    import SearchLayout from '../../ui/SearchLayout.svelte';
    import Thread from '../../api/thread';
    import Fuse from "fuse.js";

    // TODO: Dry it up
    let fuse: Fuse<Thread>;
    let promise = Thread.fetchAll($params.board).then((bs) => {
        fuse = new Fuse(bs, { keys: ["op.title", "op.body"] });
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
    @use '../../themes/common' as *
    .img-wrap
        display: flex
        justify-content: center
        align-items: center
        margin: 0em 0em 1em 0em
        background-color: $reply-background
    img
        max-width: 100%
        max-height: 16em
        object-fit: scale-down
        border-radius: 1em

    .replies
        display: flex
        flex-direction: column
        align-items: center

    .reply
        width: 30em
        display: flex
        flex-direction: column
        padding: 1em
        margin: 1em
        box-sizing: border-box
        border-radius: 1em
        background-color: $reply-background
        text-align: center
        color: black
        h1
            margin-bottom: 1em
        pre
            white-space: pre-wrap
            word-wrap: break-word

    button
        padding: 0 2em
</style>

<SearchLayout bind:search={search}>
    {#await filtered}
    <p>Loading</p>
    {:then threads}
        <div class="replies">
            {#each threads as thread}
                    <div class="reply">
                        {#if !thread.op.image_id}
                            <div class="img-wrap">
                                <img class="unlock" src="https://via.placeholder.com/2560x1440" />
                            </div>
                        {/if}
                        <h1>{thread.op.title}</h1>
                        <pre>{thread.op.body}</pre>
                    </div>
            {/each} 
        </div>
    {/await}
    <svelte:fragment slot="actions">
        <button>New</button>
    </svelte:fragment>
</SearchLayout>