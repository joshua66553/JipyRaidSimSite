<script lang="ts">
	import {
		Bold,
		Italic,
		Heading2,
		Heading3,
		Link as LinkIcon,
		List,
		ListOrdered,
		Quote,
		Code,
		Table as TableIcon,
		Image as ImageIcon
	} from '@lucide/svelte';

	interface Props {
		value: string;
		onupdate: (v: string) => void;
	}

	let { value, onupdate }: Props = $props();

	let textarea = $state<HTMLTextAreaElement | null>(null);

	type Tool = {
		icon: typeof Bold;
		label: string;
		/** wrap selection, or insert a block at the line start */
		run: () => void;
	};

	function apply(transform: (sel: string) => { text: string; selectStart: number; selectEnd: number }) {
		const el = textarea;
		if (!el) return;
		const start = el.selectionStart;
		const end = el.selectionEnd;
		const selected = value.slice(start, end);
		const { text, selectStart, selectEnd } = transform(selected);
		const next = value.slice(0, start) + text + value.slice(end);
		value = next;
		onupdate(next);
		// restore focus + selection after the DOM updates
		requestAnimationFrame(() => {
			el.focus();
			el.setSelectionRange(start + selectStart, start + selectEnd);
		});
	}

	function wrap(before: string, after = before, placeholder = 'text') {
		apply((sel) => {
			const body = sel || placeholder;
			return {
				text: `${before}${body}${after}`,
				selectStart: before.length,
				selectEnd: before.length + body.length
			};
		});
	}

	function linePrefix(prefix: string, placeholder = 'text') {
		apply((sel) => {
			const body = sel || placeholder;
			const text = body
				.split('\n')
				.map((line) => `${prefix}${line}`)
				.join('\n');
			return { text, selectStart: prefix.length, selectEnd: text.length };
		});
	}

	function insertBlock(block: string) {
		apply(() => ({ text: block, selectStart: 0, selectEnd: block.length }));
	}

	const tools: Tool[] = [
		{ icon: Bold, label: 'Bold', run: () => wrap('**') },
		{ icon: Italic, label: 'Italic', run: () => wrap('_') },
		{ icon: Heading2, label: 'Heading', run: () => linePrefix('## ', 'Heading') },
		{ icon: Heading3, label: 'Subheading', run: () => linePrefix('### ', 'Subheading') },
		{ icon: List, label: 'Bullet list', run: () => linePrefix('- ', 'List item') },
		{ icon: ListOrdered, label: 'Numbered list', run: () => linePrefix('1. ', 'List item') },
		{ icon: Quote, label: 'Quote', run: () => linePrefix('> ', 'Quote') },
		{ icon: Code, label: 'Code block', run: () => insertBlock('\n```js\ncode here\n```\n') },
		{ icon: LinkIcon, label: 'Link', run: () => wrap('[', '](https://)', 'label') },
		{ icon: ImageIcon, label: 'Image', run: () => insertBlock('![alt text](https://)') },
		{
			icon: TableIcon,
			label: 'Table',
			run: () =>
				insertBlock('\n| Column | Column |\n| --- | --- |\n| Cell | Cell |\n| Cell | Cell |\n')
		}
	];

	function handleTab(e: KeyboardEvent) {
		if (e.key !== 'Tab') return;
		e.preventDefault();
		const el = e.currentTarget as HTMLTextAreaElement;
		const start = el.selectionStart;
		const end = el.selectionEnd;
		const next = value.slice(0, start) + '\t' + value.slice(end);
		value = next;
		onupdate(next);
		requestAnimationFrame(() => el.setSelectionRange(start + 1, start + 1));
	}
</script>

<div class="overflow-hidden rounded-xl border border-border bg-surface">
	<div class="flex flex-wrap items-center gap-1 border-b border-border bg-elevated px-2 py-1.5">
		{#each tools as tool (tool.label)}
			<button
				type="button"
				title={tool.label}
				aria-label={tool.label}
				onclick={tool.run}
				class="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-card hover:text-foreground"
			>
				<tool.icon class="h-4 w-4" />
			</button>
		{/each}
	</div>

	<textarea
		bind:this={textarea}
		bind:value
		oninput={() => onupdate(value)}
		onkeydown={handleTab}
		spellcheck="false"
		placeholder="Write your documentation in Markdown..."
		class="block min-h-[60vh] w-full resize-y border-0 bg-surface p-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-faint focus:outline-none focus:ring-0"
	></textarea>
</div>
