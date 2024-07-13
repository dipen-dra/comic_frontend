import { FaUserCog } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdCollectionsBookmark, MdSpaceDashboard } from "react-icons/md";
import comixNook from "../../../../public/Logos/comiz.png";
import adminImage from "../../../../public/Logos/messi.jpg";
import "./adminSidebar.css";
import { TbLogout2 } from "react-icons/tb";
import { doLogout } from "../../service/authService";

// eslint-disable-next-line react/prop-types
const AdminSidebar = ({ activePage }) => {

    const userName = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            doLogout();
            window.location.href = '/';
        }
    };

    return (
        <>
            <div className="admin-sidebar bg-gray-800 text-white h-screen w-60 flex flex-col justify-between">
                <div>
                    <div className="admin-logo p-4">
                        <img src={comixNook} alt="ComicNook" className="w-32 mx-auto" />
                    </div>

                    <div className="sidebar-options mt-8">
                        <ul className="sidebar-list space-y-4">
                            <Link to="/AdminDashboard">
                                <li className={`sidebar-list-item p-2 flex items-center space-x-2 ${activePage === "/AdminDashboard" ? "bg-gray-700 rounded-md" : ""}`}>
                                    <MdSpaceDashboard style={{ fontSize: "18px" }} />
                                    <span>Dashboard</span>
                                </li>
                            </Link>
                            <Link to="/VisitorsPage">
                                <li className={`sidebar-list-item p-2 flex items-center space-x-2 ${activePage === "/VisitorsPage" ? "bg-gray-700 rounded-md" : ""}`}>
                                    <FaUserCog style={{ fontSize: "18px" }} />
                                    <span>Visitors</span>
                                </li>
                            </Link>
                            <Link to="/ManageGenre">
                                <li className={`sidebar-list-item p-2 flex items-center space-x-2 ${activePage === "/ManageGenre" ? "bg-gray-700 rounded-md" : ""}`}>
                                    <BiSolidCategoryAlt style={{ fontSize: "18px" }} />
                                    <span>Genres</span>
                                </li>
                            </Link>
                            <Link to="/ManageComic">
                                <li className={`sidebar-list-item p-2 flex items-center space-x-2 ${activePage === "/ManageComic" ? "bg-gray-700 rounded-md" : ""}`}>
                                    <MdCollectionsBookmark style={{ fontSize: "18px" }} />
                                    <span>Manage Comics</span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>

                <div className="sidebar-btn-div p-4">
                    <div onClick={handleLogout} className="sidebar-btn flex items-center p-2 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out">
                        <img src={adminImage} alt="Admin-Image" className="rounded-lg w-8 h-8 bg-center mr-2 opacity-95" style={{ objectFit: 'cover' }} />
                        <div>
                            <h1 className="gilroy-semibold text-sm">{userName}</h1>
                            <h4 className="text-xs text-gray-400">{email}</h4>
                        </div>
                        <TbLogout2 style={{ fontSize: "1.6rem", color: "gray" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar;
