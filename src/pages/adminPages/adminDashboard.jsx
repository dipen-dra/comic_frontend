import AdminSidebar from "./adminComponents/adminSidebar.jsx";
import { useLocation } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdCollectionsBookmark } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AdminDashboard = () => {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    const location = useLocation(); // Use useLocation to get the current location
    const currentLocation = location.pathname;

    // Fetching comic item from API
    const { data: itemData } = useQuery({
        queryKey: ["GET_COMIC_ITEM"],
        queryFn: () => axios.get("http://localhost:8082/item/getAll"),
    });
    const itemLength = itemData?.data?.length || 0;

    // Fetching genre from API
    const { data: genreData } = useQuery({
        queryKey: ["GET_GENRE"],
        queryFn: () => axios.get("http://localhost:8082/genre/getAll"),
    });
    const genreLength = genreData?.data?.length || 0;

    // Fetching User Data from API
    const { data: userData } = useQuery({
        queryKey: ["GET_USER_DATA"],
        queryFn: () => axios.get("http://localhost:8082/user/getAll"),
    });
    const userLength = userData?.data?.length || 0;

    const userName = localStorage.getItem('userName') || 'User';
    const firstName = userName.split(' ')[0];

    return (
        <>
            <div className={"dashboard-main-div"}>
                <AdminSidebar activePage={currentLocation} />
                <div className={"ml-60 px-6 pt-6 items-center"}>
                    <div className={"flex justify-between"}>
                        <h1 className={"text-2xl text-gray-800 gilroy-bold"}>Hello, {firstName}</h1>
                        <h1 className={"text-gray-400 text-sm"}>
                            <i className="fa-solid fa-calendar mr-1"></i>{formattedDate}
                        </h1>
                    </div>
                    <div className={"w-full mt-12 px-6 flex justify-between"}>
                        <div className={"w-[18rem] h-36 bg-blue-100 px-5 py-3 rounded-2xl"}>
                            <span className={"justify-between flex text-lg mb-3"}>
                                <h3 className={"text-black gilroy-medium flex items-center"}>Total Visitors</h3>
                                <span><FaUserCog style={{ fontSize: "1.5rem" }} /></span>
                            </span>
                            {/* Progress bar */}
                            <div className="w-full progress-bar h-[4px] bg-gray-300 my-5">
                                <div className="progress-bar h-full bg-gradient-to-r from-black to-blue-500" style={{ width: `${(userLength / 10) * 100}%` }}></div>
                            </div>
                            <h1 className={"text-3xl gilroy-bold"}>{userLength}</h1>
                        </div>
                        <div className={"w-[18rem] h-36 bg-orange-100 px-5 py-3 rounded-2xl"}>
                            <span className={"justify-between flex text-lg mb-3"}>
                                <h3 className={"text-black gilroy-medium flex items-center"}>Total Genres</h3>
                                <span><BiSolidCategoryAlt style={{ fontSize: "1.5rem" }} /></span>
                            </span>
                            {/* Progress bar */}
                            <div className="w-full h-[4px] progress-bar bg-gray-200 my-5">
                                <div className="progress-bar h-full bg-gradient-to-r from-black to-orange-500" style={{ width: `${(genreLength / 8) * 100}%` }}></div>
                            </div>
                            <h1 className={"text-3xl gilroy-bold"}>{genreLength}</h1>
                        </div>
                        <div className={"w-[18rem] h-36 bg-gray-950 px-5 py-3 rounded-2xl text-white"}>
                            <span className={"justify-between flex text-lg mb-3"}>
                                <h3 className={"text-white gilroy-medium flex items-center"}>Total Comics</h3>
                                <span><MdCollectionsBookmark style={{ fontSize: "1.5rem", color: "white" }} /></span>
                            </span>
                            {/* Progress bar */}
                            <div className="w-full h-[4px] bg-gray-300 progress-bar my-5">
                                <div className="progress-bar h-full bg-gradient-to-r from-blue-500 to-white" style={{ width: `${(itemLength / 10) * 100}%` }}></div>
                            </div>
                            <h1 className={"text-3xl gilroy-bold"}>{itemLength}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;
