import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/utils/user";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ blogId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { blogId } = await params;

    const blog = await prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ blogId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { blogId } = await params;
    const body = await req.json();

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.content !== undefined && { content: body.content }),
        ...(body.city !== undefined && { city: body.city }),
        ...(body.image !== undefined && { image: body.image }),
      },
    });

    return NextResponse.json({ message: "Blog updated successfully", blog: updatedBlog }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ blogId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { blogId } = await params;

    const deletedBlog = await prisma.blog.delete({ where: { id: blogId } });

    return NextResponse.json({ message: "Blog deleted successfully", blog: deletedBlog }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
