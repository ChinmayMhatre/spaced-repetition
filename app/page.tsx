import AddPost from "./AddPost"
import axios from "axios"

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}

export default function Home() {
  return (
    <main >
    <AddPost/>
    </main>
  )
}
