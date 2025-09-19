'use server'

import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// 数据校验规则
const saveNoteSchema = z.object({
	title: z.string().min(1, '标题不能为空'),
	content: z.string().min(1, '请填写内容').max(100, '字数最多 100')
})

export async function saveNote(prevState, formData) {


	const noteId = formData.get('noteId')

	const data = {
		title: formData.get('title'),
		content: formData.get('body'),
		updateTime: new Date()
	}

	// 校验的时候要对原始数据校验,而不是对字符串校验
	const validatedFields = saveNoteSchema.safeParse(data)


	if (!validatedFields.success) {
		console.log('validatedFields', validatedFields.error.issues[0].message);
		return {
			message: validatedFields.error.issues && validatedFields.error.issues.length > 0 ? validatedFields.error.issues[0].message : 'Unknown error'
		}
	}

	if (noteId) {
		updateNote(noteId, JSON.stringify(data))
		revalidatePath('/', 'layout')
	} else {
		const res = await addNote(JSON.stringify(data))
		revalidatePath('/', 'layout')
	}
	return { message: `Add Success!` }
}

export async function deleteNote(prevState, formData) {
	const noteId = formData.get('noteId')
	delNote(noteId)
	revalidatePath('/', 'layout')
	redirect('/')
}

