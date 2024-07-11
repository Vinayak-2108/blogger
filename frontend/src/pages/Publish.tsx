import { ChangeEvent, useState } from "react";
import { AppBar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { decode } from "hono/jwt"; 

export const Publish = () => {
    const [title, setTitle] = useState("Title");
    const [description, setDescription] = useState("Title");
    const navigate = useNavigate();
    return (
        <>
            <AppBar />
            <div className="flex justify-center pt-8">
                <div className="max-w-screen-lg w-full px-2 max-h-screen">
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title"
                        required
                    />
                    <TextEditor onChange={(e)=> setDescription(e.target.value)} />
                    <button
                        type="submit"
                        onClick={async()=>{
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog/blog`,{
                                title,
                                content: description,
                                authorId: decode(localStorage.getItem("token")!).payload.id
                            },{
                                headers:{
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            })
                            navigate(`/blog/${response.data.id}`)
                        }}
                        
                        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                        Publish
                    </button>
                </div>
            </div>
        </>
    );
};

function TextEditor({onChange}: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}){
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-full w-full">
                        <label className="sr-only">Publish Post</label>
                        <textarea
                            id="editor"
                            rows={8}
                            onChange={onChange}
                            className="block w-full px-0 text-sm focus:outline-none text-gray-800 bg-white border-0 pl-2"
                            placeholder="Write something"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
