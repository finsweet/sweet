<script lang="ts">
  import { getContext } from 'svelte';
  import { ELEMENT_CONTEXT } from '../utils/constants';

  type Key = $$Generic<string>;
  type StyleKey = keyof CSSStyleDeclaration;
  type Name = Key extends 'style' ? StyleKey : Key extends 'class' ? string : undefined;
  type Value = Key extends 'class' ? boolean : Key extends 'style' ? CSSStyleDeclaration[StyleKey] : string;

  export let key: Key;
  export let name: Name = undefined;
  export let value: Value;

  const element = getContext<Element>(ELEMENT_CONTEXT);

  $: {
    /* @ts-ignore */
    if (key === 'style') element.style[name] = value;
    else if (key === 'class') element.classList[value ? 'add' : 'remove'](name);
    else element.setAttribute(key, value);
  }
</script>
