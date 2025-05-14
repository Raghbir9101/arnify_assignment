import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAPI, useAuth } from "../context/auth-context"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { toast } from "sonner"
import { formatDate } from "../lib/utils"
import { ArrowLeft, Edit } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

export default function BlogDetailPage() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()
  const api = useAPI()
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data: blogData } = await api.get(`/blogs/${id}`)
        setBlog(blogData.data)
      } catch (error) {
        toast.error("Failed to load blog", {
          description: "The blog could not be loaded. Please try again later.",
        })
        // navigate("/")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchBlog()
    }
  }, [id, navigate, toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Loading blog...</p>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-xl mb-4">Blog not found</p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    )
  }

  const isAuthor = user && user._id === blog.user?._id

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 pl-0">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
          </Link>
        </Button>

        <div className="flex justify-between items-start">
          <div>
            <Badge className="mb-2">{blog.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-2">{blog.title}</h1>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={`https://avatar.vercel.sh/${blog.user?.name}`} alt={blog.user?.name} />
                  <AvatarFallback>{blog.user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{blog.user?.name}</span>
              </div>
              <span>•</span>
              <span>{formatDate(blog?.createdAt)}</span>
            </div>
          </div>

          {isAuthor && (
            <Button asChild variant="outline" size="sm">
              <Link to={`/blogs/edit/${blog._id}`}>
                <Edit className="mr-2 h-4 w-4" /> Edit Blog
              </Link>
            </Button>
          )}
        </div>
      </div>

      {blog.image && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="object-cover w-full h-full" />
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </CardContent>
      </Card>
    </div>
  )
}
