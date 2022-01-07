import { writable, get } from 'svelte/store';
import type { FormField } from '@finsweet/ts-utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const currentStepStoreFactory = () => {
  const currentStepStore = writable(0);
  const { subscribe, update } = currentStepStore;

  /**
   * Check if the current step is valid.
   * @returns `true` if valid.
   */
  const checkStepValidity = () => {
    const currentStep = get(currentStepStore);

    let stepIsValid: boolean;
    let error = '';

    fieldsStore.update((fields) => {
      const currentStepFields = fields[currentStep];

      stepIsValid = currentStepFields.every((field) => {
        const { element } = field;
        const fieldIsValid = element.checkValidity();

        field.invalid = !fieldIsValid;

        if (!fieldIsValid) error ||= `Please, fill correctly the ${element.name} field.`;

        return fieldIsValid;
      });

      return fields;
    });

    errorStore.set(error);

    return stepIsValid;
  };

  /**
   * Updates the current step.
   * @param target The target step.
   */
  const setStep = (target: number) => {
    update((currentStep) => {
      const totalSteps = get(totalStepsStore);

      if (target < 0 || target >= totalSteps) return currentStep;

      if (target < currentStep) {
        errorStore.set('');
        return target;
      }

      const stepIsValid = checkStepValidity();
      if (!stepIsValid) return currentStep;

      return target;
    });
  };

  /**
   * Increments the current step.
   */
  const incrementStep = () => {
    setStep(get(currentStepStore) + 1);
  };

  /**
   * Decrements the current step.
   */
  const decrementStep = () => {
    setStep(get(currentStepStore) - 1);
  };

  return {
    subscribe,
    incrementStep,
    decrementStep,
    setStep,
    checkStepValidity,
  };
};

export const currentStepStore = currentStepStoreFactory();
export const totalStepsStore = writable(0);
export const errorStore = writable('');
export const fieldsStore = writable<{ element: FormField; invalid: boolean }[][]>([]);
