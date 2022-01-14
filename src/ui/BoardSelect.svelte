<style lang="sass">
  .board-select
    cursor: pointer
    display: flex
    background-color: #DFE7FD
    font-size: 2rem
    padding: .3em
    border-radius: 1rem
    transition: background-color 100ms
    color: darken(#DFE7FD, 80%)
    &:hover
      background-color: darken(#DFE7FD, 5%)
    &:hover .shorthand
      background-color: darken(#CDDAFD, 5%)
    
  .shorthand
    display: flex
    background-color: #CDDAFD
    width: 2em
    height: 2em
    justify-content: center
    align-items: center
    border-radius: 1rem
    transition: background-color 100ms
    font-weight: bold
    text-transform: uppercase

  .body
    display: flex
    justify-content: center
    align-items: center
    margin-left: .3em

</style>

<script lang="ts">
  import type Board from "../api/board";
  export let board: Board;

  const goto_board = () => {
    console.log(board.id);
  };
</script>

<div class="board-select" on:click={goto_board}>
  <div class="shorthand">
    {board.shorthand}
  </div>
  <div class="body">
    {board.name}
  </div>
</div>
