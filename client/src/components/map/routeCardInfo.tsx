import { FaRoute, FaClock } from "react-icons/fa";
import styles from "./routeCardInfo.module.css";

type RouteInfoCardProps = {
  distance: string;
  duration: string;
  className?: string;
};

export default function RouteInfoCard({
  distance,
  duration,
  className = "",
}: RouteInfoCardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.row}>
        <FaRoute className={styles.iconBlue} />
        <span className={styles.label}>DISTANȚĂ</span>
        <span className={styles.value}>{distance}</span>
      </div>
      <div className={styles.row}>
        <FaClock className={styles.iconGreen} />
        <span className={styles.label}>DURATĂ</span>
        <span className={styles.value}>{duration}</span>
      </div>
    </div>
  );
}
