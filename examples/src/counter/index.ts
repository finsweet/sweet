import Counter from './Counter.svelte';

document.addEventListener('DOMContentLoaded', () => {
  new Counter({
    target: document.body,
  });
});
