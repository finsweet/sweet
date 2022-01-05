<script lang="ts">
  import Element from '../directives/Element.svelte';
  import Text from '../directives/Text.svelte';
  import On from '../directives/On.svelte';
  import Bind from '../directives/Bind.svelte';

  let count = 0;
</script>

{#if count > -5}
  <Element name="count">
    <Bind key="class" name="warning" value={count < 0} />
    <Bind key="class" name="valid" value={count > 0} />
    <Bind key="test" value="prova" />
    <Text value={count} />
  </Element>
{:else}
  <Element name="count-fallback" />
{/if}

<Element name="count-decrease">
  <On event="click" listener={() => count--} />
</Element>

<Element name="count-increase">
  <On event="click" listener={() => count++} />
</Element>
