<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import { ELEMENT_CONTEXT } from '../utils/constants';

  type EventKey = $$Generic<keyof DocumentEventMap>;

  export let event: EventKey;
  export let listener: (this: Element, ev: DocumentEventMap[EventKey]) => any;
  export let options: boolean | AddEventListenerOptions | undefined = undefined;

  const element = getContext<Element>(ELEMENT_CONTEXT);

  element.addEventListener(event, listener, options);

  onDestroy(() => {
    element.removeEventListener(event, listener, options);
  });
</script>
