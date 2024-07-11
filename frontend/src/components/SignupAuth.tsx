import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import {SignupType} from "@vinayak2108/common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SignupAuth = () => {
    const [postInputs, setPostInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className="flex flex-col justify-center h-screen">
                <div className="flex justify-center">
                    <div>
                        <div className="px-10">
                            <div className="font-extrabold text-3xl">
                                Create an Account
                            </div>
                            <div className="text-slate-400">
                                Already have an account?
                                <Link to="/signin" className="underline pl-2">Login</Link>
                            </div>
                        </div>
                        <div className="pt-4">
                            <LabelledInput label="Name" placeholder="John Doe" onChange={(e) => {
                                setPostInputs({...postInputs, name: e.target.value})
                            }} type="text"/>
                            <LabelledInput label="Email" placeholder="johndoe@gmail.com" onChange={(e) => {
                                setPostInputs({...postInputs, email: e.target.value})
                            }} type="text"/>
                            <LabelledInput label="Password" placeholder="*******" onChange={(e) => {
                                setPostInputs({...postInputs, password: e.target.value})
                            }} type="password"/>
                            <button onClick={sendRequest} type="button" className="w-full mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Signup</button>

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