
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { BlogList } from "../components/blog-list"
import { BlogFilter } from "../components/blog-filter"
import { toast } from "sonner"
import { useAPI } from "@/context/auth-context"

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const api = useAPI();

  const category = searchParams.get("category");
  const author = searchParams.get("author");

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true)
      try {
        const { data: blogsData } = await api.get(`/blogs?${category ? `category=${category}` : ""}&${author ? `user=${author}` : ""}`)
        setBlogs(blogsData.data)
      } catch (error) {
        toast.error("Failed to load blogs", {
          description: "The blogs could not be loaded. Please try again later.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [category, author, toast])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Explore Blogs</h1>
        <p className="text-muted-foreground">
          Discover interesting articles from various authors across different categories.
        </p>
      </div>
      <BlogFilter isLoading={isLoading} />
      <BlogList blogs={blogs} isLoading={isLoading} category={category} author={author} />
    </div>
  )
}
