"use client"
import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

const getWordDetails = async (id)=>{
  const response = await axios.get(`/api/words/${id}`)
  return response.data
}

const wordDetails = ({params}) => {
  const { data, error, isLoading } = useQuery({
    queryFn: ()=> getWordDetails(params.wordId),
    queryKey: ["detail-word"],
  })
  console.log(data);
  
  if (error) return error
  if (isLoading) return "Loading....."
  return (
    <div className='text-center'>
      <h1 className='text-4xl font0bold py-4'>{data.word}</h1>
      <div className="">
        {data.definitions.map((def) =>(
          <p>{def}</p>
        ))}
      </div>
    </div>
  )
}

export default wordDetails