// components/ResortSidebar.tsx
import { FaMapMarkedAlt, FaSkiing, FaSnowflake, FaCamera, FaCreditCard } from 'react-icons/fa';
import { FaCableCar } from "react-icons/fa6";
import classes from './ResortSidebar.module.css';

const ResortSidebar = () => {
  return (
    <div className={classes.sidebar}>
      <button className={classes.button} title="Instalații">
        <FaCableCar size={20} />
      </button>
      <button className={classes.button} title="Pârtii">
        <FaSkiing size={20} />
      </button>
      <button className={classes.button} title="Vreme">
        <FaSnowflake size={20} />
      </button>
      <button className={classes.button} title="Webcam">
        <FaCamera size={20} />
      </button>
      <button className={classes.button} title="Plata online">
        <FaCreditCard size={20} />
      </button>
      <button className={classes.button} title="Hartă">
        <FaMapMarkedAlt size={20} />
      </button>
    </div>
  );
};

export default ResortSidebar;
