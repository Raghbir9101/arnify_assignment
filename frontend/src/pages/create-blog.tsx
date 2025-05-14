
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAPI, useAuth } from "../context/auth-context"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { toast } from "sonner"
import { categories } from "@/lib/mock-data"
import 'react-quill/dist/quill.snow.css';
import Editor from "@/components/editor"
export default function CreateBlogPage() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate();
  const api = useAPI()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.error("Authentication required", {
        description: "You must be logged in to create a blog.",
      })
      navigate("/login")
      return
    }

    setIsLoading(true)

    try {
      const { data: blog } = await api.post("/blogs", {
        title,
        category,
        content,
        image: image || undefined,
      })
      toast.success("Blog created", {
        description: blog.message,
      })

      navigate("/")
    } catch (error) {
      toast.error("Failed to create blog", {
        description: error.message || "Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Blog</CardTitle>
          <CardDescription>Share your thoughts with the world</CardDescription>
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
            <Button type="submit" disabled={isLoading} className="ml-auto">
              {isLoading ? "Creating..." : "Create Blog"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
