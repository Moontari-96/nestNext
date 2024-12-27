'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type LoginForm = {
    username: string
    password: string
}

export default function Login() {
    const { register, handleSubmit } = useForm<LoginForm>()
    const router = useRouter()
    const onSubmit = async (data: LoginForm) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }
        )

        if (response.ok) {
            const { token } = await response.json()
            localStorage.setItem('token', token)
            router.push('/board')
        } else {
            alert('로그인 실패')
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h1 className="text-2xl font-bold mb-4">로그인</h1>
                <input
                    {...register('username')}
                    placeholder="아이디"
                    className="w-full p-2 border rounded mb-4"
                />
                <input
                    {...register('password')}
                    type="password"
                    placeholder="비밀번호"
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex flex-col gap-3">
                    <button className="w-full bg-blue-500 text-white p-2 rounded">
                        로그인
                    </button>
                    <button
                        className="w-full bg-blue-500 text-white p-2 rounded"
                        type="button"
                        onClick={() => router.push('/auth/register')}
                    >
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    )
}
