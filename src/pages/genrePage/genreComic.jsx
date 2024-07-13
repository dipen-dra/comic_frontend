import {Link} from "react-router-dom";
import PropTypes from "prop-types";


const GenreComic = ({comicData}) =>{

    return(
        <>
            <div className="md:w-[80%] md:pl-8 flex justify-center">
                <div className={"pt-6 md:flex gap-11 flex-wrap"}>
                    {comicData.map((i) => {
                        return(
                            <Link key={i?.itemId} to={`/SingleComic/${i?.itemId}`} >
                                <div className={"md:w-[17rem] md:mb-0 mb-8 rounded-xl cursor-pointer shadow-xl hover:shadow-2xl hover:bg-gray-100 transform-gpu scale-100 hover:scale-105 transition-transform duration-500"}>
                                    <div className={"overflow-hidden rounded-t-xl"}>
                                        <img src={'data:image/jpeg;base64,'+i?.itemImage} className={"object-cover w-full md:h-[10rem] h-[12rem] transform-gpu scale-100 hover:scale-110 transition-transform duration-500"}/>
                                    </div>
                                    <div className={"px-2 pb-5"}>
                                        <h1 className={"gilroy-bold uppercase text-xs mt-1"}>Genre - {i?.genreId?.genre}</h1>
                                        <h1 className={"gilroy-bold md:text-xl text-sm"}>{i?.itemName}</h1>
                                        <h1 className={"gilroy-bold text-xs text-gray-600"}>Released Date : {new Date(i?.releasedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</h1>
                                    </div>
                                </div>
                            </Link>
                        )})}
                </div>
            </div>
        </>
    )
}

GenreComic.propTypes = {
    comicData: PropTypes.array.isRequired
};

export default GenreComic;