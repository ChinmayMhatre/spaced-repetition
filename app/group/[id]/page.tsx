"use client"
import React from 'react'
import { useQuery } from 'react-query'
import axios from "axios"
import Link from 'next/link'
import AddWord from '../AddWord'

const fetchGroup = async (id) => {
    const response = await axios.get(`/api/groups/${id}`)
    return response.data
}

const GroupDetails = ({ params }) => {
    const { data, isloading } = useQuery({
        queryFn: () => fetchGroup(params.id),
        queryKey: ["detail-group"]
    })
    if (isloading) return "Loading..."

    return (
        <div>
            <h2 className='text-center text-4xl py-4 font-bold'>{data?.name}</h2>
            <AddWord groupId={params.id}/>
            <div className="py-8 flex flex-col gap-4">
                {
                    data?.words.map((word) => (
                        <Link href={`/group/${params.id}/word/${word.id}`} className="bg-white px-4 py-6 rounded-lg flex justify-between hover:bg-gray-100 shadow-md" key={word.id}>
                            {word.word}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default GroupDetails