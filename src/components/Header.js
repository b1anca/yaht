import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useGetDetailsQuery } from '../app/services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { data, isFetching } = useGetDetailsQuery('userDetails', {
    pollingInterval: 900000,
  })

  useEffect(() => {
    if (data) dispatch(setCredentials(data))
  }, [data, dispatch])

  return (
    <header>
      <div className='header-status'>
        <span>
          {isFetching
            ? `Fetching your profile...`
            : userInfo !== null
              ? `Logged in as ${userInfo.email}`
              : "You're not logged in"}
        </span>
        <div className='cta'>
          {userInfo ? (
            <button className='button' onClick={() => dispatch(logout())}>
              Logout
            </button>
          ) : (
            <NavLink className='button' to='/login'>
              Login
            </NavLink>
          )}
        </div>
      </div>
      <nav className='container navigation'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/user-profile'>Profile</NavLink>
      </nav>
    </header>
  )
}

export default Header
