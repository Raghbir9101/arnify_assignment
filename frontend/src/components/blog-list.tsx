import { BlogCard } from "./blog-card"
import Masonry from '@mui/lab/Masonry';
export function BlogList({ blogs, isLoading, category, author }) {

  if (isLoading) {
    return <div>Loading blogs...</div>
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">No blogs found</h3>
        <p className="text-muted-foreground">
          {category || author
            ? "Try changing your filters or check back later."
            : "Be the first to create a blog post!"}
        </p>
      </div>
    )
  }

  return (
    <div className="">
      <Masonry columns={[1, 2, 4]} spacing={2}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Masonry>

    </div>
  )
}
