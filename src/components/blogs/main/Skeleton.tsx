




export const BlogSkeleton: React.FC = () => (
    <div className="bg-white border-2 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row animate-pulse">
        <div className="w-full md:w-1/2 p-4 space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/5"></div>
            </div>
        </div>
        <div className="w-full md:w-1/2 bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                <path d="M480 80C480 35.82 444.18 0 400 0H240C195.82 0 160 35.82 160 80V128H80C35.82 128 0 163.82 0 208V432C0 476.18 35.82 512 80 512H400C444.18 512 480 476.18 480 432V384H560C604.18 384 640 348.18 640 304V176C640 131.82 604.18 96 560 96H480V80zM320 464C280.38 464 248 431.63 248 392C248 352.38 280.38 320 320 320C359.63 320 392 352.38 392 392C392 431.63 359.63 464 320 464z"/>
            </svg>
        </div>
    </div>
);