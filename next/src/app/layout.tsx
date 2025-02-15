import './globals.css'

export const metadata = {
    title: 'My App',
    description: 'Authentication and Board Management',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-gray-100">{children}</body>
        </html>
    )
}
