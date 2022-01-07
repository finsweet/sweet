<script lang="ts">
  import { ELEMENT_ATTRIBUTE, ELEMENT_CONTEXT } from '../utils/constants';
  import { getContext } from 'svelte';

  import Element from './Element.svelte';

  export let name: Element['$$prop_def']['name'] = undefined;
  export let selector: Element['$$prop_def']['selector'] = undefined;

  const currentContext = getContext<HTMLElement>(ELEMENT_CONTEXT);

  const elements = (currentContext || document).querySelectorAll(selector || `[${ELEMENT_ATTRIBUTE}='${name}']`);
</script>

{#each elements as element, index}
  <Element {element}>
    <slot {element} {index} />
  </Element>
{/each}
