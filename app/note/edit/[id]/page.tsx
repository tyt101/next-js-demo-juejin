import NoteEditor from '@/components/NoteEditor'
import { getNote } from '@/lib/redis';

export default async function EditPage({ params }: { params: { id: string } }) {
	console.log('params', params);
	const noteId = params.id;
	const note = await getNote(noteId)

	// 让效果更明显
	const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
	await sleep(500);

	if (note === null || note === undefined) {
		return (
			<div className="note--empty-state">
				<span className="note-text--empty-state">
					Click a note on the left to view something! 🥺
				</span>
			</div>
		)
	}

	return <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} />
}

