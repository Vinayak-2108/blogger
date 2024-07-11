import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { BlogDetailed } from "../components/BlogDetailed";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || "",
    });
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {blog && <BlogDetailed blog={blog}/>}
        </div>
    );
};
