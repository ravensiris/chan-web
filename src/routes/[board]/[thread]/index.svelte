<script lang="ts">
    import {goto, params, url} from '@roxi/routify';
    import SearchLayout from '$/ui/SearchLayout.svelte';
    import Reply from '$/api/reply';
    import Fuse from "fuse.js";

    // TODO: Dry it up
    let fuse: Fuse<Reply>;
    let promise = Reply.fetchAll($params.board, $params.thread).then((rs) => {
        fuse = new Fuse(rs, { keys: ["op.title", "op.body"] });
        return rs;
    });
    let search = '';

    $: filtered = promise.then((rs) => {
        if (!search.trim()) {
            return rs;
        }
        return fuse.search(search).map((r) => r.item);
    });
</script>

<style lang="sass">
    @use '../../../themes/common' as *
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
    {:then replies}
        <div class="replies">
            {#each replies as reply}
                    <div class="reply">
                        {#if !reply.image_id}
                            <div class="img-wrap">
                                <img class="unlock" src="https://via.placeholder.com/2560x1440" />
                            </div>
                        {/if}
                        <h1>{reply.title}</h1>
                        <pre>{reply.body}</pre>
                    </div>
            {/each} 
        </div>
    {/await}
    <svelte:fragment slot="actions">
        <a href={$url('/[board]/[thread]/new')}>
            <span>New</span>
        </a>
    </svelte:fragment>
</SearchLayout>