interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
    return (
        <div className="border-b border-slate-200 p-4 w-xl">
            <div className="flex items-center">
                <div className="flex flex-col justify-center">
                    <Avatar name={authorName} />
                </div>
                <div className="font-extralight pl-2">{authorName}</div>
                <div className="pl-2">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-400">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">{title}</div>
            <div className="text-md font-thin">
                {content.slice(0, 100)}
                {content.length > 100 ? "..." : ""}
            </div>
            <div className="text-slate-400 pt-2">
                {Math.ceil(content.length / 100)} min read
            </div>
        </div>
    );
};

export function Circle() {
    return <div className="h-1 w-1 bg-slate-400 rounded-full"></div>;
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "large"}) {
    return (
        <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className={`font-medium ${size==="small"?"text-xs":"text-lg"} text-gray-600 dark:text-gray-300`}>
                {name[0].toUpperCase()}
            </span>
        </div>
    );
}
