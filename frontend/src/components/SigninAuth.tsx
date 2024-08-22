import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import {SigninType} from "@vinayak2108/common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SigninAuth = () => {
    const [postInputs, setPostInputs] = useState<SigninType>({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        } catch (e: any) {
            alert(e.response.data.error)
        }
    }
    return (
        <>
            <div className="flex flex-col justify-center h-screen">
                <div className="flex justify-center">
                    <div>
                        <div className="px-10">
                            <div className="font-extrabold text-3xl">
                                Account Login
                            </div>
                            <div className="text-slate-400">
                                Don't have an account?
                                <Link to="/signup" className="underline pl-2">Signup</Link>
                            </div>
                        </div>
                        <div className="pt-4">
                            <LabelledInput label="Email" placeholder="johndoe@gmail.com" onChange={(e) => {
                                setPostInputs({...postInputs, email: e.target.value})
                            }} type="text"/>
                            <LabelledInput label="Password" placeholder="*******" onChange={(e) => {
                                setPostInputs({...postInputs, password: e.target.value})
                            }} type="password"/>
                            <button onClick={sendRequest} type="button" className="w-full mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Signin</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface LabelledInputType{
    label: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type: string
}

function LabelledInput({label, placeholder, onChange, type}:LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900 pt-2">{label}</label>
            <input type={type || "text"} onChange={onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}