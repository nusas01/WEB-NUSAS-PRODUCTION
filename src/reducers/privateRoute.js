import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const { loggedIn } = useSelector((state) => state.persisted.loginStatus)

  return loggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute;