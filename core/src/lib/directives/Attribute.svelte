<script lang="ts">
  import { getContext } from 'svelte';
  import { ELEMENT_CONTEXT } from '../utils/constants';

  export let name: string;
  export let value: string;

  const element = getContext<Element>(ELEMENT_CONTEXT);

  $: element.setAttribute(name, value);
</script>
