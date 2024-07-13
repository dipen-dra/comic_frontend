import AdminSidebar from "../adminComponents/adminSidebar.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate, useParams} from "react-router-dom";


const EditComic = () =>{

    const navigate = useNavigate();

    const useApiCall = useMutation({
        mutationKey:["POST_COMIC_DATA"],
        mutationFn:(payload)=>{
            console.log(payload)
            return axios.post("http://localhost:8082/item/save",payload)
        },onSuccess: () => {
            reset();
            navigate('/ManageComic')
        }
    })

    const onSubmit=(value)=>{
        console.log(value);
        const fd = new FormData();
        fd.append("itemName",value?.itemName)
        fd.append("releasedDate",value?.releasedDate)
        fd.append("itemDescription",value?.itemDescription)
        fd.append("downloadLink",value?.downloadLink)
        fd.append("genreId",value?.genreId)
        fd.append("itemImage",value?.itemImage[0])
        useApiCall.mutate(fd)
    }

    //To update Comic
    const{pk_id} = useParams();

    const{data:getByIdApi}=useQuery({
        queryKey:["GET_BY_ID_COMIC"],
        queryFn(){
            return axios.get("http://localhost:8082/item/getById/"+pk_id)
        },enabled:!!pk_id
    })

    // Sending data to backend
    const {register,
        handleSubmit,
        // formState,
        reset} = useForm({values:getByIdApi?.data});

    // const {errors} = formState;
    // Fetching genre from API
    const{data:genreData} = useQuery({
        queryKey:["GET_GENRE"],
        queryFn(){
            return axios.get("http://localhost:8082/genre/getAll")
        }
    })

    const location = useLocation(); // Use useLocation to get the current location
    const currentLocation = location.pathname;

    return(
        <>
            <div className={"manage-comic-div bg-gray-100"}>
                <AdminSidebar activePage={currentLocation}/>
                <div className={"pl-80 px-6 pt-2 pb-24 flex h-screen flex-col items-center justify-center"}>
                    <div id="my_modal_3" className="modal w-6/12 h-[29rem] bg-white mr-80 shadow-2xl transform rounded-2xl ">
                        <div className="modal-box">
                            <form method="dialog" className={"px-6 py-6"} onSubmit={handleSubmit(onSubmit)}>
                                <h3 className="font-bold text-2xl">Add Comic</h3>
                                <div className={"w-full h-12 border-solid mt-6 border rounded-xl border-gray-300 flex items-center pl-3 pr-2"}>
                                    <select className={"w-full outline-none cursor-pointer"} {...register("genreId",{ required: true })}>
                                        <option disabled selected>Select Genre</option>
                                        {genreData && genreData.data.map((i) => (
                                            <option key={i.id} value={i.id}>{i.genre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={"w-full h-12 border-solid border rounded-xl border-gray-300 mt-5 flex items-center pl-3 pr-2"}>
                                    <input type={"text"} placeholder={"Enter Comic Name"} className={"w-full outline-none appearance-none"} {...register("itemName",{required:"Item name is required"})}/>
                                </div>

                                <div className={"flex justify-between mt-5"}>
                                    <div className={"w-5/12 h-12 border-solid border rounded-xl border-gray-300 flex items-center pl-3 pr-2 mr-1"}>
                                        <input type={"text"} placeholder={"Enter Description"} className={"w-full outline-none appearance-none"} {...register("itemDescription",{required:"itemDescription name is required"})}/>
                                    </div>
                                    <div className={"w-7/12 h-12 border-solid border rounded-xl border-gray-300 flex items-center pl-3 pr-2"}>
                                        <input type={"text"} placeholder={"Enter Download Link"} className={"w-full outline-none appearance-none"} {...register("downloadLink",{required:"downloadLink name is required"})}/>
                                    </div>
                                </div>
                                <div className={"w-full flex mt-5"}>
                                    <div className={"w-5/12 justify-between items-center"}>
                                        <h1 className={"text-lg pl-1"}>Released date: </h1>
                                        <div className={"w-full h-12 border-solid border rounded-xl border-gray-300 flex items-center px-2"}>
                                            <input type={"date"} placeholder={"Enter Comic Name"} className={"outline-none appearance-none text-gray-400"} {...register("releasedDate")}/>
                                        </div>
                                    </div>
                                    <div className={"w-7/12 justify-between items-center pl-1"}>
                                        <h1 className={"text-lg pl-1"}>Select Image: </h1>
                                        <div className={"w-full h-12 justify-between border-solid border rounded-xl border-gray-300 flex items-center pl-1"}>
                                            <input type={"file"} className={"text-gray-400"} {...register("itemImage")}/>
                                        </div>
                                    </div>
                                </div>
                                <button type={"submit"} className={"btn-add w-24 h-12 absolute bottom-6 right-6"}>Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditComic;