import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const AppBar = () => {
    return (
        <>
            <div className="flex justify-between border-b px-10 py-2 items-center">
                <Link to="/blogs" className="font-semibold cursor-pointer">
                    Medium
                </Link>
                <div className="">
                    <Link to="/publish">
                        <button
                            type="button"
                            className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 "
                        >
                            New
                        </button>
                    </Link>
                    <Avatar name={"Vinayak"} size={"large"} />
                </div>
            </div>
        </>
    );
};
