import { useEffect } from 'react'
import { getCurrentUser } from "./features/auth/authService.js"
import { login, setLoading } from "./features/auth/authSlice.js"
import { useDispatch } from 'react-redux'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from "react-hot-toast";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser()

        dispatch(login(response.data))

        console.log("user restored", response.data)
      } catch (error) {
        console.log("Error fetching current user:", error)
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchCurrentUser()
  },[])
  
  return (
  <>
    <Toaster position="top-right" />
    <AppRoutes/>
  </>
  )
}

export default App
