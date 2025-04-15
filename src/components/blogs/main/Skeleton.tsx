import React from 'react';
import { motion } from 'framer-motion';
import { Book, Type, Image as ImageIcon } from 'lucide-react';

export const BlogSkeleton: React.FC = () => {
    const shimmer = {
        hidden: { opacity: 0.3 },
        visible: { 
            opacity: 0.8,
            transition: {
                repeat: Infinity,
                repeatType: "reverse" as const,
                duration: 1.5
            }
        }
    };
    
    return (
        <motion.div
            className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full md:w-1/2 p-6 space-y-5 relative">
                {/* Title animation */}
                <div className="flex items-center mb-2">
                    <motion.div 
                        className="mr-3 text-red-800"
                        animate={{ rotate: [0, 10, 0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 5 }}
                    >
                        <Book size={24} />
                    </motion.div>
                    <motion.div 
                        className="h-8 bg-gradient-to-r from-red-100 to-red-200 rounded-lg w-3/4"
                        variants={shimmer}
                        initial="hidden"
                        animate="visible"
                    />
                </div>
                
                {/* Content lines */}
                <div className="space-y-3">
                    <div className="flex items-center">
                        <Type size={16} className="text-gray-400 mr-2" />
                        <motion.div 
                            className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"
                            variants={shimmer}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.1 }}
                        />
                    </div>
                    <motion.div 
                        className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6 ml-6"
                        variants={shimmer}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                    />
                    <motion.div 
                        className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/5 ml-6"
                        variants={shimmer}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 }}
                    />
                    <motion.div 
                        className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full ml-6"
                        variants={shimmer}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                    />
                </div>
                
                {/* City tag */}
                <div className="flex items-center">
                    <motion.div 
                        className="h-6 w-24 bg-gradient-to-r from-red-200 to-red-300 rounded-full"
                        variants={shimmer}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.5 }}
                    />
                </div>
                
                {/* Read more button */}
                <motion.div 
                    className="h-10 w-32 bg-gradient-to-r from-red-300 to-red-400 rounded-full mt-6"
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6 }}
                />
            </div>
            
            <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center"
                    animate={{ 
                        background: [
                            "linear-gradient(to bottom right, #fecaca, #fee2e2)",
                            "linear-gradient(to bottom right, #fee2e2, #fecdd3)",
                            "linear-gradient(to bottom right, #fecdd3, #fecaca)"
                        ]
                    }}
                    transition={{ 
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 3
                    }}
                >
                    <motion.div
                        animate={{ 
                            scale: [1, 1.05, 1],
                            opacity: [0.7, 0.8, 0.7]
                        }}
                        transition={{ 
                            repeat: Infinity,
                            duration: 2
                        }}
                        className="text-red-800/30"
                    >
                        <ImageIcon size={64} />
                    </motion.div>
                </motion.div>
                
                {/* Photo upload animation dots */}
                <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2.5 h-2.5 rounded-full bg-red-800"
                            animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{ 
                                repeat: Infinity,
                                duration: 1.5,
                                delay: i * 0.3
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// For the case when multiple skeletons are needed
export const BlogSkeletonGroup: React.FC<{count?: number}> = ({count = 3}) => (
    <div className="space-y-12">
        {Array(count).fill(null).map((_, index) => (
            <BlogSkeleton key={index} />
        ))}
    </div>
);