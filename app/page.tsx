"use client"

import Post from "./Post"
import { useQuery } from "react-query"
import axios from "axios"
import { PostsType } from "./types/Posts"
import AddGroup from "./AddGroup"
import Group from "./Group"



const allGroups = async () => {
  const response = await axios.get("/api/groups/getGroups")
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allGroups,
    queryKey: ["groups"],
  })

  if (error) return error
  if (isLoading) return "Loading....."
  console.log(data)
  return (
    <div>
      <AddGroup />
      {/* {data?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
        />
      ))} */}
      <div className="flex flex-col gap-6">
        {
          data.map((group) => (
            <Group key={group.id} words={group.words} name={group.name} id={group.id}  />
          ))
        }
      </div>
    </div>
  )
}