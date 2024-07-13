import "./newPage.css"
import Navbar from "../components/navbar.jsx";
import NewSlidebar from "./newSlidebar.jsx";
import Footer from "../components/footer.jsx";

const NewPage =() =>{
    return(
        <>
            <div className={"newpage-div"}>
                <Navbar/>
                <div className={"newpage-main-content"}>
                    <NewSlidebar/>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default NewPage