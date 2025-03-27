"use client"
import { LeftDoodle1, LeftDoodle2, LeftDoodle3, LeftDoodle4, RightDoodle1, RightDoodle2, RightDoodle3, RightDoodle4 } from '@/components/ui/icon';
import { useBlogSearch } from '@/hooks/useFetchBlogs';
import React, { useState, useEffect, useMemo } from 'react';
import { Blog } from '@/types';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import BlogCard from './BlogCard';
import { BlogSkeleton } from './Skeleton';



export default function MainBlogs() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');
    const debouncedSearchQuery = useDebounce(activeSearchQuery, 500);

    const {
        data: blogs,
        isLoading,
        isError,
        error
    } = useBlogSearch(debouncedSearchQuery);

    const handleSearch = (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }
        setActiveSearchQuery(searchQuery);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const skeletonLoaders = useMemo(() =>
        Array(3).fill(null).map((_, index) => (
            <BlogSkeleton key={index} />
        )),
        []);

    return (
        <div className="relative min-h-screen bg-white font-sans">

            <div className="hidden md:block fixed inset-0 pointer-events-none z-10">
                <div className="absolute top-20 left-0 w-full h-full">
                    <LeftDoodle1 props="absolute top-0 left-0" />
                    <LeftDoodle2 props="absolute top-1/4 left-0 " />
                    <LeftDoodle3 props="absolute top-1/2 left-0 " />
                    <LeftDoodle4 props="absolute bottom-20 left-0 " />

                    <RightDoodle1 props="absolute top-0 right-0 rotate-0" />
                    <RightDoodle2 props="absolute top-1/4 right-0 rotate-135" />
                    <RightDoodle3 props="absolute top-1/2 right-0 rotate-225" />
                    <RightDoodle4 props="absolute bottom-20 right-0 rotate-315" />
                </div>
            </div>

            <div className="relative z-20 max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-2xl md:text-4xl font-bold text-left mb-8">
                    Explore Your <span className='text-[#902920]'>City</span>, Find Your Perfect <span className='text-[#902920]'>Stay</span>
                </h1>
                <form onSubmit={handleSearch} className="mb-8 text-left">
                    <div className="relative w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Search by city (e.g., Lucknow)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full px-4 py-2 pr-32 border-2 border-[#858484] rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-700 text-white px-4 py-2 flex items-center gap-2 font-bold rounded-full hover:bg-red-600 transition-colors"
                        >
                            <Search size={18} />
                            Search
                        </button>
                    </div>
                </form>

                {isLoading && (
                    <div className="space-y-8">
                        {skeletonLoaders}
                    </div>
                )}

                {isError && (
                    <div className="text-center text-red-600">
                        Error loading blogs: {error?.message}
                    </div>
                )}

                {!isLoading && blogs!.length === 0 && (
                    <div className="text-center text-gray-600">
                        No blogs found for {searchQuery || 'this city'}
                    </div>
                )}

{!isLoading && blogs?.map((blog: Blog) => (
    <BlogCard key={blog.id} blog={blog} />
))}


                <div className="flex justify-center mt-8 space-x-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                        Previous
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                        Next
                    </button>
                </div>
            </div>

        </div>
    )
}