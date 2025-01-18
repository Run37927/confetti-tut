import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { getAuthSession } from '@/lib/auth'
import UserAccountNav from './UserAccountNav'

async function Navbar() {
    const session = await getAuthSession();

    return (
        <nav className="sticky h-16 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-sm transition-all">
            <MaxWidthWrapper>
                <div className='flex h-16 items-center justify-between'>
                    <Link href='/' className='flex z-40 font-extrabold text-lg'>
                        <span>Confetti Demo</span>
                    </Link>

                    <div className='flex items-center space-x-1.5'>
                        <>
                            {session?.user ? (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/dashboard"
                                        className={buttonVariants({
                                            size: "sm",
                                            className: "flex items-center justify-center text-xs group px-4 py-5"
                                        })}>
                                        <span>Dashboard</span>
                                        <ArrowRight className='ml-1.5 transform size-4 transition-transform duration-300 group-hover:translate-x-1' />
                                    </Link>
                                    <div className="h-8 w-px bg-gray-200" />
                                    <UserAccountNav session={session} />
                                </div>
                            ) : (
                                <Link href='/sign-in' className={cn(buttonVariants({ size: "sm" }), "flex items-center justify-center group px-4 py-5")}>
                                    <span>Sign in</span>
                                    <ArrowRight className='ml-1.5 transform h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                                </Link>
                            )}
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar