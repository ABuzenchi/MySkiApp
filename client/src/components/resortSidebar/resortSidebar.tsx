// components/ResortSidebar.tsx
import { FaMapMarkedAlt, FaSkiing, FaSnowflake, FaCamera, FaCreditCard } from 'react-icons/fa';
import { FaCableCar } from "react-icons/fa6";
import classes from './ResortSidebar.module.css';
// components/ResortSidebar.tsx
interface Props {
  onSelectSection: (section: string) => void;
}

const ResortSidebar = ({ onSelectSection }: Props) => {
  return (
    <div className={classes.sidebar}>
      <button className={classes.button} title="Instalații" onClick={() => onSelectSection("installation")}>
        <FaCableCar size={20} />
      </button>
      <button className={classes.button} title="Pârtii" onClick={() => onSelectSection("slopes")}>
        <FaSkiing size={20} />
      </button>
      <button className={classes.button} title="Vreme" onClick={() => onSelectSection("weather")}>
        <FaSnowflake size={20} />
      </button>
      <button className={classes.button} title="Webcam" onClick={() => onSelectSection("webcam")}>
        <FaCamera size={20} />
      </button>
      <button className={classes.button} title="Plata online" onClick={() => onSelectSection("payment")}>
        <FaCreditCard size={20} />
      </button>
      <button className={classes.button} title="Hartă" onClick={() => onSelectSection("map")}>
        <FaMapMarkedAlt size={20} />
      </button>
    </div>
  );
};

export default ResortSidebar;
