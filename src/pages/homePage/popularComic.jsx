import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Link} from "react-router-dom"


const PopularComic = () =>{

    // Shuffle function to shuffle the array
    function shuffleArray(array) {
        for (let i = array?.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Fetching comic item from API
    const { data: comicData } = useQuery({
        queryKey: ["GET_COMIC_ITEM"],
        queryFn() {
            return axios.get("http://localhost:8082/item/getAll");
        }
    });

    const shuffledComicData = shuffleArray(comicData?.data);            // Shuffle the comicData array
    const popularItems = shuffledComicData?.slice(0, 3);                // Extracting only the first three items from shuffledComicData

    return(
        <>
            <div className={"md:h-96 h-auto md:p-10 p-6 md:mb-52 "}>
                <h1 className={"md:text-4xl text-3xl gilroy-bold"}>Popular this week.</h1>
                <div className={"pt-6 md:flex justify-between flex-wrap"}>
                    {popularItems?.map((i) => {
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
        </>
    )
}

export default PopularComic