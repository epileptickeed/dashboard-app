import { useDispatch, useSelector } from 'react-redux';
import { setUserEmail, setUserPassword, userExpensesType } from '../../redux/userDataSlice/slice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { userDataSelector } from '../../redux/userDataSlice/selector';
import { FormEvent } from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userEmail, userPassword } = useSelector(userDataSelector);

  const registerUser = async (event: FormEvent) => {
    event.preventDefault();
    const email = userEmail;
    const password = userPassword;
    const expenses: userExpensesType[] = [];
    console.log(email, password);
    try {
      const { data } = await axios.post('/register', {
        email,
        password,
        expenses,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        dispatch(setUserEmail(''));
        dispatch(setUserPassword(''));
        toast.success('Signed up successful!');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="signup">
      <h1>Sign up</h1>
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
      <button type="submit" onClick={(e) => registerUser(e)}>
        Submit
      </button>
      <span>
        I already have an account <Link to="/">Login</Link>
      </span>
    </div>
  );
};

export default Signup;
