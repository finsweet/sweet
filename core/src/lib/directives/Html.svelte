<script lang="ts">
  import { getContext } from 'svelte';
  import { ELEMENT_CONTEXT } from '../utils/constants';

  const element = getContext<HTMLElement>(ELEMENT_CONTEXT);

  export let value = element.innerHTML;

  $: element.innerHTML = value;
</script>
