import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { formatDate } from "../lib/utils";
const getText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function BlogCard({ blog, actions = null }) {
  const { _id, title, category, user, content, image, createdAt } = blog

  // Truncate content for preview
  const truncatedContent = content.length > 150 ? `${content.substring(0, 150)}...` : content

  return (
    <Card className="overflow-hidden flex flex-col h-fit">
      {image && (
        <div className="relative w-full h-48">
          <img src={image || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="mb-2">{category}</Badge>
          <div className="text-xs text-muted-foreground">{formatDate(createdAt)}</div>
        </div>
        <Link to={`/blogs/${_id}`} className="hover:underline">
          <h3 className="text-xl font-bold leading-tight">{title}</h3>
        </Link>
        <div className="flex items-center pt-2">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={`https://avatar.vercel.sh/${user?.name}`} alt={user?.name} />
            <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{user?.name}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-muted-foreground text-sm">{getText(truncatedContent)}</p>
      </CardContent>
      <CardFooter className="pt-2">
        {actions ? (
          actions
        ) : (
          <Link to={`/blogs/${_id}`} className="text-sm font-medium text-primary hover:underline">
            Read more
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
