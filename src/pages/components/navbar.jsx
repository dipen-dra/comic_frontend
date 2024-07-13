import {Component} from "react";
import "./navbar.css"
import {Link, NavLink} from "react-router-dom";
import comicWorld from "../../../public/Logos/comiz.png"
import {FaSearch} from "react-icons/fa";
import {isAuthenticated,doLogout} from "../service/authService";

class Navbar extends Component{

    state = {clicked: false};
    handleClick = () =>{
        this.setState({clicked: !this.state.clicked})
    }

    render() {

        const handleLogout = () => {
            const confirmLogout = window.confirm('Are you sure you want to logout?');
            if (confirmLogout) {
                doLogout();
                window.location.href = '/';
            }
        };

        const userName = localStorage.getItem('userName');

        return(
            <nav className={"NavbarItems"}>
                <h1 className={"navbar-logo"}>
                    <img src={comicWorld} alt={"Comic World"} width={"140px"}/>
                </h1>

                <div className={"menu-icons"} onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"} style={{fontSize:"25px"}}></i>
                </div>
                <div> </div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    <div className={"nav-menu-list"}>
                        <li>
                            <NavLink to={"/"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/GenrePage"}>Genre</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/NewPage"}>New</NavLink>
                        </li>
                        <Link to={'/SearchPage'}><div className={"navbar-search-wrapper"}>
                            <input type={"search"} placeholder={"Search"}/>
                            <span className={"animate-pulse search-span"}><FaSearch/></span>
                        </div></Link>
                    </div>
                    <div className={"navbar-right btn-style"} >
                        {isAuthenticated() && userName ? (
                            <h1 className={"btn-style2"}>
                                <h3 className={"bg-black flex justify-center"} onClick={handleLogout}><a>Logout</a></h3>
                            </h1>
                            ) : (
                            <Link to={'/LoginPage'}>
                                <h3 className={"flex justify-center"}><a>Sign-In</a></h3>
                            </Link>
                            )}
                    </div>
                </ul>
            </nav>
        )
    }
}
export default Navbar