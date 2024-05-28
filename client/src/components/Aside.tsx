import { useDispatch, useSelector } from 'react-redux';
import { setComponentVisible } from '../redux/componentSlice/slice';
import { Link } from 'react-router-dom';
import { components } from '../../data/components.tsx';
import { userDataSelector } from '../redux/userDataSlice/selector.ts';
import { useEffect } from 'react';
import axios from 'axios';
import { setCurrentUser } from '../redux/userDataSlice/slice.ts';

const Aside = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(userDataSelector);
  useEffect(() => {
    if (!currentUser) {
      axios.get('/profile').then(({ data }) => {
        dispatch(setCurrentUser(data));
      });
    }
    console.log(currentUser);
  }, [currentUser]);
  return (
    <aside>
      <img src="" alt="logo" />
      <nav className="nav_buttons">
        {components.map((item, index) => {
          return (
            <Link to={item.path!} key={index} onClick={() => dispatch(setComponentVisible(index))}>
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Aside;
