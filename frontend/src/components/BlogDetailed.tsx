import { BlogType } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";

export const BlogDetailed = ({ blog }: { blog: BlogType }) => {
    return (
        <>
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 w-full px-12 pt-12 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-4">
                            Published on 07-07-2024
                        </div>
                        <div className="pt-4">{blog.content}</div>
                    </div>
                    <div className="col-span-4">
                        <div className="font-semibold">Author</div>
                        <div className="flex">
                            <div className="pr-4 flex items-center">
                                <Avatar
                                    name={blog.author.name || "Anonymous"}
                                    size="large"
                                />
                            </div>
                            <div className="">
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random catchphrase here to make the author
                                    look cool and interesting to the readers.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
