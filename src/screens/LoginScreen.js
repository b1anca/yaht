import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import Error from '../components/Error'
import Input from '../components/Input'
import Button from '../components/Button'

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
        <Input type="email" required {...register('email')} label="Email" />
        <Input type="password" required {...register('password')} label="Password" />
        <Button type="submit" loading={loading}>Login</Button>
      </form>
    </div>
  );
}

export default LoginScreen;
