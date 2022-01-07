<script lang="ts">
  import { Element, On } from '@finsweet/sweet/src/lib';
  import { currentStepStore, totalStepsStore } from '../stores';
</script>

{#if $currentStepStore > 0}
  <Element name="back">
    <On event="click" listener={currentStepStore.decrementStep} />
  </Element>
{/if}

{#if $currentStepStore < $totalStepsStore - 1}
  <Element name="next">
    <On event="click" listener={currentStepStore.incrementStep} />
  </Element>
{/if}

{#if $currentStepStore === $totalStepsStore - 1}
  <Element name="submit">
    <On event="click" listener={currentStepStore.incrementStep} />
  </Element>
{/if}
