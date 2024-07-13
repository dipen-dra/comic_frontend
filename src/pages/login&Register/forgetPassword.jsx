import './loginPage.css'
import Navbar from "../components/navbar.jsx";
import {MdEmail} from "react-icons/md";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

const ForgetPassword = () =>{

    const{register,
        handleSubmit,
        formState,
        reset} = useForm();
    const {errors} = formState;

    return(
        <>
            <div className={"login-main-div flex w-full h-screen pt-24 px-10 pb-4"}>
                <Navbar/>
                <form className={"w-full md:w-6/12 flex justify-center items-center -mt-28 md:-mt-6 flex-col"}>
                    <h1 className={"text-3xl font-bold mb-1 flex"}>Forgot Password?</h1>
                    <h3>No worries, we'll send you reset instructions.</h3>
                    <div className={"md:w-6/12 w-11/12 h-12 border-solid border rounded-3xl border-gray-300 mt-14 flex items-center pl-4 pr-2"}>
                        <MdEmail style={{fontSize:"1.4rem",marginRight:"0.5rem",color:"gray"}}/>
                        <input type={"text"} placeholder={"Enter your email"} className={"w-full outline-none"} {...register("email",{required:"Email is required"})}/>
                    </div>
                    <h6 className={"md:w-5/12 w-11/12 flex text-gray-500 text-xs"}>{errors?.email?.message}</h6>
                    <button className={"mt-4 md:w-6/12 w-11/12 rounded-3xl h-12 bg-black text-white text-lg font-normal transition duration-200 ease-in-out hover:bg-white hover:text-black hover:font-semibold border-2 border-black"}>
                        Reset Password
                    </button>
                    <div className={"md:w-6/12 w-11/12 flex justify-center pt-3 pr-1"}>
                        <h3 className={"text-gray-500"}>Nevermind! take me back to</h3>
                        <Link to={"/LoginPage"}><h3 className={"text-purple-700 ml-1 cursor-pointer transition-all"}>Sign in</h3></Link>
                    </div>
                </form>
                <div className="md:w-6/12 relative bg-cover bg-center" style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp13366070.jpg')", borderRadius: "15%" }}>

                </div>

            </div>
        </>
    )
}

export default ForgetPassword;