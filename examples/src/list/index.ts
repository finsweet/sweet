import List from './List.svelte';

document.addEventListener('DOMContentLoaded', () => {
  new List({
    target: document.body,
  });
});
