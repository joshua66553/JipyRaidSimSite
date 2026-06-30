<script lang="ts">
	import type { PageContent } from '$lib/types/page';

	interface Props {
		content: PageContent;
	}

	let { content }: Props = $props();
</script>

<div class="prose-kb">
	{@html content.html}
</div>
