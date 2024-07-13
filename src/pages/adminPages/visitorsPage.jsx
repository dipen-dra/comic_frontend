import AdminSidebar from "./adminComponents/adminSidebar.jsx";
import {useLocation} from "react-router-dom";
import {IoSearch} from "react-icons/io5";
import {useState} from "react";
import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import {MdDelete} from "react-icons/md";


const VisitorsPage = () => {

    const location = useLocation(); // Use useLocation to get the current location
    const currentLocation = location.pathname;

    const[search, setSearch] = useState('');

    // Fetching User Data from API
    const{data:userData,refetch} = useQuery({
        queryKey:["GET_USER_DATA"],
        queryFn(){
            return axios.get("http://localhost:8082/user/getAll",{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            });
        }
    })
    console.log(userData?.data)

    //Searching users
    const filteredUser = userData?.data.filter((user) => {
        const fullNameMatch = user.fullName.toLowerCase().includes(search.toLowerCase());
        const emailMatch = user.email.toLowerCase().includes(search.toLowerCase());
        return search.toLowerCase() === '' ? true : (fullNameMatch || emailMatch);
    });


    //Deleting User Data
    const deleteByIdApi=useMutation(
        {
            mutationKey:["DELETE_USER_BY_ID"],
            mutationFn(id){
                return axios.delete("http://localhost:8082/user/deleteById/"+id,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    },
                });
            }
            ,onSuccess(){refetch()}
        }
    )


    return(
        <>
            <div className={"visitor-main-div"}>
                <AdminSidebar activePage={currentLocation}/>
                <div className={"ml-60 px-6 pt-2 pb-24 flex flex-col items-center"}>
                    <div className={"w-full flex items-center justify-between"}>
                        <div className={"w-2/12 p-2"}>
                            <h1 className={"gilroy-bold text-3xl"}>Visitors</h1>
                            <h4 className={"font-semibold text-sm text-gray-600 ml-1"}>{filteredUser?.length} visitor found</h4>
                        </div>
                        <div className={"w-4/12 h-10 bg-gray-200 flex items-center justify-between rounded-xl px-2"}>
                            <input type={"search"} placeholder={"Search Users"} className={"w-full pl-1 bg-transparent"} value={search} onChange={(e)=> setSearch(e.target.value)}/>
                            <span className={"ml-1 text-xl cursor-pointer"}><IoSearch /></span>
                        </div>
                    </div>
                    <table className={"mt-8 w-10/12 text-lg rounded-xl "}>
                        <thead className={"h-12 text-white bg-gray-600 rounded-xl gilroy-semibold"}>
                        <tr>
                            <th className={"pl-1"}>User ID</th>
                            <th className={"px-10"}>Full Name</th>
                            <th className={"px-10"}>Email</th>
                            <th className={"px-10"}>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUser?.sort((a, b) => a.id - b.id)
                            .map((i) =>{
                                return(
                                    <tr  key={i?.id} className={"h-12 border-b-cyan-950 border-b"}>
                                        <td>{i?.id}</td>
                                        <td>{i?.fullName}</td>
                                        <td>{i?.email}</td>
                                        <td><h1 onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this comic item?")) {
                                                deleteByIdApi.mutate(i?.id);
                                            }}}
                                                className={"action-icon hover:text-red-800"}><MdDelete /></h1></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default VisitorsPage