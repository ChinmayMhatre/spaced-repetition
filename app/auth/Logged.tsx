"use client"

import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

type User = {
    image : string
}

const Logged = ({image}:User) => {
    return (
        <li className="flex items-center gap-8">
            <button onClick={()=> signOut()} className='text-sm bg-gray-700 text-white rounded-xl disabled:opacity-25  py-2 px-6'>
                Sign Out
            </button>
            <Link href={"/dashboard"}>
                <Image height={"64"} className="w-14 rounded-full" width="64" alt="profile picture" src={image}/>
            </Link>
        </li>
    )
}

export default Logged