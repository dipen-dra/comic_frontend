import AdminSidebar from "../adminComponents/adminSidebar.jsx";
import {IoSearch} from "react-icons/io5";
import {MdDelete, MdEditSquare} from "react-icons/md";
import {useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {FaPlusCircle} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";

const ManageComic = () => {

    // State to manage the search input value
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // Use useLocation to get the current location
    const location = useLocation();
    const currentLocation = location.pathname;

    // React Hook Form setup for form handling
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    // Mutation for sending comic data to the backend
    const useApiCall = useMutation({
        mutationKey: ["POST_COMIC_DATA"],
        mutationFn: (payload) => {
            console.log(payload)
            return axios.post("http://localhost:8082/item/save", payload)
        },
        onSuccess: () => {
            reset();  // Reset form fields on successful submission
            refetch();  // Refetch comic data after adding a new comic
        }
    });

    // Handler for form submission
    const onSubmit = (value) => {
        console.log(value);
        const fd = new FormData();
        fd.append("itemName", value?.itemName);
        fd.append("releasedDate", value?.releasedDate);
        fd.append("itemDescription", value?.itemDescription);
        fd.append("downloadLink", value?.downloadLink);
        fd.append("genreId", value?.genreId);
        fd.append("itemImage", value?.itemImage[0]);
        useApiCall.mutate(fd);
    }

    // Query for fetching all comic items from the API
    const {data: itemData, refetch} = useQuery({
        queryKey: ["GET_COMIC_ITEM"],
        queryFn() {
            return axios.get("http://localhost:8082/item/getAll")
        }
    });

    // Query for fetching all genres from the API
    const {data: genreData} = useQuery({
        queryKey: ["GET_GENRE"],
        queryFn() {
            return axios.get("http://localhost:8082/genre/getAll")
        }
    });

    // Filter comic data based on search input
    const filteredData = itemData?.data.filter((i) => {
        return search.toLowerCase() === '' ? i : i?.itemName.toLowerCase().includes(search);
    });

    // Mutation for deleting a comic item by ID
    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_COMIC_BY_ID"],
        mutationFn(id) {
            return axios.delete("http://localhost:8082/item/deleteById/" + id);
        },
        onSuccess() {
            refetch();  // Refetch comic data after deletion
        }
    });

    // Function to close the modal and reset the form fields
    const closeModalAndReset = () => {
        const modal = document.getElementById('my_modal_3');
        const form = modal.querySelector('form');
        modal.close();
        form.reset();
    };

    return (
        <>
            <div className={"manage-comic-div"}>
                {/* Admin Sidebar */}
                <AdminSidebar activePage={currentLocation}/>
                <div className={"ml-60 px-6 pt-2 pb-24 flex flex-col items-center"}>
                    <div className={"w-full flex items-center justify-between"}>
                        <div className={"w-2/12 p-2"}>
                            <h1 className={"gilroy-bold text-3xl"}>Comics</h1>
                            <h4 className={"font-semibold text-sm text-gray-600"}>{filteredData?.length} comic found</h4>
                        </div>
                        {/* Search Bar */}
                        <div className={"w-4/12 h-10 bg-gray-200 flex items-center justify-between rounded-xl px-2"}>
                            <input type={"search"} placeholder={"Search Comics"} className={"pl-1 w-full bg-transparent"}
                                   value={search} onChange={(e) => setSearch(e.target.value)}/>
                            <span className={"ml-1 text-xl cursor-pointer"}><IoSearch/></span>
                        </div>
                        {/* Add Comic Button */}
                        <div className={"btn-style2 bg-black rounded-xl"}>
                            <h3 className={"h-10"} onClick={() => document.getElementById('my_modal_3').showModal()}>
                                <a className={"gilroy-medium flex items-center px-2"}><FaPlusCircle className={"text-lg mr-1"}/>Add Comic</a>
                            </h3>
                        </div>
                    </div>

                    {/* Comics Table */}
                    <table className={"mt-8 w-full text-lg rounded-xl"}>
                        <thead className={"h-12 text-white bg-gray-600 rounded-xl gilroy-semibold"}>
                        <tr>
                            <th className={"px-2"}>ID</th>
                            <th className={"px-20"}>Comics Name</th>
                            <th className={"px-6"}>Genre</th>
                            <th className={"px-6"}>Image</th>
                            <th className={"px-4"}>Released date</th>
                            <th className={"px-8"}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredData?.sort((a, b) => a.id - b.id)
                                .map((i) => {
                                    return (
                                        <tr key={i?.itemId} className={"h-12 border-b-cyan-950 border-b"}>
                                            <td>{i?.itemId}</td>
                                            <td>{i?.itemName}</td>
                                            <td>{i?.genreId?.genre}</td>
                                            <td>
                                                <h1 className={"flex justify-center"}>
                                                    <img src={'data:image/jpeg;base64,' + i?.itemImage} width={"45px"}/>
                                                </h1>
                                            </td>
                                            <td>{new Date(i?.releasedDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}</td>
                                            {/* Action Buttons for Editing and Deleting */}
                                            <td className={"flex gap-4 justify-center"}>
                                                <h1 className={"action-icon hover:text-black"}
                                                    onClick={() => {
                                                        navigate("/EditComic/" + i?.itemId);
                                                        console.log(i?.id)
                                                    }}><MdEditSquare/></h1>
                                                <h1 onClick={() => {
                                                    if (window.confirm("Are you sure you want to delete this comic item?")) {
                                                        deleteByIdApi.mutate(i?.itemId);
                                                    }
                                                }}
                                                    className={"action-icon hover:text-red-800"}><MdDelete/></h1>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                        </tbody>
                    </table>
                </div>

                {/* Add Comic Modal */}
                <dialog id="my_modal_3" className="modal w-4/12 h-[29rem] mr-80 shadow-2xl transform rounded-2xl ">
                    <div className="modal-box">
                        {/* Form for Adding a Comic */}
                        <form method="dialog" className={"px-6 py-6"} onSubmit={handleSubmit(onSubmit)}>
                            {/* Close Modal Button */}
                            <button type={"button"} onClick={closeModalAndReset}
                                    className="btn w-8 h-8 rounded-full hover:bg-gray-200 btn-ghost absolute right-2 top-2">✕
                            </button>
                            <h3 className="font-bold text-2xl">Add Comic</h3>
                            {/* Genre Selection */}
                            <div className={"w-full h-12 border-solid mt-6 border rounded-xl border-gray-300 flex items-center pl-3 pr-2"}>
                                <select className={"w-full outline-none cursor-pointer"} {...register("genreId", {required: true})}>
                                    <option disabled selected>Select Genre</option>
                                    {genreData && genreData.data.map((i) => (
                                        <option key={i.id} value={i.id}>{i.genre}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Comic Name Input */}
                            <div className={"w-full h-12 border-solid border rounded-xl border-gray-300 mt-5 flex items-center pl-3 pr-2"}>
                                <input type={"text"} placeholder={"Enter Comic Name"}
                                       className={"w-full outline-none appearance-none"} {...register("itemName", {required: "Item name is required"})}/>
                            </div>
                            {/* Description and Download Link Inputs */}
                            <div className={"flex justify-between mt-5"}>
                                <div className={"w-5/12 h-12 border-solid border rounded-xl border-gray-300 flex items-center pl-3 pr-2 mr-1"}>
                                    <input type={"text"} placeholder={"Enter Description"}
                                           className={"w-full outline-none appearance-none"} {...register("itemDescription", {required: "itemDescription is required"})}/>
                                </div>
                                <div className={"w-7/12 h-12 border-solid border rounded-xl border-gray-300 flex items-center pl-3 pr-2"}>
                                    <input type={"text"} placeholder={"Enter Download Link"}
                                           className={"w-full outline-none appearance-none"} {...register("downloadLink", {required: "downloadLink is required"})}/>
                                </div>
                            </div>
                            {/* Release Date and Image Upload Inputs */}
                            <div className={"flex justify-between mt-5"}>
                                <div className={"w-5/12 h-12 border-solid border rounded-xl border-gray-300 flex items-center pl-3 pr-2 mr-1"}>
                                    <input type={"date"} placeholder={"Select Released Date"}
                                           className={"w-full outline-none appearance-none"} {...register("releasedDate", {required: "releasedDate is required"})}/>
                                </div>
                                <div className={"w-7/12 h-12 border-solid border rounded-xl border-gray-300 flex items-center pl-3 pr-2"}>
                                    <input type={"file"} placeholder={"Select Image"} accept="image/*"
                                           className={"w-full outline-none appearance-none"} {...register("itemImage", {required: "Image is required"})}/>
                                </div>
                            </div>
                            {/* Add Comic Button */}
                            <button type={"submit"} className={"btn-style2 mt-8 rounded-xl"}>Add</button>
                        </form>
                    </div>
                </dialog>
            </div>
        </>
    );
}

export default ManageComic;
