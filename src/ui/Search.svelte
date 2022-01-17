<style lang="sass">
    input
        box-sizing: border-box
        width: 100%
        max-width: 800px
</style>

<script lang="ts">
  import _debounce from "debounce";

  let _value: string = "";
  export let debounce = 200;
  export let value: string = _value;
  export let on_click = () => {};

  function set_value() {
    value = _value;
  }

  const search_input = _debounce(set_value, debounce);
</script>

<input
  type="text"
  bind:value={_value}
  on:input={search_input}
  on:click={on_click}
  placeholder="Search..."
/>
