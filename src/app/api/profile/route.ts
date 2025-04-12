import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Gender } from '@prisma/client';

// Define types for profile data
interface UserProfile {
  id: string;
  email: string;
  name: string;
  username: string;
  gender: Gender | null;
  city: string | null;
  state: string | null;
  role: string;
  createdAt: Date;
  pfpUrl: string | null;
}

// Define type for update profile request
interface UpdateProfileRequest {
  name?: string;
  username?: string;
  gender?: Gender | null;
  city?: string | null;
  state?: string | null;
  pfpUrl?: string | null;
}

interface PrismaError extends Error {
  code?: string;
  meta?: {
    target?: string[];
  };
}

function isValidGender(value: unknown): value is Gender {
  return value === 'MALE' || value === 'FEMALE';
}

export async function GET(): Promise<NextResponse<UserProfile | { error: string }>> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        gender: true,
        city: true,
        state: true,
        role: true,
        createdAt: true,
        pfpUrl: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse<UserProfile | { error: string }>> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json() as Record<string, unknown>;
    
    const allowedFields: Array<keyof UpdateProfileRequest> = ['name', 'username', 'gender', 'city', 'state', 'pfpUrl'];
    
    const updateData: Partial<UpdateProfileRequest> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        // Special handling for gender field
        if (field === 'gender') {
          if (body.gender === null) {
            updateData.gender = null;
          } else if (isValidGender(body.gender)) {
            updateData.gender = body.gender;
          } else if (body.gender !== undefined) {
            return NextResponse.json(
              { error: 'Invalid gender value. Must be "MALE" or "FEMALE"' },
              { status: 400 }
            );
          }
        } else {
          
          const value = body[field];
          
          if (typeof value === 'string' || value === null) {
          
            switch(field) {
              case 'name':
              case 'username':
                if (typeof value === 'string') {
                  updateData[field] = value;
                }
                break;
              case 'city':
              case 'state':
              case 'pfpUrl':
          
                updateData[field] = value as string | null;
                break;
            }
          }
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        gender: true,
        city: true,
        state: true,
        role: true,
        createdAt: true,
        pfpUrl: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: unknown) {
    console.error('Error updating user profile:', error);
    
    const prismaError = error as PrismaError;
    
    if (prismaError.code === 'P2002') {
      return NextResponse.json(
        { error: `The ${prismaError.meta?.target?.[0] || 'field'} is already taken` },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}