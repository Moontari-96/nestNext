'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BoardList() {
    const [boards, setBoards] = useState([])
    const [decodedToken, setDecodedToken] = useState(null) // 디코딩된 토큰 상태
    const router = useRouter()

    useEffect(() => {
        const fetchBoards = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                try {
                    // 토큰 디코딩 로직
                    const base64Payload = token.split('.')[1] // JWT의 Payload 부분 추출
                    const decodedPayload = JSON.parse(atob(base64Payload)) // Base64 디코딩
                    setDecodedToken(decodedPayload) // 디코딩된 토큰 상태 저장
                    console.log('Decoded Token:', decodedPayload)
                } catch (error) {
                    console.error('Error decoding token:', error)
                }
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/board`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                const data = await response.json()
                console.log(data)
                setBoards(data)
            } catch (error) {
                console.error('Error fetching boards:', error)
            }
        }

        fetchBoards()
    }, [])

    const handleCreate = () => {
        router.push('/board/create')
    }

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">게시글 목록</h1>
                {decodedToken && (
                    <span className="text-gray-700 text-sm">
                        {decodedToken.username}님, 환영합니다!
                    </span>
                )}
            </div>
            <button
                onClick={handleCreate}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                게시글 작성
            </button>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {boards.map(board => (
                    <li
                        key={board.idx}
                        className="border p-4 rounded shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-bold mb-2">
                            {board.title}
                        </h2>
                        <p className="text-gray-700 mb-2">{board.content}</p>
                        <div>
                            {board.file && (
                                <a
                                    href={`${process.env.NEXT_PUBLIC_API_BASE_URL}${board.file}`} // 백엔드 라우트로 요청
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="text-blue-500 underline"
                                >
                                    파일다운로드
                                </a>
                            )}
                        </div>
                        <span className="text-sm text-gray-500">
                            작성자: {board.user.username}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
