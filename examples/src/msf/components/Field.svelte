<script lang="ts">
  import { fieldsStore } from '../stores';
  import { Class, On } from '@finsweet/sweet/src/lib';
  import type { FormField } from '@finsweet/ts-utils';

  export let element: Element;
  export let stepIndex: number;
  export let index: number;

  $fieldsStore[stepIndex] ||= [];
  $fieldsStore[stepIndex][index] = {
    element: <FormField>element,
    invalid: false,
  };

  /**
   * Handle input events.
   */
  const handleInput = () => {
    if (!$fieldsStore[stepIndex][index].invalid) return;

    $fieldsStore[stepIndex][index].invalid = !(<FormField>element).checkValidity();
  };
</script>

<On event="input" listener={handleInput} />
<Class name="warning" active={$fieldsStore[stepIndex][index].invalid} />
