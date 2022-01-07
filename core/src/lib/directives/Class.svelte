<script lang="ts">
  import { getContext } from 'svelte';
  import { ELEMENT_CONTEXT } from '../utils/constants';

  export let name: string = undefined;
  export let active: boolean;

  const element = getContext<Element>(ELEMENT_CONTEXT);

  $: element.classList[active ? 'add' : 'remove'](name);
</script>
