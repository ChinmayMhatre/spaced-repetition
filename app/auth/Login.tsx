"use client"
import React from 'react'
import { signIn } from "next-auth/react"

const Login = () => {
    return (
        <li className='list-none'>
            <button onClick={()=>signIn()} className='text-sm bg-gray-700 text-white rounded-xl disabled:opacity-25  py-2 px-6'>
                Sign In
            </button>
        </li>
    )
}

export default Login