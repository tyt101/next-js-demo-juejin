import './style.css'
import Slidebar from '@/components/Slidebar'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div className="container">
					<div className="main">
						<Slidebar />
						<section className='col note-viewer'>{children}</section>
					</div>
				</div>
			</body>
		</html>
	);
}
