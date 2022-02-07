<script lang="ts">
    import {goto, params, url} from '@roxi/routify';
    import SearchLayout from '$/ui/SearchLayout.svelte';
    import Thread from '$/api/thread';
    import Fuse from "fuse.js";
    import { find_url } from '$/api/api';

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
    @use 'src/themes/common' as *
    .img-wrap
        display: flex
        justify-content: center
        align-items: center
        margin: 0em 0em 1em 0em
        background-color: $reply-background
    img
        width: 100%
        object-fit: scale-down
        border-radius: 1em

    .reply
        display: flex
        flex-direction: column
        padding: 1em
        margin: 1em
        box-sizing: border-box
        border-radius: 1em
        background-color: $reply-background
        text-align: center
        color: black
        max-width: 32em
        h1
            margin-bottom: 1em
        pre
            white-space: pre-wrap
            word-wrap: break-word
    .replies
        cursor: pointer   

    a
        display: flex
        padding: 0 2em
        border: none
        border-radius: 1em
        background-color: $primary-button-background
        font-weight: bold
        text-transform: uppercase
        cursor: pointer
        text-decoration: none
        color: black
        align-items: center
        justify-content: center
</style>

<SearchLayout bind:search={search}>
    {#await filtered}
    <p>Loading</p>
    {:then threads}
        <div class="replies">
            {#each threads as thread}
                    <div class="reply" on:click={() => {$goto('/[board]/[thread]', {board: thread.board_id, thread: thread.id})}}>
                        {#if thread.op.image && thread.op.image.mime}
                            <div class="img-wrap">
                                <!-- No idea why url property won't work...-->
                                <img src={find_url({image: thread.op.image.id})} />
                            </div>
                        {/if}
                        <h1>{thread.op.title}</h1>
                        <pre>{thread.op.body}</pre>
                    </div>
            {/each} 
        </div>
    {/await}
    <svelte:fragment slot="actions">
        <a href={$url('/[board]/new')}>
            <span>New</span>
        </a>
    </svelte:fragment>
</SearchLayout>