import { Routes, Route } from "react-router-dom"
import { Toaster } from "./components/ui/sonner"
import Navbar from "./components/navbar"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"
import CreateBlogPage from "./pages/create-blog"
import EditBlogPage from "./pages/edit-blog"
import MyBlogsPage from "./pages/my-blogs"
import BlogDetailPage from "./pages/blog-detail"
import ProtectedRoute from "./components/protected-route"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-6 px-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs/create" element={<CreateBlogPage />} />
            <Route path="/blogs/edit/:id" element={<EditBlogPage />} />
            <Route path="/blogs/my-blogs" element={<MyBlogsPage />} />
          </Route>
        </Routes>
      </main>
      <Toaster />
    </div>
  )
}

export default App
