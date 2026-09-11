import { useForm } from "react-hook-form";
import { useEffect } from "react"
import { loginUser } from "../features/auth/authService.js"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom"

function Login() {
    const {
        register,
        handleSubmit,
    } = useForm();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const auth = useSelector((state) => state.auth)

    useEffect(()=>{
        console.log("auth state", auth)
    },[auth])

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);

            dispatch(login(response.data.user))

            console.log("user saved in redux");

            navigate("/")

        } catch (error) {
            console.log("login error", error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-96"
            >
                <h1 className="text-3xl font-bold">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="border p-2 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-black text-white p-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;