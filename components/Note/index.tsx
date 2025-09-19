import { getNote } from "@/lib/redis";
import EditButton from "../EditButton";
import NotePreview from "../NotePreview";
import dayjs from "dayjs";

export default async function Note({ noteId }: { noteId: string }) {
	const note = await getNote(noteId);

	const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
	await sleep(500);


	const { title, content, updateTime } = note;

	return <>
		<div className="note">
			<div className="note-header">
				<h1 className="note-title">{title}</h1>
				<div className="note-menu" role="menubar">
					<small className="note-updated-at" role="status">
						Last updated on {dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}
					</small>
					<EditButton noteId={noteId}>Edit</EditButton>
				</div>
			</div>
			<NotePreview>{content}</NotePreview>
		</div>
	</>
}