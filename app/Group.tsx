"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const Group = ({ name, words, id }) => {
    return (
        <Link href={{
            pathname: `/group/${id}`,
        }}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ ease: "easeOut" }}
            href={`/group/${id}`}
            className="bg-white px-4 py-6 rounded-lg hover:bg-gray-100 flex justify-between">
            {name}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>

        </Link>
    )
}

export default Group