<script lang="ts">
	import type { PageContent } from '$lib/types/page';

	interface Props {
		content: PageContent;
	}

	let { content }: Props = $props();
</script>

<article class="prose-kb rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8">
	{@html content.html}
</article>
