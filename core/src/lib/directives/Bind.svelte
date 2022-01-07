<script lang="ts">
  import { getContext } from 'svelte';
  import { ELEMENT_CONTEXT } from '../utils/constants';

  type Entry = $$Generic;

  export let entry: Entry;
  export let value: Entry;

  $: value = entry;
</script>
