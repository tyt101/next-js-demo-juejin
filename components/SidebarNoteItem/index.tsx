// 服务端组件可以导入客户端组件，但客户端组件并不能导入服务端组件
// 从服务端组件到客户端组件传递的数据需要可序列化(JSON.stringify / props / chidlren 的方式都可以进行传递)
import React from "react"
import SidebarNoteItemContent from "../SidebarNoteItemContent"
import SidebarNoteItemHeader from "../SidebarNoteItemHeader"
import dayjs from "dayjs"

export default function SidebarNoteItem({ note, noteId }: { note: any, noteId: string }) {
	const { title, updateTime, content } = note
	return (
		<SidebarNoteItemContent
			id={noteId}
			title={title}
			expandedChildren={
				<p className="sidebar-note-excerpt">
					{content.substring(0, 20) || <i>(No content)</i>}
				</p>
			}>
			{/* 在服务端组件中使用 JSX 作为传递给客户端组件的 prop，JSX 会先进行服务端组件渲染，再发送到客户端组件中 */}
			{/* 所以dayjs在客户端不会被打包，会服务器端渲染之后再传入到SidebarNoteItemContent这个客户端组件中 */}
			<SidebarNoteItemHeader title={title} updateTime={dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')} />

		</SidebarNoteItemContent>
	)
}