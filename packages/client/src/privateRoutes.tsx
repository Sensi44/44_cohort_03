import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const PrivateRoutes = () => {
  const location = useLocation()
  const isAuth = true //TODO: тут должна быть проверка авторизации

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/sing-up" replace state={{ from: location }} />
  )
}
