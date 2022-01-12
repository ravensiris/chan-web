<script lang="ts">
  import Board from "../api/board";

  const promise = Board.fetchAll();
</script>

{#await promise}
  <span>Loading</span>
{:then boards}
  {#each boards as board}
    <p>{board.description}</p>
  {/each}
{:catch error}
  <span>{error.message}</span>
{/await}
