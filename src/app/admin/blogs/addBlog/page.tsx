// Server Component
import BlogForm from "@/components/blogs/form";

export default function AddBlogPage() {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mt-8 mb-6">Create New Blog</h1>
            <BlogForm />
        </div>
    )
}