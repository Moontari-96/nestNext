import { redirect } from 'next/navigation'

export default function Home() {
    // 기본 경로에서 로그인 페이지로 리다이렉트
    redirect('/auth/login')
}
