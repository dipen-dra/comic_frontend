import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useParams} from "react-router-dom";


const SingleComic = () =>{

    const { itemId } = useParams(); // Get itemId from URL parameter

    // Fetching comic item from API based on itemId
    const { data: comicItems } = useQuery({
        queryKey: ["GET_COMIC_ITEM", itemId], // Include itemId in the queryKey
        queryFn() {
            return axios.get(`http://localhost:8082/item/getAll`); // Fetch item by itemId
        }
    });

    console.log(itemId)
    // Filter the comic items to include only the one with the specified itemId
    const comicItem = comicItems?.data.filter(item => item.itemId === parseInt(itemId));

    return(
        <>
            <div className={"SingleComic-div"}>
                <Navbar/>
                {comicItem?.map((i)=> {
                    return(
                        <div key={i?.itemId} className={"md:mt-14 md:p-10 p-6 md:h-[40rem] h-[49rem] flex md:flex-row flex-col items-center md:justify-between"}>
                            <div className={"md:w-5/12 w-11/12 md:mt-0 mt-20 bg-cover flex items-center justify-center rounded-xl"}>
                                <img src={'data:image/jpeg;base64,'+i?.itemImage} className={"rounded-xl md:h-96 h-52 shadow-2xl object-cover"}/>
                            </div>
                            <div className={"md:w-6/12 w-full flex flex-col gap-4 ml-1 md:mt-0 mt-4"}>
                                <h1 className={"text-3xl gilroy-bold -ml-1"}>{i?.itemName}</h1>
                                <h4 className={"text-gray-500 md:text-base text-xs"}>{i?.itemDescription}</h4>
                                <div className={"flex md:flex-row flex-col md:gap-20 gap-2 text-lg gilroy-semibold"}>
                                    <h2 className={""}>Genre : {i?.genreId?.genre}</h2>
                                    <h2 className={"md:mt-0 -mt-2"}>
                                        Release Date : {}
                                        {new Date(i?.releasedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </h2>
                                </div>
                                <a href={i?.downloadLink} className={"btn-style2 md:w-3/12 w-5/12"}>
                                    <h3 className={"bg-black h-12 gilroy-semibold transition-effect"}><a>Download</a></h3>
                                </a>
                            </div>
                        </div>
                    )})}
                <Footer/>
            </div>
        </>
    )
}

export default SingleComic;