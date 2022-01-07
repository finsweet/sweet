<script lang="ts">
  import { onMount } from 'svelte';
  import { Element, Text, On } from '@finsweet/sweet/src/lib';

  let items = [0, 1, 2];
  let clickedItem: number | undefined;
  let clickedTimeout: NodeJS.Timeout | undefined;

  let titleText: string;
  let originalTitleText: string;

  $: {
    if (typeof clickedItem === 'number') {
      titleText = `You've clicked item ${clickedItem}!`;
    } else titleText = originalTitleText;
  }

  /**
   * Adds a new item to the list.
   */
  const addItem = () => {
    items = [...items, items[items.length - 1] + 1 || 0];
  };

  /**
   * Removes the last item from the list.
   */
  const removeItem = () => {
    items.pop();
    items = items;
  };

  /**
   * Handles clicks on an item.
   * @param item The clicked item.
   */
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

  /**
   * Lifecycle.
   */
  onMount(() => {
    originalTitleText = titleText;
  });
</script>

<Element name="item-title">
  <Text bind:value={titleText} />
</Element>

{#each items as item}
  <Element name="item">
    <Text value={item} />
    <On event="click" listener={() => handleItemClick(item)} />
  </Element>
{/each}

<Element name="add-item">
  <On event="click" listener={addItem} />
</Element>

{#if items.length > 0}
  <Element name="remove-item">
    <On event="click" listener={removeItem} />
  </Element>
{/if}
