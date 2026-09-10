import { useForm } from "react-hook-form";
import { loginUser } from "../features/auth/authService.js"

function Login() {
    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        try {
            const response = loginUser(data);

            console.log("login response",response);

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