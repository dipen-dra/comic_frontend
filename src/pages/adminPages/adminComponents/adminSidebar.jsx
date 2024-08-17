import { FaUserCog } from "react-icons/fa"; // Importing user cog icon from react-icons
import { BiSolidCategoryAlt } from "react-icons/bi"; // Importing category icon from react-icons
import { Link } from "react-router-dom"; // Importing Link for navigation between pages
import { MdCollectionsBookmark, MdSpaceDashboard } from "react-icons/md"; // Importing dashboard and bookmark icons
import comixNook from "../../../../public/Logos/comiz.png"; // Importing logo image
import adminImage from "../../../../public/Logos/messi.jpg"; // Importing admin profile image
import "./adminSidebar.css"; // Importing custom CSS for the sidebar
import { TbLogout2 } from "react-icons/tb"; // Importing logout icon from react-icons
import { doLogout } from "../../service/authService"; // Importing logout service function

// AdminSidebar component that takes activePage as a prop to highlight the current page
const AdminSidebar = ({ activePage }) => {

    // Fetching user information from localStorage
    const userName = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    // Function to handle logout
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?'); // Confirmation dialog
        if (confirmLogout) {
            doLogout(); // Execute logout function
            window.location.href = '/'; // Redirect to the homepage
        }
    };

    return (
        <>
            {/* Sidebar container */}
            <div className="admin-sidebar bg-gray-800 text-white h-screen w-60 flex flex-col justify-between">

                {/* Upper section: Logo and navigation links */}
                <div>
                    {/* Logo section */}
                    <div className="admin-logo p-4">
                        <img src={comixNook} alt="ComicNook" className="w-32 mx-auto" /> {/* Logo image */}
                    </div>

                    {/* Navigation links */}
                    <div className="sidebar-options mt-8">
                        <ul className="sidebar-list space-y-4">
                            {/* Dashboard link */}
                            <Link to="/AdminDashboard">
                                <li className={`sidebar-list-item p-2 flex items-center space-x-2 ${activePage === "/AdminDashboard" ? "bg-gray-700 rounded-md" : ""}`}>
                                    <MdSpaceDashboard style={{ fontSize: "18px" }} />
                                    <span>Dashboard</span>
                                </li>
                            </Link>

                            {/* Visitors link */}
                            <Link to="/VisitorsPage">
                                <li className={`sidebar-list-item p-2 flex items-center space-x-2 ${activePage === "/VisitorsPage" ? "bg-gray-700 rounded-md" : ""}`}>
                                    <FaUserCog style={{ fontSize: "18px" }} />
                                    <span>Visitors</span>
                                </li>
                            </Link>

                            {/* Manage Genre link */}
                            <Link to="/ManageGenre">
                                <li className={`sidebar-list-item p-2 flex items-center space-x-2 ${activePage === "/ManageGenre" ? "bg-gray-700 rounded-md" : ""}`}>
                                    <BiSolidCategoryAlt style={{ fontSize: "18px" }} />
                                    <span>Genres</span>
                                </li>
                            </Link>

                            {/* Manage Comics link */}
                            <Link to="/ManageComic">
                                <li className={`sidebar-list-item p-2 flex items-center space-x-2 ${activePage === "/ManageComic" ? "bg-gray-700 rounded-md" : ""}`}>
                                    <MdCollectionsBookmark style={{ fontSize: "18px" }} />
                                    <span>Manage Comics</span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>

                {/* Lower section: Admin info and logout button */}
                <div className="sidebar-btn-div p-4">
                    {/* Logout button with admin's info */}
                    <div onClick={handleLogout} className="sidebar-btn flex items-center p-2 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out">
                        {/* Admin profile image */}
                        <img src={adminImage} alt="Admin-Image" className="rounded-lg w-8 h-8 bg-center mr-2 opacity-95" style={{ objectFit: 'cover' }} />
                        <div>
                            {/* Admin's name and email */}
                            <h1 className="gilroy-semibold text-sm">{userName}</h1>
                            <h4 className="text-xs text-gray-400">{email}</h4>
                        </div>
                        {/* Logout icon */}
                        <TbLogout2 style={{ fontSize: "1.6rem", color: "gray" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar; // Exporting the AdminSidebar component
