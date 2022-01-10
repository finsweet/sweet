<script lang="ts">
  import { Element, Text, On, Class, Attribute } from '@finsweet/sweet/src/lib';

  let count = 0;
</script>

{#if count > -5}
  <Element name="count">
    <Class name="warning" active={count < 0} />
    <Class name="valid" active={count > 0} />
    <Attribute name="test" value="prova" />
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
