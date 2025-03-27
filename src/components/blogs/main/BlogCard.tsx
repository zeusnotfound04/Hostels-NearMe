import {  BlogCardProps } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";



export default function BlogCard( {blog , key} : BlogCardProps)   {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div 
            className="bg-white border-2 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row"
            key={key}
        >
            <div className="w-full md:w-1/2 p-4 flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4">{blog.title}</h2>
                <div 
                    className={`text-gray-700 ${isExpanded ? '' : 'line-clamp-6'}`}
                >
                    {blog.content}
                </div>
                {blog.content.length > 300 && (
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-4 flex items-center justify-center text-red-500 hover:bg-red-50 rounded px-3 py-1 self-start"
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="mr-2 h-4 w-4" /> 
                                Collapse
                            </>
                        ) : (
                            <>
                                <ChevronDown className="mr-2 h-4 w-4" /> 
                                Read More
                            </>
                        )}
                    </button>
                )}
            </div>
            <div className="w-full md:w-1/2 relative">
                <div className="relative w-full h-64 md:h-96 border-8 border-[#8B0000]">
                    <Image 
                        src={blog.image} 
                        alt={blog.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};