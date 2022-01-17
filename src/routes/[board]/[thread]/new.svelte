<main>
    <label for="title">Title:</label>
    <br>
    <input bind:value={title} type="text" name="title">
    <br>
    <label for="body">Body:</label>
    <br>
    <textarea bind:value={body} name="body" cols="50" rows="10"></textarea>
    <br>
    <button on:click={create}>Create</button>
</main>

<script lang="ts">
import { params } from "@roxi/routify";

import Thread from "$/api/thread";

let title = '';
let body = '';

const create = () => {
    Thread.reply($params.thread, $params.board, {
        title,
        body
    });
};

</script>