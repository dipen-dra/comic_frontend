import './loginPage.css'
import Navbar from "../components/navbar.jsx";
import {MdEmail} from "react-icons/md";
import {IoMdLock} from "react-icons/io";
import {Link} from "react-router-dom";
import {BsFillPersonFill} from "react-icons/bs";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {BiMessageSquareError} from "react-icons/bi";

const RegisterPage = () =>{

    const{register,
        handleSubmit,
        formState,
        reset} = useForm();
    const {errors} = formState;

    const useApiCall = useMutation({
        mutationKey:["POST_USER_DATA"],
        mutationFn:(payload)=>{
            return axios.post("http://localhost:8082/user/save",payload)
        },onSuccess:()=>{
            reset();
            window.location.href = '/LoginPage';
        }
    })

    const onSubmit=(value)=>{
        useApiCall.mutate(value)
    }

    // const er = <BiMessageSquareError style={{marginTop:"1.5px"}}/>

    return(
        <>
            <div className={"login-main-div flex w-full h-screen pt-24 px-10 pb-4"}>
                <Navbar/>

                <form className={"w-full md:w-6/12 flex justify-center items-center -mt-28 md:-mt-6 flex-col"} onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={"text-3xl font-bold mb-1 flex"}>Welcome to Comic World</h1>
                    <h3>Please enter your details.</h3>
                    <div className={"md:w-6/12 w-11/12 h-12 border-solid border rounded-3xl border-gray-300 mt-14 flex items-center pl-4 pr-2"}>
                        <BsFillPersonFill style={{fontSize:"1.3rem",marginRight:"0.5rem",color:"gray"}}/>
                        <input type={"text"} placeholder={"Full Name"} className={"w-full outline-none"} {...register("fullName",{required:"Name is required"})}/>
                    </div>
                    <h6 className={"md:w-5/12 w-11/12 flex text-gray-500 text-xs"}>{errors?.fullName?.message}</h6>
                    <div className={"md:w-6/12 w-11/12 h-12 border-solid border rounded-3xl border-gray-300 mt-4 flex items-center pl-4 pr-2"}>
                        <MdEmail style={{fontSize:"1.4rem",marginRight:"0.5rem",color:"gray"}}/>
                        <input type={"text"} placeholder={"Email"} className={"w-full outline-none"}
                               {...register("email",{required:"Email is required",
                                   pattern: {
                                       value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                       message: "Invalid email address"
                                   }})}/>
                    </div>
                    {errors?.email && (<h6 className={"md:w-5/12 w-11/12 flex text-gray-500 text-xs"}>
                            <BiMessageSquareError style={{ marginRight: "0.1rem",marginTop:"0.1rem"}} />{errors?.email?.message}
                    </h6>)}
                    <div className={"md:w-6/12 w-11/12 h-12 border-solid border rounded-3xl border-gray-300 mt-4 flex items-center pl-4 pr-2"}>
                        <IoMdLock style={{fontSize:"1.4rem",marginRight:"0.5rem",color:"gray"}}/>
                        <input type={"password"} placeholder={"Password"} className={"w-full outline-none"}
                               {...register("password",{required:"Password is required",minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long"
                            }})}/>
                    </div>
                    <h6 className={"md:w-5/12 w-11/12 flex text-gray-500 text-xs"}>{errors?.password?.message}</h6>
                    <button className={"mt-8 md:w-6/12 w-11/12 rounded-3xl h-12 bg-black text-white text-lg font-normal transition duration-200 ease-in-out hover:bg-white hover:text-black hover:font-semibold border-2 border-black"} type={"submit"}>
                        Create Account
                    </button>
                    <div className={"md:w-6/12 w-11/12 flex justify-center pt-3 pr-1"}>
                        <h3 className={"text-gray-500"}>Already have an account? </h3>
                        <Link to={"/LoginPage"}><h3 className={"text-purple-700 ml-1 cursor-pointer transition-all"}>Sign in</h3></Link>
                    </div>
                </form>

                <div className="md:w-6/12 relative bg-cover bg-center" style={{ backgroundImage: "url('src/assets/comic3.webp')", borderRadius: "15%" }}>

                </div>

            </div>
        </>
    )
}

export default RegisterPage