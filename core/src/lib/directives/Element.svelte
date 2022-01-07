<script lang="ts" context="module">
  import { CLOAK_ATTRIBUTE, ELEMENT_CONTEXT, ELEMENT_ATTRIBUTE } from '../utils/constants';

  let renderedElements: { e: Element; o?: Element }[] = [];

  const elements = document.querySelectorAll(`[${ELEMENT_ATTRIBUTE}]`);

  elements.forEach((element) => element.setAttribute(CLOAK_ATTRIBUTE, ''));
</script>

<script lang="ts">
  import { getContext, onDestroy, onMount, setContext } from 'svelte';
  import Debugger from '../components/Debugger.svelte';

  export let name: string | undefined = undefined;
  export let selector: string | undefined = undefined;
  export let element: Element | undefined = undefined;

  const currentContext = getContext<Element>(ELEMENT_CONTEXT) || document;
  const originalElement = element || currentContext.querySelector(selector || `[${ELEMENT_ATTRIBUTE}='${name}']`);

  const existingElements = renderedElements.filter(({ o }) => o === originalElement);
  const existingElementsCount = existingElements.length;

  let error: string | undefined;

  if (!existingElementsCount) element = originalElement;
  else {
    element = originalElement.cloneNode(true) as Element;

    const previousElement = existingElements[existingElementsCount - 1].e;

    previousElement.after(element);
  }

  renderedElements.push({ e: element, o: originalElement });

  setContext(ELEMENT_CONTEXT, element);

  onMount(() => {
    try {
      element.removeAttribute(CLOAK_ATTRIBUTE);
    } catch (e) {
      error = `The element ${selector} doesn't exist.`;
    }
  });

  onDestroy(() => {
    if (existingElementsCount) element.remove();
    else element.setAttribute(CLOAK_ATTRIBUTE, '');

    renderedElements = renderedElements.filter(({ e }) => e !== element);
  });
</script>

{#if element}
  <slot {element} />
{:else}
  <Debugger {error} />
{/if}
