import { getNote } from "@/lib/redis";
import Note from "@/components/Note";
import NoteSkeleton from "@/components/Skeleton/NoteSkeleton";
import { Suspense } from "react";
export default async function NotePage({ params }: { params: { id: string } }) {
	const noteId = params.id;

	return <>
		<Suspense fallback={<NoteSkeleton />}>
			<Note noteId={noteId} />
		</Suspense>
	</>
}