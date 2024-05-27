import { useDispatch } from 'react-redux';
import { setComponentVisible } from '../redux/componentSlice/slice';
import { Link } from 'react-router-dom';
import { components } from '../../data/components.tsx';

const Aside = () => {
  const dispatch = useDispatch();
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
