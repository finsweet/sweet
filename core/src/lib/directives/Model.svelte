<script lang="ts">
  import Debugger from '$lib/components/Debugger.svelte';
  import { isFormField } from '@finsweet/ts-utils';

  import { getContext } from 'svelte';
  import { ELEMENT_CONTEXT } from '../utils/constants';

  export let value: string;

  const element = getContext<Element>(ELEMENT_CONTEXT);

  let type = isFormField(element) ? element.type : undefined;
</script>

{#if !type}
  <Debugger error="The element {element.id} is not a form field." />
{:else if type === 'select-one'}{:else if type === 'checkbox'}{:else if type === 'radio'}{/if}
