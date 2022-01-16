<script lang="ts">
    import {params} from '@roxi/routify';
    import Thread from '../../api/thread';

    let promise = Thread.fetchAll($params.board);
    console.log($params.board);
</script>

{#await promise}
<p>Loading</p>
{:then threads}
   {#each threads as thread}
        <h1>{thread.op.title}</h1>
        <pre>{thread.op.body}</pre>
   {/each} 
{/await}