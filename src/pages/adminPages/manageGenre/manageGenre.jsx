import {IoSearch} from "react-icons/io5";
import {FaPlus} from "react-icons/fa";
import {MdDelete, MdEditSquare} from "react-icons/md";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import AdminSidebar from "../adminComponents/adminSidebar.jsx";


const ManageGenre = () =>{

    const[search, setSearch] = useState('');
    const navigate = useNavigate();

    // Sending data to backend
    const {register,
    handleSubmit,
    // formState,
    reset} = useForm();

    // const {errors} = formState;

    const useApiCall = useMutation({
        mutationKey:["POST_GENRE_DATA"],
        mutationFn:(payload)=>{
            console.log(payload)
            return axios.post("http://localhost:8082/genre/save",payload)
        },onSuccess: () => {
            reset();
            refetch();
        }
    })

    const onSubmit=(value)=>{
        useApiCall.mutate(value)
    }

    // Fetching genre from API
    const{data:genreData,refetch} = useQuery({
        queryKey:["GET_GENRE"],
        queryFn(){
            return axios.get("http://localhost:8082/genre/getAll")
        }
    })

    //Searching data
    const filteredData = genreData?.data.filter((i) => {
        return search.toLowerCase() === '' ? i :i?.genre.toLowerCase().includes(search);
    })

    //Deleting comic Genre
    const deleteByIdApi=useMutation(
        {
            mutationKey:["DELETE_GENRE_BY_ID"],
            mutationFn(id){
                return axios.delete("http://localhost:8082/genre/deleteById/"+id);
            }
            ,onSuccess(){refetch()}
        }
    )

    // Function to close the modal and reset the form fields
    const closeModalAndReset = () => {
        const modal = document.getElementById('my_modal_3');
        const form = modal.querySelector('form');
        modal.close();
        form.reset();
    };

    const location = useLocation(); // Use useLocation to get the current location
    const currentLocation = location.pathname;

    return(
        <>
            <div className={"manage-genre-div"}>
                <AdminSidebar activePage={currentLocation}/>
                <div className={"ml-60 px-6 pt-2 pb-24 flex flex-col items-center"}>
                    <div className={"w-full flex items-center justify-between"}>
                        <div className={"w-2/12 p-2"}>
                            <h1 className={"gilroy-bold text-3xl"}>Genres</h1>
                            <h4 className={"font-semibold text-sm text-gray-600"}>{filteredData?.length} genre found</h4>
                        </div>
                        <div className={"w-4/12 h-10 bg-gray-200 flex items-center justify-between rounded-xl px-2"}>
                            <input type={"search"} placeholder={"Search Genres"} className={"w-full pl-1 bg-transparent"} value={search} onChange={(e)=> setSearch(e.target.value)}/>
                            <span className={"ml-1 text-xl cursor-pointer"}><IoSearch /></span>
                        </div>
                        <div className={"btn-style2 bg-black rounded-xl"}>
                            <h3 className={"h-10 "} onClick={()=>document.getElementById('my_modal_3').showModal()}>
                                <a className={"gilroy-medium flex items-center px-2"}><FaPlus className={"text-sm mr-1"}/>Add Genre</a>
                            </h3>
                        </div>
                    </div>
                    <table className={"mt-8 w-10/12 text-lg rounded-xl "}>
                        <thead className={"h-12 text-white bg-gray-600 rounded-xl gilroy-semibold"}>
                            <tr>
                                <th className={"px-2"}>ID</th>
                                <th className={"px-10"}>Genre</th>
                                <th className={"px-10"}>Edit</th>
                                <th className={"px-10"}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredData?.sort((a, b) => a.id - b.id)
                            .map((i) =>{
                                return(
                                    <tr  key={i?.id} className={"h-12 border-b-cyan-950 border-b"}>
                                        <td>{i?.id}</td>
                                        <td>{i?.genre}</td>
                                        <td><h1 className={"action-icon hover:text-black"}
                                                onClick={()=>{
                                                    navigate("/EditGenre/"+i?.id);
                                                    console.log(i?.id)
                                                }}><MdEditSquare/></h1></td>
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

                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_3" className="modal w-4/12 h-64 mr-80 shadow-xl transform rounded-2xl ">
                    <div className="modal-box">
                        <form method="dialog" className={"px-6 py-6"} onSubmit={handleSubmit(onSubmit)}>
                            {/* if there is a button in form, it will close the modal */}
                            <button type={"button"} onClick={closeModalAndReset} className="btn w-8 h-8 rounded-full hover:bg-gray-200 btn-ghost absolute right-2 top-2">✕</button>
                            <h3 className="font-bold text-2xl">Add Genre</h3>
                            <div className={"w-full h-12 border-solid border rounded-xl border-gray-300 mt-10 flex items-center pl-4 pr-2"}>
                                <input type={"text"} placeholder={"Enter Genre Name"} className={"w-full outline-none appearance-none"} {...register("genre",{required:"Genre Name is required!!"})} />
                            </div>
                            {/*<h6 className={"text-xs pl-2 text-gray-500"}>{errors?.genre?.message}</h6>*/}

                            <button type={"submit"} className={"btn-add w-24 h-12 absolute bottom-6 right-6"}><a>Add</a></button>

                        </form>
                    </div>
                </dialog>

            </div>
        </>
    )
}

export default ManageGenre;