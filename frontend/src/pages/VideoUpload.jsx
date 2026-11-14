// import { useForm } from "react-hook-form"
// import { uploadVideo } from "../features/video/videoService"

// function VideoUpload(){
//     const {register, handleSubmit} = useForm()
    
//     const onSubmit = async (data) => {
//         try {
//             const formData = new FormData()

//             formData.append("videoFile", data.videoFile[0])
//             formData.append("thumbnail", data.thumbnail[0])
//             formData.append("title", data.title)
//             formData.append("description", data.description)
//             if(data.isPublic){
//                 formData.append("isPublic", data.isPublic)
//             }
            
//             const response = await uploadVideo(formData)

//             console.log("Video uploaded successfully:", response.data);

        
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return(
//         <div>
//             <form onSubmit = {handleSubmit(onSubmit)}>
//                 <h1>Upload Video</h1>

//                 <label htmlFor="videoFile">Video File</label>

//                 <input 
//                 type="file"
//                 id="videoFile"
//                 accept="video/*"
//                 {...register("videoFile", {required: true})}
//                 />

//                 <label htmlFor="thumbnail">Video Thumbnail</label>

//                 <input 
//                 type="file" 
//                 id="thumbnail"
//                 accept="image/*"
//                 {...register("thumbnail", {required: true})}
//                 />

//                 <input 
//                 type="text" 
//                 placeholder="Title"
//                 {...register("title", {required: true})}
//                 />

//                 <textarea
//                 placeholder="description"
//                 {...register("description", {required: true})}
//                 />

//                 <label htmlFor="isPublic">visibility</label>

//                 <select 
//                 name="isPublic" 
//                 id="isPublic" 
//                 {...register("isPublic")}>
//                     <option value="true">Public</option>
//                     <option value="false">Private</option>
//                 </select>

//                 <button
//                     type="submit"
//                 >
//                     Upload Video
//                 </button>
//             </form>
//         </div>
//     )
// }

// export default VideoUpload



import { useForm } from "react-hook-form";
import { uploadVideo } from "../features/video/videoService";

function VideoUpload() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = useForm({
        defaultValues: {
            isPublic: "true"
        }
    });

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append("videoFile", data.videoFile[0]);
            formData.append("thumbnail", data.thumbnail[0]);
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("isPublic", data.isPublic);

            const response = await uploadVideo(formData);

            console.log(
                "Video uploaded successfully:",
                response.data
            );

            alert("Video uploaded successfully!");

            reset();

        } catch (error) {
            console.log(
                error.response?.data?.message || error
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-96"
            >

                <h1 className="text-2xl font-bold">
                    Upload Video
                </h1>

                <label htmlFor="videoFile">
                    Video File
                </label>

                <input
                    type="file"
                    id="videoFile"
                    accept="video/*"
                    {...register("videoFile", {
                        required: "Video is required"
                    })}
                />

                <label htmlFor="thumbnail">
                    Video Thumbnail
                </label>

                <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    {...register("thumbnail", {
                        required: "Thumbnail is required"
                    })}
                />

                <input
                    type="text"
                    placeholder="Title"
                    {...register("title", {
                        required: "Title is required"
                    })}
                    className="border p-2"
                />

                <textarea
                    placeholder="Description"
                    {...register("description", {
                        required: "Description is required"
                    })}
                    className="border p-2"
                />

                <label htmlFor="isPublic">
                    Visibility
                </label>

                <select
                    id="isPublic"
                    {...register("isPublic")}
                    className="border p-2"
                >
                    <option value="true">Public</option>
                    <option value="false">Private</option>
                </select>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white p-2 rounded disabled:opacity-50"
                >
                    {isSubmitting ? "Uploading..." : "Upload Video"}
                </button>

            </form>
        </div>
    );
}

export default VideoUpload;
