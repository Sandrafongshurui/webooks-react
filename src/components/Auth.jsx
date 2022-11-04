import { Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { DateTime } from 'luxon'
import Cookies from 'universal-cookie'


//acts like a middle ware...its wrapped in side this...so must go through this first
export const Auth = (props) => {
const cookies = new Cookies()
  console.log('auth component triggered')
  // write our auth checking logic here in a single place

  // retreive token from localstorage
  // if not exist, redirect to login page
  const token = cookies.get('user_token')
  //   const token = localStorage.getItem("user_token");
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  // check if token expired, in unit 2 is like the max time thing in session
  // if expired, purge localstorage, redirect to login
  const user = jwt_decode(token)
  console.log(user)
  const now = DateTime.now().toUnixInteger()

  //this exp is issued with the token.....so we cant change it
  if (user.exp < now) {
    // destroy the cookie
    cookies.remove('user_token', { path: "/login" })
  }

  // render props.component
  return <props.component />
}


