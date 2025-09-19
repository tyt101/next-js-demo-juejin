'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

function Spinner({ active = true }) {
	return (
		<div className={['spinner', active ? 'spinner--active' : ''].join(' ')}
			role='progressbar'
			aria-busy={active ? 'true' : 'false'}
		/>
	)
}

export default function SidebarSearchField() {
	const { replace } = useRouter()
	const pathname = usePathname()

	const [isPending, startTransition] = useTransition()

	function handleSearch(value: string) {

		const params = new URLSearchParams(window.location.search)

		if (value) {
			params.set('q', value)
		} else {
			params.delete('q')
		}

		replace(`${pathname}?${params.toString()}`)

	}

	return (
		<div className="search" role="search">
			<label className='offscreen' htmlFor="sidebar-search-input">
				Search for a note by title
			</label>
			<input
				type="text"
				id="sidebar-search-input"
				placeholder='Search'
				onChange={(e) => handleSearch(e.target.value)}
			/>
			<Spinner active={isPending} />
		</div>
	)
}