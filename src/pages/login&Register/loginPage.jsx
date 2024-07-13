import './loginPage.css'
import Navbar from "../components/navbar.jsx";
import {MdEmail} from "react-icons/md";
import {IoMdLock} from "react-icons/io";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {doLogin} from "../service/authService";
import {useState} from "react";
import {useForm} from "react-hook-form";


const LoginPage = () =>{

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const{formState} = useForm();
    const {errors} = formState;

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8082/authenticate', credentials);

            if (response.status === 200) {
                const { token, userId, admin, userName, userEmail} = response.data.data;

                localStorage.setItem("userId", userId);
                localStorage.setItem("userName", userName);
                localStorage.setItem("userEmail", userEmail);

                doLogin(token);
                if (admin) {
                    navigate('/AdminDashboard');
                    window.alert('Login successful');
                } else {
                    window.alert('Login successful');
                    navigate('/');
                }
            }
        } catch (err) {
            window.alert('Invalid username and password');
        }
    };

    return(
        <>
            <div className={"login-main-div flex w-full h-screen pt-24 px-10 pb-4"}>
                <Navbar/>
                <form className={"w-full lg:w-6/12 flex justify-center items-center flex-col -mt-28 md:-mt-6"} onSubmit={handleLogin}>
                    <h1 className={"text-3xl font-bold mb-1 flex"}>Welcome to Comic World</h1>
                    <h3>Please enter your credentials.</h3>
                    <div className={"md:w-6/12 w-11/12 h-12 border-solid border rounded-3xl border-gray-300 mt-14 flex items-center pl-4 pr-2"}>
                        <MdEmail style={{fontSize:"1.4rem",marginRight:"0.5rem",color:"gray"}}/>
                        <input type={"email"} name={"email"} placeholder={"Email"} className={"w-full outline-none appearance-none"} value={credentials.email}
                               onChange={handleChange}/>
                    </div>
                    <h6 className={"md:w-5/12 w-11/12 flex text-gray-500 text-xs"}>{errors?.email?.message}</h6>
                    <div className={"md:w-6/12 w-11/12 h-12 border-solid border rounded-3xl border-gray-300 mt-4 flex items-center pl-4 pr-2"}>
                        <IoMdLock style={{fontSize:"1.4rem",marginRight:"0.5rem",color:"gray"}}/>
                        <input type={"password"} name={"password"} placeholder={"Password"} className={"w-full outline-none"} value={credentials.password}
                               onChange={handleChange}/>
                    </div>
                    <h6 className={"md:w-5/12 w-11/12 flex text-gray-500 text-xs"}>{errors?.password?.message}</h6>
                    <div className={"md:w-6/12 w-11/12 flex justify-end pt-3 pr-1"}>
                        <Link to={"/ForgetPassword"}><h3 className={"text-gray-500 cursor-pointer transition-all hover:text-black"}>Forgot password?</h3></Link>
                    </div>
                    <button className={"mt-8 md:w-6/12 w-11/12 rounded-3xl h-12 bg-black text-white text-lg font-normal transition duration-200 ease-in-out hover:bg-white hover:text-black hover:font-semibold border-2 border-black"} type={"submit"}>Login</button>
                    <div className={"md:w-6/12 w-11/12 flex justify-center pt-3 pr-1"}>
                        <h3 className={"text-gray-500"}>Don`t have an account? </h3>
                        <Link to={"/RegisterPage"}><h3 className={"text-purple-700 ml-1 cursor-pointer transition-all"}>Sign up</h3></Link>
                    </div>
                </form>
                <div className="lg:w-6/12 relative bg-cover bg-center" style={{ backgroundImage: "url('src/assets/marvel.jpg')", borderRadius: "15%" }}>
                </div>
            </div>
        </>
    )
}

export default LoginPage