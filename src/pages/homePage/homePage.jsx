import "./homePage.css"
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import {Link} from "react-router-dom";
import PopularComic from "./popularComic.jsx";

const HomePage = () =>{
    return(
        <>
            <div className={"homepage-div"}>
                <Navbar/>
                <div className={"homepage-main-content md:p-10 p-5"}>
                    <h1 className={"md:text-6xl text-3xl gilroy-bold md:w-7/12"}>Discover the <p>coolest comic platform.</p></h1>
                    <div className={"btn-style2 mt-8 w-52"}>
                        <Link to={'/GenrePage'}>
                            <h3 className={"bg-black  rounded-2xl h-14 gilroy-bold transition-effect"}>
                                <a className={"text-xl"}>Explore Comics</a>
                            </h3>
                        </Link>
                    </div>
                </div>
                <PopularComic/>
                <Footer/>
            </div>
        </>
    )
}

export default HomePage;