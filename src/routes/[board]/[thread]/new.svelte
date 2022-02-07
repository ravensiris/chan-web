<ReplyLayout bind:files={files} page_title="Create a reply" post_method={on_post} success_method={on_success}></ReplyLayout>

<script lang="ts">
import { params, goto} from "@roxi/routify";
import ReplyLayout from "$/ui/ReplyLayout.svelte";

import Thread, { ReplyPostInterface } from "$/api/thread";
import Reply from "$/api/reply";

let files: FileList | null | undefined;

const on_post = (reply: ReplyPostInterface) => {
    return Thread.reply($params.thread, $params.board, reply);
};

const on_success = (reply: Reply) => {
    if (reply.image && files){
        reply.image.send(files[0]).then(() => {
                $goto('/[board]/[thread]', $params.thread, $params.board);
            }
        );
    }else{
    }
}

</script>