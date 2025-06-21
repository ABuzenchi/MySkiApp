
import { SkiInstallation } from "../../interfaces/installation.interface";
import classes from "./installation.module.css";

interface Props {
  installations: SkiInstallation[];
}

export default function Installation({ installations }: Props) {
  return (
    <div className={classes.filterContainer}>
      <table className={classes.slopeTable}>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Tip</th>
            <th>Program</th>
          </tr>
        </thead>
        <tbody>
          {installations.map((inst) => (
            <tr key={inst._id}>
              <td>{inst.name}</td>
              <td>{inst.type}</td>
              <td>{inst.schedule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
