<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Table } from '@tiptap/extension-table';
	import { TableRow } from '@tiptap/extension-table-row';
	import { TableCell } from '@tiptap/extension-table-cell';
	import { TableHeader } from '@tiptap/extension-table-header';

	interface Props {
		content: string;
		onupdate: (html: string) => void;
	}

	let { content, onupdate }: Props = $props();
	let element: HTMLDivElement;
	let editor: Editor | undefined;

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [StarterKit, Table.configure({ resizable: true }), TableRow, TableHeader, TableCell],
			content,
			editorProps: {
				attributes: {
					class:
						'prose-kb min-h-[320px] rounded-lg border border-border bg-background p-4 focus:outline-none focus:border-primary'
				}
			},
			onUpdate: ({ editor: ed }) => {
				onupdate(ed.getHTML());
			}
		});
	});

	onDestroy(() => {
		editor?.destroy();
	});

	$effect(() => {
		if (editor && content !== editor.getHTML()) {
			editor.commands.setContent(content, { emitUpdate: false });
		}
	});
</script>

<div class="mb-2 flex flex-wrap gap-1.5">
	<button
		type="button"
		class="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
		onclick={() => editor?.chain().focus().toggleBold().run()}>Bold</button
	>
	<button
		type="button"
		class="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
		onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button
	>
	<button
		type="button"
		class="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
		onclick={() => editor?.chain().focus().toggleBulletList().run()}>List</button
	>
	<button
		type="button"
		class="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
		onclick={() =>
			editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
		>Table</button
	>
</div>
<div bind:this={element}></div>
