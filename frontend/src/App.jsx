import { useEffect } from 'react'
import { getCurrentUser } from "./features/auth/authService.js"
import { login } from "./features/auth/authSlice.js"
import { useDispatch } from 'react-redux'
import './App.css'
import AppRoutes from './routes/AppRoutes'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser()

        dispatch(login(response.data))

        console.log("user restored")
      } catch (error) {
        console.log("Error fetching current user:", error)
      }
    }
    fetchCurrentUser()
  },[])
  
  return (
    <AppRoutes/>
  )
}

export default App
