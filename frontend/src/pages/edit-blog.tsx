
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAPI, useAuth } from "../context/auth-context"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { toast } from "sonner"
import { categories } from "@/lib/mock-data"
import Editor from "@/components/editor"

export default function EditBlogPage() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useAuth()
  const api = useAPI()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data: blogData } = await api.get(`/blogs/${id}`)
        setBlog(blogData.data)
        setTitle(blogData.data.title)
        setCategory(blogData.data.category)
        setContent(blogData.data.content)
        setImage(blogData.data.image || "")
      } catch (error) {
        toast.error("Failed to load blog", {
          description: "The blog could not be loaded. Please try again later.",
        })
        navigate("/blogs/my-blogs")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()

  }, [id, navigate, toast])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.error("Authentication required", {
        description: "You must be logged in to edit a blog.",
      })
      navigate("/login")
      return
    }

    if (blog && blog.userId !== user.id) {
      toast.error("Unauthorized", {
        description: "You can only edit your own blogs.",
      })
      navigate("/blogs/my-blogs")
      return
    }

    setIsSaving(true)

    try {
      const { data: blog } = await api.put(`/blogs/${id}`, {
        title,
        category,
        content,
        image: image || undefined,
      })

      toast.success("Blog updated", {
        description: blog.message,
      })
      navigate("/")
    } catch (error) {
      toast.error("Failed to update blog", {
        description: error.message || "Please try again later.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Loading blog...</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog</CardTitle>
          <CardDescription>Update your blog post</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a captivating title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Editor value={content} setValue={setContent} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL (optional)</Label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </CardContent>
          <CardFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => navigate("/blogs/my-blogs")} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
