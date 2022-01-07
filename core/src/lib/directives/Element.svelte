<script lang="ts" context="module">
  import { CLOAK_ATTRIBUTE, ELEMENT_CONTEXT, ELEMENT_ATTRIBUTE } from '../utils/constants';

  let renderedElements: { e: Element; o?: Element }[] = [];

  const elements = document.querySelectorAll(`[${ELEMENT_ATTRIBUTE}]`);

  elements.forEach((element) => element.setAttribute(CLOAK_ATTRIBUTE, ''));
</script>

<script lang="ts">
  import { createEventDispatcher, getContext, onDestroy, onMount, setContext } from 'svelte';
  import Debugger from '../components/Debugger.svelte';

  export let name: string | undefined = undefined;
  export let selector: string | undefined = undefined;
  export let element: Element | undefined = undefined;

  const currentContext = getContext<Element>(ELEMENT_CONTEXT);
  const original =
    element || (currentContext || document).querySelector(selector || `[${ELEMENT_ATTRIBUTE}='${name}']`);
  const renderedIndex = renderedElements.filter(({ o }) => o === original).length;

  let error: string | undefined;

  if (!renderedIndex) element = original;
  else {
    element = original.cloneNode(true) as Element;

    const { parentElement } = original;

    const existingElements = parentElement.querySelectorAll(selector);
    const previousElement = existingElements[existingElements.length - 1];

    previousElement.after(element);
  }

  renderedElements.push({ e: element, o: original });

  setContext(ELEMENT_CONTEXT, element);

  const dispatch = createEventDispatcher<{ mounted: undefined }>();

  onMount(() => {
    try {
      element.removeAttribute(CLOAK_ATTRIBUTE);
      dispatch('mounted');
    } catch (e) {
      error = `The element ${selector} doesn't exist.`;
    }
  });

  onDestroy(() => {
    if (renderedIndex) element.remove();
    else element.setAttribute(CLOAK_ATTRIBUTE, '');

    renderedElements = renderedElements.filter(({ e }) => e !== element);
  });
</script>

{#if element}
  <slot {element} />
{:else}
  <Debugger {error} />
{/if}
