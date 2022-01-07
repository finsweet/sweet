<script lang="ts">
  import { Element, InlineStyle, Text } from '@finsweet/sweet/src/lib';
  import { FORM_CSS_CLASSES } from '@finsweet/ts-utils';
  import { errorStore } from '../stores';
</script>

<Element selector=".{FORM_CSS_CLASSES.errorMessage}">
  <InlineStyle name="display" value={$errorStore ? 'block' : 'none'} />
  <Text value={$errorStore} />
</Element>
