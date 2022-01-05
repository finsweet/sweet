<script lang="ts">
  import { getContext } from 'svelte';
  import { ELEMENT_CONTEXT } from '../utils/constants';

  const element = getContext<Element>(ELEMENT_CONTEXT);

  export let value: string | number = element.textContent;

  $: element.textContent = typeof value === 'string' ? value : value.toString();
</script>
