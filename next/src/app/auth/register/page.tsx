'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type RegisterForm = {
    username: string
    password: string
}

export default function Register() {
    const { register, handleSubmit } = useForm<RegisterForm>()
    const router = useRouter()

    const onSubmit = async (data: RegisterForm) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/signup`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }
        )

        if (response.ok) {
            alert('회원가입 성공! 로그인 페이지로 이동합니다.')
            router.push('/auth/login')
        } else {
            alert('회원가입 실패')
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h1 className="text-2xl font-bold mb-4">회원가입</h1>
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
                <button className="w-full bg-green-500 text-white p-2 rounded">
                    회원가입
                </button>
            </form>
        </div>
    )
}
