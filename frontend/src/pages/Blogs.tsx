import { Link } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <>
                <AppBar />
                <div className="flex justify-center">
                    <BlogSkeleton />
                </div>
                ;
            </>
        );
    }
    return (
        <>
            <AppBar />
            <div className="flex justify-center">
                <div className="cursor-pointer ">
                    {blogs.map((blog) => (
                        <Link to={`/blog/${blog.id}`} key={blog.id}>
                            <BlogCard
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={"07-07-2024"}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};
