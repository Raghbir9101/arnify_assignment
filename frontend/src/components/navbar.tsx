"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/auth-context"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const pathname = location.pathname

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">BlogApp</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {isAuthenticated && <Button variant="ghost" >
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
            >
              Home
            </Link>
          </Button>}

          {isAuthenticated ? (
            <>
              <Link
                to="/blogs/my-blogs"
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/blogs/my-blogs" ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                My Blogs
              </Link>
              <Link
                to="/blogs/create"
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/blogs/create" ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                Create Blog
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="relative h-8 w-8 rounded-full"> 
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://avatar.vercel.sh/${user?.name}`} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/blogs/my-blogs">My Blogs</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault()
                      logout()
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-b">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {isAuthenticated && <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
            >
              Home
            </Link>}

            {isAuthenticated ? (
              <>
                <Link
                  to="/blogs/my-blogs"
                  className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/blogs/my-blogs" ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  My Blogs
                </Link>
                <Link
                  to="/blogs/create"
                  className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/blogs/create" ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  Create Blog
                </Link>
                <Button variant="ghost" className="justify-start px-0" onClick={logout}>
                  Log out
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login">
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
