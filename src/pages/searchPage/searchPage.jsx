import {Link} from "react-router-dom";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";
import {FaSearch} from "react-icons/fa";
import Footer from "../components/footer.jsx";
import comixNook from "../../../public/Logos/comiz.png";

const SearchPage = () => {

    const[search, setSearch] = useState('');

    // Focus on the input field when the component mounts
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []); // Empty dependency array to run only on mount

    // Fetching comic item from API
    const { data: comicData } = useQuery({
        queryKey: ["GET_COMIC_ITEM"],
        queryFn() {
            return axios.get("http://localhost:8082/item/getAll");
        }
    });

    // Searching comics
    const filteredComicData = comicData?.data.filter((item) => {
        const itemName = item?.itemName || ""; // Handling case where item name is undefined
        const searchQuery = search.toLowerCase(); // Convert search query to lowercase
        const itemNameLower = itemName.toLowerCase(); // Convert item name to lowercase
        return searchQuery === '' ? true : itemNameLower.includes(searchQuery);
    });


    return(
        <>
            <div className={""}>
                <div className={"flex flex-col items-center pt-7 min-h-[40rem]"}>
                    <div className={"w-full flex justify-between items-center md:px-12 px-6"}>
                        <h1 className={"text-gray-600 cursor-pointer hover:text-black transition-effect"}>
                            <Link to={'/'}><img src={comixNook} alt={"ComicNook"} width={"150px"}/></Link>
                        </h1>
                        <div className={"md:w-4/12 w-6/12 h-11 flex items-center justify-between rounded-3xl px-2 border-purple-950 border"}>
                            <input type={"search"} ref={inputRef} placeholder={"Search Comics"} className={"w-full md:pr-2 pr-8 bg-transparent text-center"} value={search} onChange={(e)=> setSearch(e.target.value)}/>
                            <span className={"animate-pulse search-span"}><FaSearch/></span>
                        </div>
                        <div className={"md:block hidden btn-style"} >
                            <Link to={'/LoginPage'}><h3><a>Sign-Up</a></h3></Link>
                        </div>
                    </div>

                    <div className={"w-full md:p-10 p-6 md:mt-2"}>
                        <div className={"pt-6 md:flex gap-9 flex-wrap"}>
                            {filteredComicData?.map((i) => {
                                return(
                                    <Link key={i?.itemId} to={`/SingleComic/${i?.itemId}`} >
                                        <div className={"md:w-[23rem] md:mb-0 mb-8 rounded-xl cursor-pointer shadow-xl hover:shadow-2xl hover:bg-gray-100 transform-gpu scale-100 hover:scale-105 transition-transform duration-500"}>
                                            <div className={"overflow-hidden rounded-t-xl"}>
                                                <img src={'data:image/jpeg;base64,'+i?.itemImage} className={"bg-cover h-[15rem] transform-gpu scale-100 hover:scale-110 transition-transform duration-500"}/>
                                            </div>
                                            <div className={"px-2 pb-5"}>
                                                <h1 className={"gilroy-bold uppercase md:text-sm text-xs mt-1"}>Genre - {i?.genreId?.genre}</h1>
                                                <h1 className={"gilroy-bold md:text-3xl text-2xl"}>{i?.itemName}</h1>
                                                <h1 className={"gilroy-bold md:text-sm text-xs text-gray-600"}>Released Date : {new Date(i?.releasedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</h1>
                                            </div>
                                        </div>
                                    </Link>
                                )})}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default SearchPage