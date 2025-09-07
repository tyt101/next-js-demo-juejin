// 服务端组件可以导入客户端组件，但客户端组件并不能导入服务端组件
// 从服务端组件到客户端组件传递的数据需要可序列化(JSON.stringify / props / chidlren 的方式都可以进行传递)
'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation'

export default function SidebarNoteContent({
	id,
	title,
	children,
	expandedChildren,
}: {
	id: string,
	title: string,
	children: React.ReactNode,
	expandedChildren: React.ReactNode
}) {
	const router = useRouter()
	const pathname = usePathname()
	const selectedId = pathname?.split('/')[1] || null

	const [isPending] = useTransition()
	const [isExpanded, setIsExpanded] = useState(false)
	const isActive = id === selectedId

	// Animate after title is edited.
	const itemRef = useRef(null);
	const prevTitleRef = useRef(title);

	useEffect(() => {
		if (title !== prevTitleRef.current) {
			prevTitleRef.current = title;
			itemRef.current.classList.add('flash');
		}
	}, [title]);

	return (
		<div
			ref={itemRef}
			onAnimationEnd={() => {
				itemRef.current.classList.remove('flash');
			}}
			className={[
				'sidebar-note-list-item',
				isExpanded ? 'note-expanded' : '',
			].join(' ')}>
			{children}
			<button
				className="sidebar-note-open"
				style={{
					backgroundColor: isPending
						? 'var(--gray-80)'
						: isActive
							? 'var(--tertiary-blue)'
							: '',
					border: isActive
						? '1px solid var(--primary-border)'
						: '1px solid transparent',
				}}
				onClick={() => {
					// const sidebarToggle = document.getElementById('sidebar-toggle')
					// console.log('===sidebarToggle:', sidebarToggle)
					// if (sidebarToggle) {
					// 	sidebarToggle.checked = true
					// }
					router.push(`/note/${id}`)
				}}>
			</button>
			<button
				className="sidebar-note-toggle-expand"
				onClick={(e) => {
					e.stopPropagation();
					setIsExpanded(!isExpanded);
				}}>
				{isExpanded ? (
					<img
						src="/chevron-down.svg"
						width="10px"
						height="10px"
						alt="Collapse"
					/>
				) : (
					<img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
				)}
			</button>
			{isExpanded && expandedChildren}
		</div>
	);
}
