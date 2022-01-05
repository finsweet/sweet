<script lang="ts">
  import Element from '../directives/Element.svelte';
  import On from '../directives/On.svelte';
  import Text from '../directives/Text.svelte';

  let items = [0, 1, 2];
  let clickedItem: number | undefined;
  let clickedTimeout: NodeJS.Timeout | undefined;

  const addItem = () => {
    items = [...items, items[items.length - 1] + 1 || 0];
  };

  const removeItem = () => {
    items.pop();
    items = items;
  };

  const handleItemClick = (item: number) => {
    clickedItem = item;

    if (clickedTimeout) {
      clearTimeout(clickedTimeout);
      clickedTimeout = undefined;
    }

    clickedTimeout = setTimeout(() => {
      clickedItem = undefined;
      clickedTimeout = undefined;
    }, 1000);
  };
</script>

{#each items as item}
  <Element name="item">
    <Text value={item} />
    <On event="click" listener={() => handleItemClick(item)} />
  </Element>
{/each}

<Element name="add-item">
  <On event="click" listener={addItem} />
</Element>

<Element name="remove-item">
  <On event="click" listener={removeItem} />
</Element>

{#if typeof clickedItem === 'number'}
  <Element name="clicked-item">
    <Text value="You've clicked item {clickedItem}!" />
  </Element>
{/if}
