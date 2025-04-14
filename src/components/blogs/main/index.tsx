"use client"
import { LeftDoodle1, LeftDoodle2, LeftDoodle3, LeftDoodle4, RightDoodle1, RightDoodle2, RightDoodle3, RightDoodle4 } from '@/components/ui/icon';
import { useBlogSearch } from '@/hooks/useFetchBlogs';
import React, { useState, useMemo, useEffect } from 'react';
import { Blog } from '@/types';
import { Search, ChevronLeft, ChevronRight, Book, Building, MapPin, Home, Loader2, Newspaper } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import BlogCard from './BlogCard';
import { BlogSkeleton, BlogSkeletonGroup } from './Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function MainBlogs() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');
    const debouncedSearchQuery = useDebounce(activeSearchQuery, 500);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 3;

    const {
        data: allBlogs,
        isLoading,
        isError,
        error
    } = useBlogSearch(debouncedSearchQuery);
    
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    
    useEffect(() => {
        if (allBlogs) {
            setTotalPages(Math.ceil(allBlogs.length / blogsPerPage));
            const indexOfLastBlog = currentPage * blogsPerPage;
            const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
            setBlogs(allBlogs.slice(indexOfFirstBlog, indexOfLastBlog));
        }
    }, [allBlogs, currentPage]);

    const handleSearch = (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }
        setActiveSearchQuery(searchQuery);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    // Specialized loading animation component
    const LoadingAnimation = () => (
        <div className="py-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-10 flex flex-col items-center"
            >
                <motion.div 
                    className="text-[#8B0000] mb-6 relative"
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                >
                    <Book size={56} />
                    <motion.div
                        className="absolute -top-2 -right-2 bg-red-50 rounded-full p-1 shadow-sm border border-red-100"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
                    >
                        <Newspaper size={20} className="text-red-800" />
                    </motion.div>
                </motion.div>
                
                <h3 className="text-3xl font-bold text-[#8B0000] mb-3">Discovering City Blogs</h3>
                <div className="flex items-center gap-3 mb-4">
                    {["Lucknow", "Delhi", "Mumbai", "Bangalore", "Chennai"].map((city, i) => (
                        <motion.div 
                            key={city}
                            className="flex items-center bg-red-50 px-3 py-1 rounded-full border border-red-100"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 + 0.5 }}
                        >
                            <MapPin size={14} className="mr-1 text-red-600" />
                            <span className="text-sm font-medium text-red-800">{city}</span>
                        </motion.div>
                    ))}
                </div>
                
                <motion.div 
                    className="flex items-center gap-2 text-gray-600 mb-8"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p>Searching across cities for perfect stays...</p>
                </motion.div>
                
                <motion.div
                    className="w-full max-w-lg h-1 mb-10 rounded-full overflow-hidden bg-gray-100"
                    initial={{ width: "0%" }}
                >
                    <motion.div 
                        className="h-full bg-gradient-to-r from-red-300 via-red-600 to-red-300"
                        animate={{ 
                            x: ["-100%", "100%"],
                        }}
                        transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{ width: "50%" }}
                    />
                </motion.div>
            </motion.div>
            
            <div className="relative">
                <BlogSkeletonGroup count={3} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div 
                        className="flex gap-3 items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-red-100"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                        transition={{ 
                            duration: 3,
                            times: [0, 0.2, 0.8, 1],
                            repeat: Infinity,
                            repeatDelay: 2
                        }}
                    >
                        <Building className="text-red-800" />
                        <span className="font-medium text-red-900">Exploring hostels nearby</span>
                    </motion.div>
                </div>
            </div>
        </div>
    );

    // Animated search indicator when searching
    const SearchingAnimation = () => {
        if (!activeSearchQuery) return null;
        
        return (
            <motion.div 
                className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-red-200"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
            >
                <Loader2 className="h-4 w-4 animate-spin text-red-700" />
                <span className="text-sm font-medium text-red-800">
                    Searching for "{activeSearchQuery}"...
                </span>
            </motion.div>
        );
    };
    
    // Enhanced "No Results" animation
    const NoResultsAnimation = () => (
        <motion.div 
            className="text-center p-12 bg-white rounded-lg shadow-lg border border-red-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
        >
            <motion.div
                className="inline-block mb-6 text-red-300 bg-red-50 p-4 rounded-full"
                animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 0.95, 1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "loop"
                }}
            >
                <Home size={40} />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Blogs Found for "{searchQuery || 'this city'}"</h3>
            
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any blogs for this search. Try searching for a different city or check back later.
            </p>
            
            <motion.div className="flex flex-wrap justify-center gap-3 mb-4">
                {["Lucknow", "Delhi", "Mumbai", "Bangalore", "Chennai"].map((city, i) => (
                    <motion.button 
                        key={city}
                        onClick={() => {
                            setSearchQuery(city);
                            handleSearch();
                        }}
                        className="bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full text-red-800 flex items-center gap-1 transition-colors border border-red-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MapPin size={14} />
                        {city}
                    </motion.button>
                ))}
            </motion.div>
        </motion.div>
    );

    return (
        <motion.div 
            className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background decorative elements */}
            <div className="hidden md:block fixed inset-0 pointer-events-none z-10">
                <div className="absolute top-20 left-0 w-full h-full">
                    <LeftDoodle1 props="absolute top-0 left-0 opacity-70" />
                    <LeftDoodle2 props="absolute top-1/4 left-0 opacity-70" />
                    <LeftDoodle3 props="absolute top-1/2 left-0 opacity-70" />
                    <LeftDoodle4 props="absolute bottom-20 left-0 opacity-70" />

                    <RightDoodle1 props="absolute top-0 right-0 rotate-0 opacity-70" />
                    <RightDoodle2 props="absolute top-1/4 right-0 rotate-135 opacity-70" />
                    <RightDoodle3 props="absolute top-1/2 right-0 rotate-225 opacity-70" />
                    <RightDoodle4 props="absolute bottom-20 right-0 rotate-315 opacity-70" />
                </div>
            </div>

            <div className="relative z-20 max-w-5xl mx-auto px-4 py-8">
                <motion.h1 
                    className="text-2xl md:text-5xl font-bold text-center mb-16 mt-6 bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                >
                    Explore Your <span className='text-[#902920] underline decoration-wavy decoration-2 underline-offset-8'>City</span>, Find Your Perfect <span className='text-[#902920] underline decoration-wavy decoration-2 underline-offset-8'>Stay</span>
                </motion.h1>
                
                <motion.form 
                    onSubmit={handleSearch} 
                    className="mb-16 flex justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="relative w-full md:w-3/4 max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search by city (e.g., Lucknow)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full px-6 py-4 pr-32 border-2 border-[#858484] rounded-full text-lg focus:outline-none focus:ring-3 focus:ring-red-300 focus:border-red-400 shadow-lg transition-all duration-300 hover:shadow-xl"
                        />
                        <motion.button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-700 to-red-600 text-white px-6 py-2 flex items-center gap-2 font-bold rounded-full hover:from-red-800 hover:to-red-700 transition-colors shadow-md"
                            whileTap={{ scale: 0.95 }}
                            style={{
                                zIndex: 10,
                                transform: "translateY(-50%)" // Ensure button stays centered
                            }}
                        >
                            <Search size={18} />
                            Search
                        </motion.button>
                    </div>
                </motion.form>

                {/* Conditionally show the searching animation */}
                <AnimatePresence>
                    {isLoading && activeSearchQuery && <SearchingAnimation />}
                </AnimatePresence>

                {isLoading && (
                    <LoadingAnimation />
                )}

                {isError && (
                    <motion.div 
                        className="text-center text-red-600 p-10 bg-red-50 rounded-lg shadow-inner border border-red-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-xl">Error loading blogs: {error?.message}</p>
                        <p className="mt-2">Please try again later or try a different search term.</p>
                    </motion.div>
                )}

                {!isLoading && allBlogs && allBlogs.length === 0 && (
                    <NoResultsAnimation />
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-12"
                    >
                        {!isLoading && blogs && blogs.map((blog: Blog, index: number) => (
                            <motion.div key={blog.id} variants={item}>
                                <BlogCard blog={blog} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {allBlogs && allBlogs.length > blogsPerPage && (
                    <motion.div 
                        className="flex justify-center items-center gap-4 mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.button 
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`flex items-center gap-1 px-5 py-3 rounded-lg font-medium ${
                                currentPage === 1 
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-red-700 to-red-600 text-white hover:from-red-800 hover:to-red-700'
                            } transition-all duration-300 shadow-md`}
                            whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                            whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                        >
                            <ChevronLeft size={18} />
                            Previous
                        </motion.button>
                        
                        <div className="text-lg font-medium text-gray-700">
                            Page {currentPage} of {totalPages}
                        </div>
                        
                        <motion.button 
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`flex items-center gap-1 px-5 py-3 rounded-lg font-medium ${
                                currentPage === totalPages 
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-red-700 to-red-600 text-white hover:from-red-800 hover:to-red-700'
                            } transition-all duration-300 shadow-md`}
                            whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                            whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                        >
                            Next
                            <ChevronRight size={18} />
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}