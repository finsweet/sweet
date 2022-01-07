<script lang="ts">
  import { getContext } from 'svelte';
  import { ELEMENT_CONTEXT } from '../utils/constants';

  type Name = $$Generic<keyof CSSStyleDeclaration>;

  export let name: Name = undefined;
  export let value: CSSStyleDeclaration[Name];

  const element = getContext<Element>(ELEMENT_CONTEXT);

  $: (<HTMLElement>element).style[name] = value;
</script>
