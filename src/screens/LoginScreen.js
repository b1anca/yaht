import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import Error from '../components/Error'
import Spinner from '../components/Spinner'

function LoginScreen() {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/user-profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <form className="text-center rounded py-8 px-5 border max-w-xs" onSubmit={handleSubmit(submitForm)}>
        {error && <Error>{error}</Error>}
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-input border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4'
            {...register('email')}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-input'
            {...register('password')}
            required
          />
        </div>
        <button type="submit" className="button bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-full" disabled={loading}>
          {loading ? <Spinner /> : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginScreen;
