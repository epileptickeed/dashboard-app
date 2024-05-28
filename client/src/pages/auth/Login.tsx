import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserEmail, setUserPassword } from '../../redux/userDataSlice/slice';
import { toast } from 'react-hot-toast';
import { userDataSelector } from '../../redux/userDataSlice/selector';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userEmail, userPassword } = useSelector(userDataSelector);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email = userEmail;
    const password = userPassword;
    try {
      const { data } = await axios.post('/login', {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('You are logged in, Welcome!');
        dispatch(setUserEmail(''));
        dispatch(setUserPassword(''));
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form action="POST">
        <input
          type="email"
          value={userEmail}
          onChange={(e) => dispatch(setUserEmail(e.target.value))}
          placeholder="arthur.morgan@outlaw.com"
        />
        <input
          type="password"
          value={userPassword}
          onChange={(e) => dispatch(setUserPassword(e.target.value))}
          placeholder="password"
        />
      </form>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
      <span>
        Dont have an account? <Link to="/signup">Sign in</Link>
      </span>
    </div>
  );
};

export default Login;
