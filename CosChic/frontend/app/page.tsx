"use client"
import Header from "@/components/inc_header";
import Image from "next/image";
import { useRouter } from 'next/navigation';
// 화이팅
export default function Home() {
    const router = useRouter();
    return (
        router.push('/landing')
    );
}