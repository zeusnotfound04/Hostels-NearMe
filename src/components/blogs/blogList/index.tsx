"use client"
import { useBlogSearch } from "@/hooks/useFetchBlogs";
import { useEffect, useState } from "react";
import BlogCards from "@/components/blogs/blogList/BlogCards";
import { Loader2 } from "lucide-react";
import { Blog } from "@/types";
import { deleteBlog } from "@/actions"; 
import AdminLoadingScreen from "@/components/loading/AdminLoader";

export default function BlogList() {
    const { data: initialBlogs, isLoading, isError, error } = useBlogSearch();
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        if (initialBlogs) {
            setBlogs(initialBlogs);
        }
    }, [initialBlogs]);

    useEffect(() => {
        if (isError) {
            console.error("Error fetching blogs:", error);
        }
    }, [isError, error]);

    const handleDeleteBlog = async (id: string) => {
        try {

            await deleteBlog(id);

            const updatedBlogs = blogs.filter(blog => blog.id !== id);
            setBlogs(updatedBlogs);

            console.log(`Blog with id ${id} deleted successfully`);
        } catch (deleteError) {
            console.error('Failed to delete blog', deleteError);
        }
    };

    if (isLoading) return (
        <AdminLoadingScreen/>
    );

    if (isError) return (
        <p className="text-center text-red-500">Error loading blogs. Please try again later.</p>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-left mb-8 text-[#8B0000]">
                Latest Blogs
            </h1>

            {blogs.length > 0 ? (
                <BlogCards blogs={blogs} onDeleteBlog={handleDeleteBlog} />
            ) : (
                <p className="text-center text-gray-500">No blogs found.</p>
            )}
        </div>
    );
}