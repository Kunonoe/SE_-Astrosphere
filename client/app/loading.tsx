import Image from "next/image";

export default function Loading() {
    return (
        <main className="w-full h-screen flex justify-center items-center">
            <Image src="/logo.png" alt="loading" width={50} height={50} className="Loading" />
        </main>
    )
}