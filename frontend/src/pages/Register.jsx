import { useForm } from "react-hook-form";
import { registerUser } from "../features/auth/authService.js";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authService.js";
import { login } from "../features/auth/authSlice.js";
import { useDispatch } from "react-redux";

function Register() {
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        try {

            console.log("form data", data)
            const formData = new FormData()

            formData.append("fullname", data.fullname)
            formData.append("username", data.username)
            formData.append("email", data.email)
            formData.append("password", data.password)
            formData.append("avatar", data.avatar[0])
            if(data.coverImage?.[0]){
                formData.append("coverImage", data.coverImage[0])
            }

            const response = await registerUser(formData)

            console.log("user registered successfully", response)

            const loginResponse = await loginUser({
                email: data.email,
                password: data.password
            });
            
            dispatch(login(loginResponse.data.user))
        
            navigate("/")
        
        } catch (error) {
            console.error("Error registering user:", error.response?.data?.message || error)
            alert(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-96"
            >
                <h1 className="text-3xl font-bold">
                    Register
                </h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullname")}
                    className="border p-2"
                />

                <input
                    type="text"
                    placeholder="Username"
                    {...register("username")}
                    className="border p-2"
                />

                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="border p-2"
                />

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="border p-2"
                />

                <label htmlFor="avatar">
                    Avatar
                </label>

                <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    {...register("avatar")}
                />

                <label htmlFor="coverImage">
                    Cover Image
                </label>

                <input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    {...register("coverImage")}
                />

                <button
                    type="submit"
                    className="bg-black text-white p-2"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register;