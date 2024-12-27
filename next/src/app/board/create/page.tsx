'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type CreateBoardForm = {
    title: string
    content: string
    file: FileList
}

export default function CreateBoard() {
    const { register, handleSubmit } = useForm<CreateBoardForm>()
    const router = useRouter()

    const onSubmit = async (data: CreateBoardForm) => {
        const token = localStorage.getItem('token')
        const formData = new FormData()

        // FormData에 필드 추가
        formData.append('title', data.title)
        formData.append('content', data.content)
        if (data.file && data.file.length > 0) {
            formData.append('file', data.file[0]) // 첫 번째 파일 추가
        }

        console.log([...formData.entries()]) // FormData 확인

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/board`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, // JWT 토큰 추가
                },
                body: formData, // userId는 제외
            }
        )

        if (response.ok) {
            router.push('/board')
        } else {
            alert('게시글 작성 실패')
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">게시글 작성</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <input
                    {...register('title')}
                    placeholder="제목"
                    className="w-full p-2 border rounded mb-4"
                />
                <textarea
                    {...register('content')}
                    placeholder="내용"
                    className="w-full p-2 border rounded mb-4"
                />
                <input
                    {...register('file')}
                    placeholder="파일"
                    className="w-full p-2 border rounded mb-4"
                    type="file"
                />
                <button className="w-full bg-green-500 text-white p-2 rounded">
                    작성하기
                </button>
            </form>
        </div>
    )
}
