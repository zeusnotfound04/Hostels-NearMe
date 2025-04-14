import { BlogCardProps } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BlogCard({ blog }: BlogCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div 
            className="bg-white border-2 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01, boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)" }}
        >
            <div className="w-full md:w-1/2 p-6 flex flex-col">
                <motion.h2 
                    className="text-xl md:text-2xl font-bold text-[#8B0000] mb-4 border-b-2 border-gray-100 pb-2"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {blog.title}
                </motion.h2>
                <motion.div 
                    className={`text-gray-700 prose prose-sm sm:prose ${isExpanded ? '' : 'line-clamp-6'}`}
                    animate={{ height: isExpanded ? "auto" : "auto" }}
                    transition={{ duration: 0.4 }}
                >
                    {blog.content}
                </motion.div>
                {blog.content.length > 300 && (
                    <motion.button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-4 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-full px-4 py-2 self-start border border-red-100"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(254, 226, 226, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
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
                    </motion.button>
                )}
            </div>
            <div className="w-full md:w-1/2 relative group">
                <div className="relative w-full h-64 md:h-96 border-8 border-[#8B0000] overflow-hidden">
                    <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full relative"
                    >
                        <Image 
                            src={blog.image} 
                            alt={blog.title} 
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-all"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};