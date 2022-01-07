<script lang="ts">
  import { Element, Text } from '@finsweet/sweet/src/lib';
  import { currentStepStore } from '../stores';
</script>

<Element name="current-step">
  <Text value={$currentStepStore + 1} />
</Element>
