"use client"
import { useBlogSearch } from "@/hooks/useFetchBlogs";
import { useEffect } from "react";
import BlogCards from "@/components/blogs/listBlog/BlogCards";
import { Loader2 } from "lucide-react";




export default function BlogList(){
    const {data: blogs  , isLoading , isError , error } = useBlogSearch();
    console.log("Blogs in the CLient Side ::::" , blogs)
    

    useEffect(() => {
      if (isError) {
        console.error("Error fetching blogs:", error);
      }
    }, [isError, error]);
  
    if (isLoading) return <Loader2/>;
    if (isError) return <p>Error loading blogs.</p>;

    return(
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-left mb-8 text-[#8B0000]">
        Latest Blogs
      </h1>

        <BlogCards blogs={blogs} />
     
    </div>

    )
}