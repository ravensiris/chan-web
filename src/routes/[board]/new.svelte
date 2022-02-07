<ReplyLayout bind:files={files} page_title="Create a thread" post_method={on_post} success_method={on_success}></ReplyLayout>

<script lang="ts">
import { params, goto} from "@roxi/routify";
import ReplyLayout from "$/ui/ReplyLayout.svelte";

import Thread, { ReplyPostInterface } from "$/api/thread";

let files: FileList | null | undefined;

const on_post = (reply: ReplyPostInterface) => {
    return Thread.create($params.board, reply);
};

const on_success = (result: Thread) => {
    if (result.op.image && files){
        result.op.image.send(files[0]).then(() => {
                $goto('/[board]/[thread]', {thread: result.id});
            }
        );
    }
}

</script>