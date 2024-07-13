import Footer from "../components/footer.jsx";
import Navbar from "../components/navbar.jsx";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useEffect, useState} from "react";
import GenreSidebar from "./genreSidebar.jsx";
import GenreComic from "./genreComic.jsx";


const GenrePage = () => {

    const { data: Comic } = useQuery({
        queryKey: ["GET_COMIC_DATA"],
        queryFn() {
            return axios.get("http://localhost:8082/item/getAll")
        },
    });


    const [comicData, setComicData] = useState([]);
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        if (Comic?.data) {
            setComicData(Comic.data);

            const uniqueCategories = [
                "All",
                ...new Set(
                    Comic?.data.map((curElem) => curElem?.genreId.genre || "Uncategorized")
                ),

            ];
            setGenreList(uniqueCategories);
        }
    }, [Comic?.data]);
    // console.log(Comic?.data)

    const filterItem = (genre) => {
        if (genre === "All") {
            setComicData(Comic?.data || []);
            return;
        }

        const updatedList = Comic?.data?.filter((curElem) => {
            return curElem?.genreId.genre === genre;
        }) || [];

        setComicData(updatedList);
    };

    return(
        <>
            <div className={"GenrePage-div"}>
                <Navbar/>
                <div className={"md:p-10 p-5 md:mt-14 mt-[4.5rem] md:h-[44rem] min-h-screen flex md:flex-row flex-col"}>
                    <GenreSidebar filterItem={filterItem} genreList={genreList}/>
                    <GenreComic comicData={comicData}/>
                </div>
                <Footer/>
            </div>

        </>
    )
}

export default GenrePage;