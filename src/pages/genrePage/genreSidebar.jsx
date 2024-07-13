import PropTypes from "prop-types";

const GenreSidebar = ({filterItem, genreList}) =>{

    return(
        <>
            <div className="md:pl-8 md:py-3 md:border-r-2 md:w-[17%] flex flex-col">
                <h1 className={"gilroy-semibold text-2xl"}>Genres</h1>
                <div className="w-full flex md:flex-col md:gap-2 gap-4 flex-row items-start pt-4">
                    {genreList.map((curElem) => (
                        <button
                            key={curElem}
                            className="md:bg-transparent bg-gray-400 rounded md:w-20 w-16 border-b-2 border-transparent text-gray-700 focus:border-black focus:bg-gray-300"
                            onClick={() => filterItem(curElem)}>
                            {curElem}
                            <span className="absolute top-0 right-0 transform translate-y-10 opacity-0 transition-opacity duration-200">&#10003;</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

GenreSidebar.propTypes = {
    filterItem: PropTypes.func.isRequired,
    genreList: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default GenreSidebar;