import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/utils/user";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";


interface RouteParams {
    params: {
      blogId: string;
    };
  }
  


export async function GET(req: Request, { params  }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const {blogId} = params

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Hostel not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching hostel:", error);
    return NextResponse.json(
      { error: "Failed to fetch hostel" },
      { status: 500 }
    );
  }
}






export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id || !isAdmin(session.user.role)) {
      return NextResponse.json(
        { error: "You must be logged in and must be an admin to create a Blog" },
        { status: 401 }
      );
    }
    

    if (!params.blogId) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }


    const body = await req.json();

 
    

    const updatedBlog = await prisma.blog.update({
      where: {
        id: params.blogId
      },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.content !== undefined && { content: body.content }),
        ...(body.city !== undefined && { city: body.city }),
        ...(body.image !== undefined && { image: body.image }),
      },
    });

    // await updateActiveHostelsCount(); 

    return NextResponse.json({
      message: "Hostel updated successfully",
      hostel: updatedBlog
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating blog:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to update blog", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}



export async function DELETE(req: Request,  { params }: RouteParams) {
  try {


    const session = await getServerSession(authOptions);

    const {blogId} = await params;
    

    if (!session || !session.user || !session.user.id || !isAdmin(session.user.role)) {
      return NextResponse.json(
        { error: "You must be logged in and must be an admin to create a blog" },
        { status: 401 }
      );
    }
    




    if (!blogId) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }


    const deletedBlog = await prisma.blog.delete({
      where: {
        id: blogId
      },
    });

    return NextResponse.json({
      message: "Blog deleted successfully",
      hostel: deletedBlog
    }, { status: 200 });

  } catch (error) {

    console.error("Error deleting Blog:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to delete Blog", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}