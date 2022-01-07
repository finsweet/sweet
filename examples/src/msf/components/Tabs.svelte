<script lang="ts">
  import { simulateEvent, TabsMenuElement, TABS_CSS_CLASSES } from '@finsweet/ts-utils';
  import { Element, Elements } from '@finsweet/sweet/src/lib';
  import { currentStepStore, totalStepsStore } from '../stores';
  import { onMount } from 'svelte';
  import Field from './Field.svelte';

  let tabsMenu: TabsMenuElement;

  $: if (tabsMenu) switchTab($currentStepStore);

  /**
   * Switches the current Tab Pane.
   * @param target The index of the Tab Pane.
   */
  const switchTab = (target: number) => simulateEvent(tabsMenu.children[target], 'click');

  /**
   * Store the total steps on mount.
   */
  onMount(() => {
    $totalStepsStore = tabsMenu.children.length;
  });
</script>

<Element selector=".{TABS_CSS_CLASSES.tabsMenu}" bind:element={tabsMenu} />

<Elements selector=".{TABS_CSS_CLASSES.tabPane}" let:index={stepIndex}>
  <Elements selector="input, select, textarea" let:index let:element>
    <Field {stepIndex} {index} {element} />
  </Elements>
</Elements>
