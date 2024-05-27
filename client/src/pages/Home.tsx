import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { components } from '../../data/components.tsx';

const Home = () => {
  const currentVisibleComponent = useSelector(
    (state: RootState) => state.component.currentVisibleComponent,
  );

  return (
    <div className="home">
      {components.map((item, index) => {
        return (
          <div key={index} className={currentVisibleComponent === index ? '' : 'notActive'}>
            {item.component}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
