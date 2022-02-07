<main>
    <h1>{page_title}</h1>
    <label for="title">Title:</label>
    <br>
    <input bind:value={title} type="text" name="title">
    <br>
    <label for="body">Body:</label>
    <br>
    <textarea bind:value={body} name="body" cols="50" rows="10" maxlength="500"></textarea>
    <br>
    <label for="image">Image upload:</label>
    <br>
    <input bind:files={files} accept="image/jpeg,image/png" type="file" name="image">
    <br>
    <button on:click={on_create}>Create</button>
</main>

<script lang="ts">
import type { ReplyPostInterface } from "$/api/thread";


export let page_title = 'Post a reply';
export let title = '';
export let body = '';
export let files: FileList | null | undefined;
export let post_method: (reply: ReplyPostInterface) => Promise<any>;
export let success_method: (result: any) => void;
let on_create = () => {
    post_method({title, body, wants_image: !!files}).then((result) => {
        success_method(result);
    });
};
</script>