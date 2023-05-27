import { Link } from 'react-router-dom'
import StyledForm from '../styles'

function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <StyledForm>
        <form onSubmit={() => console.log('asdf')}>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
          <button>Sign In</button>
          <br></br>
          Don't have an account?
          <Link
            to="/sign-up">
            Sign up
          </Link>
        </form>
      </StyledForm>
    </div>
  );
}

export default Signup;
