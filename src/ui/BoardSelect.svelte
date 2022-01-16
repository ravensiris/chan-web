<style lang="sass">
  @use "../themes/common" as *
  $bg: $c-bright-light-blue
  $fg: darken($bg, 80%)
  $bg-hover: darken($bg, 5%)
  $bg-shorthand: $c-bright-blue
  $bg-shorthand-hover: darken($bg-shorthand, 5%)

  .board-select
    cursor: pointer
    display: flex
    background-color: $bg
    font-size: 2rem
    padding: .3em
    border-radius: 1rem
    transition: background-color 100ms
    color: $fg
    &:hover
      background-color: $bg-hover
    &:hover .shorthand
      background-color: $bg-shorthand-hover
    
  .shorthand
    display: flex
    background-color: $bg-shorthand
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

  a
    text-decoration: none
</style>

<script lang="ts">
  import type Board from "../api/board";
  export let board: Board;
  const href = `./${board.id}`;
</script>

<a class="board-select" {href}>
  <div class="shorthand">
    {board.shorthand}
  </div>
  <div class="body">
    {board.name}
  </div>
</a>
