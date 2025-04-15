/* eslint-disable */
import { getBlog } from "@/actions";
import BlogForm from "@/components/blogs/form";
import { ParentBlogPageProps } from "@/types";

export default async function Page({ params }: ParentBlogPageProps) {
  const { blogId } = await params;
  const blog = await getBlog(blogId);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>
      <BlogForm blogId={blogId} initialData={blog!} />
    </div>
  );
}
