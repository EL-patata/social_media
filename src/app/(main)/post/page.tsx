'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	Baseline,
	Bold,
	Heading1,
	Heading2,
	Heading3,
	Italic,
	List,
	LucideListOrdered,
	Quote,
	Strikethrough,
} from 'lucide-react';
import { TextDirection } from 'tiptap-text-direction';

export default function Page() {
	const editor = useEditor({
		editorProps: {
			attributes: {
				class:
					'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
			},
		},
		extensions: [
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false,
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
				},
			}),
			Placeholder.configure({
				emptyEditorClass: 'is-editor-empty',
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Highlight,
			TextDirection.configure({
				types: ['heading', 'paragraph', 'list'],
			}),
		],
	});

	return (
		<main className="min-h-[50vh] w-full lg:w-1/2 mx-auto flex flex-col gap-2 p-2 lg:p-4">
			<Input
				className="py-7 text-3xl font-bold tracking-tight "
				placeholder="Title here"
			/>
			<div className="border flex-1 bg-background">
				<MenuBar editor={editor} />
				<EditorContent editor={editor} className="rtl:direction-normal" />
			</div>
			<Button
				className="self-end rtl:self-start"
				onClick={() => console.log(editor?.getJSON())}
			>
				Publish post
			</Button>
		</main>
	);
}

function MenuBar({ editor }: any) {
	if (!editor) {
		return null;
	}

	return (
		<nav className="p-2 bg-background border-b flex items-center flex-wrap gap-[2px]">
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={
					editor.isActive('heading', { level: 1 })
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<Heading1 />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={
					editor.isActive('heading', { level: 2 })
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<Heading2 />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				className={
					editor.isActive('heading', { level: 3 })
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<Heading3 />
			</button>
			<button
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={
					editor.isActive('paragraph')
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<Baseline />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={
					editor.isActive('bold')
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<Bold />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={
					editor.isActive('italic')
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<Italic />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={
					editor.isActive('strike')
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<Strikethrough />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={
					editor.isActive('blockquote')
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<Quote />
			</button>

			<button
				onClick={() => editor.chain().focus().setTextAlign('left').run()}
				className={
					editor.isActive({ textAlign: 'left' })
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<AlignLeft />
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('center').run()}
				className={
					editor.isActive({ textAlign: 'center' })
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<AlignCenter />
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('right').run()}
				className={
					editor.isActive({ textAlign: 'right' })
						? buttonVariants({
								variant: 'default',
								size: 'sm_icon',
						  })
						: buttonVariants({
								variant: 'ghost',
								size: 'sm_icon',
						  })
				}
			>
				<AlignRight />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={
					editor.isActive('bulletList')
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<List />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={
					editor.isActive('orderedList')
						? buttonVariants({ variant: 'default', size: 'sm_icon' })
						: buttonVariants({ variant: 'ghost', size: 'sm_icon' })
				}
			>
				<LucideListOrdered />
			</button>
		</nav>
	);
}
