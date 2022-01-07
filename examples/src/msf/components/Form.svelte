<script lang="ts">
  import { Element, On } from '@finsweet/sweet/src/lib';
  import { currentStepStore, errorStore, totalStepsStore } from '../stores';
  import Tabs from './Tabs.svelte';
  import Navigation from './Navigation.svelte';
  import CurrentStepDisplay from './CurrentStepDisplay.svelte';

  /**
   * Handles keyboard events on the form.
   * @param e The {@link KeyboardEvent}
   */
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' || $currentStepStore === $totalStepsStore - 1) return;

    e.preventDefault();

    currentStepStore.incrementStep();
  };

  /**
   * Re-check for the current step validity if there's a displayed error message.
   */
  const handleInput = () => {
    if (!$errorStore) return;

    currentStepStore.checkStepValidity();
  };
</script>

<Element name="form">
  <On event="keydown" listener={handleKeydown} />
  <On event="input" listener={handleInput} />

  <CurrentStepDisplay />
  <Tabs />
  <Navigation />
</Element>
