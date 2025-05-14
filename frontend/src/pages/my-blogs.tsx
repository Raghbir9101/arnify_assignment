
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAPI, useAuth } from "../context/auth-context"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { Edit, Trash2, Plus } from "lucide-react"
import { BlogCard } from "../components/blog-card"
import Masonry from "@mui/lab/Masonry"


export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const api = useAPI()
  const { user } = useAuth()
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data: userBlogs } = await api.get(`/blogs?user=${user?._id}`)
        setBlogs(userBlogs.data)
      } catch (error) {
        toast.error("Failed to load blogs", {
          description: "Your blogs could not be loaded. Please try again later.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [toast])

  const handleDeleteBlog = async (id) => {
    setIsDeleting(true)
    try {
      await api.delete(`/blogs/${id}`)
      setBlogs(blogs.filter((blog) => blog._id !== id))
      toast.success("Blog deleted", {
        description: "Your blog has been deleted successfully.",
      })
    } catch (error) {
      toast.error("Failed to delete blog", {
        description: error.message || "Please try again later.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Loading your blogs...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">My Blogs</h1>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Button asChild>
          <Link to="/blogs/create">
            <Plus className="mr-2 h-4 w-4" /> Create New Blog
          </Link>
        </Button>
      </div>

      {blogs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">You haven&apos;t created any blogs yet.</p>
            <Button asChild>
              <Link to="/blogs/create">
                <Plus className="mr-2 h-4 w-4" /> Create Your First Blog
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Masonry columns={[1,2,4]} spacing={2}>
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              actions={
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/blogs/edit/${blog._id}`}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your blog post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteBlog(blog._id)}>
                          {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              }
            />
          ))}
        </Masonry>
      )}
    </div>
  )
}
