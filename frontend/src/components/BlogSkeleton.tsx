
export const BlogSkeleton = () => {
    return (
        <>
            <div role="status" className="w-1/2 px-4 animate-pulse">
                <div className="border-b border-slate-200 p-4 w-xl">
                    <div className="flex items-center">
                        <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                        <div className="pl-2 font-thin text-slate-400">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                    </div>
                    <div className="text-xl font-semibold pt-2">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="text-md font-thin">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="text-slate-400 pt-2">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

