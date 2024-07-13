import { useRef, useEffect, useState } from "react";
import "./newSlidebar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import sliderData from "./sliderData.jsx";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Link} from "react-router-dom";

const NewSlidebar = () => {
    const slideRef = useRef(null);
    const [sliderItems, setSliderItems] = useState([]);

    useEffect(() => {
        // Fetch slider items from the API (you can use an HTTP request here)
        setSliderItems(sliderData);
    }, []);

    const handleNextClick = () => {
        if (slideRef.current) {
            const items = slideRef.current.querySelectorAll(".slider-item");
            slideRef.current.appendChild(items[0]);
        }
    };

    const handlePrevClick = () => {
        if (slideRef.current) {
            const items = slideRef.current.querySelectorAll(".slider-item");
            slideRef.current.prepend(items[items.length - 1]);
        }
    };

    // Fetching comic item from API
    const{data:comicData} = useQuery({
        queryKey:["GET_COMIC_ITEM"],
        queryFn(){
            return axios.get("http://localhost:8082/item/getAll")
        }
    })
    const comicSixData = comicData?.data.slice(-6);           //Displaying only six data

    return (
        <div className="slider-container">
            <div className="slide" ref={slideRef}>
                {comicSixData?.map((i) => (
                    <div
                        key={i?.itemId}
                        className="slider-item"
                        style={{ backgroundImage: `url(data:image/jpeg;base64,${i?.itemImage})`, borderRadius: "10px" }}
                    >
                        <div className="slider-content">
                            <div className="ItemName">{i?.itemName}</div>
                            <div className="slider-text ">Author : {i?.author}</div>
                            <div className="slider-text mb-4">Released Date : {new Date(i?.releasedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                            <Link to={"/GenrePage"}><button>See More</button></Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="slider-button">
                <button className="slider-prev" onClick={handlePrevClick}>
                    <IoIosArrowBack />
                </button>
                <button className="slider-next" onClick={handleNextClick}>
                    <IoIosArrowForward className={"float-right"}/>
                </button>
            </div>
        </div>
    );
};

export default NewSlidebar;
