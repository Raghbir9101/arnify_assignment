"use client"

import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { X } from "lucide-react"
import { categories } from "@/lib/mock-data"
import { useEffect, useState } from "react"
import { useAPI } from "@/context/auth-context"

export function BlogFilter({ isLoading }) {
  const api = useAPI();
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [authors, setAuthors] = useState([])
  const currentCategory = searchParams.get("category") || ""
  const currentAuthor = searchParams.get("author") || ""


  const updateFilters = (type, value) => {
    const params = new URLSearchParams(searchParams)

    if (value && value !== "all") {
      params.set(type, value)
    } else {
      params.delete(type)
    }

    navigate(`/?${params.toString()}`)
  }

  const clearFilters = () => {
    navigate("/")
  }

  const hasActiveFilters = currentCategory || currentAuthor;

  useEffect(() => {
    api.get("/users/getUsersList").then((data) => {
      setAuthors(data.data)
    })
  }, [])

  if (isLoading) {
    return <div className="h-10"></div>
  }


  
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-1 flex-col sm:flex-row gap-4">
        <Select value={currentCategory} onValueChange={(value) => updateFilters("category", value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={currentAuthor} onValueChange={(value) => updateFilters("author", value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Authors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            {authors.map((author) => (
              <SelectItem key={author._id} value={author._id}>
                {author.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-10">
          <X className="h-4 w-4 mr-2" />
          Clear filters
        </Button>
      )}
    </div>
  )
}
