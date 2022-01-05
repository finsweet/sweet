<script lang="ts" context="module">
  import { CLOAK_DATASET, ELEMENT_CONTEXT, ELEMENT_DATASET } from '../utils/constants';

  let renderedElements: { e: Element; o?: Element }[] = [];

  const elements = document.querySelectorAll(`[${ELEMENT_DATASET}]`);

  for (const element of elements) element.setAttribute(CLOAK_DATASET, '');
</script>

<script lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte';

  export let name: string;

  const selector = `[${ELEMENT_DATASET}='${name}']`;
  const original = document.querySelector(selector);
  const index = renderedElements.filter(({ o }) => o === original).length;

  let element: Element;

  if (!index) element = original;
  else {
    element = original.cloneNode(true) as Element;

    const { parentElement } = original;

    const existingElements = parentElement.querySelectorAll(selector);
    const previousElement = existingElements[existingElements.length - 1];

    previousElement.after(element);
  }

  renderedElements.push({ e: element, o: original });

  setContext(ELEMENT_CONTEXT, element);
  onMount(() => {
    element.removeAttribute(CLOAK_DATASET);
    console.log(this);
  });
  onDestroy(() => {
    if (index) element.remove();
    else element.setAttribute(CLOAK_DATASET, '');

    renderedElements = renderedElements.filter(({ e }) => e !== element);
  });
</script>

<slot {element} />
