export default function SidebarNoteItemHeader({ title, updateTime }: { title: string, updateTime: string }) {
	return <header className="sidebar-note-header">
		<strong>{title}</strong>
		<small>{updateTime}</small>
	</header>
}