import { useState, useMemo } from "react";
import { Slope } from "../../interfaces/slope.interface";
import classes from "./slope-filter.module.css";

interface SlopeFilterProps {
  slopes: Slope[];
}

export default function SlopeFilter({ slopes }: SlopeFilterProps) {
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSlopes = useMemo(() => {
    return slopes.filter((slope) => {
      const matchesDifficulty =
        difficultyFilter === "all" || slope.difficulty === difficultyFilter;
      const matchesStatus =
        statusFilter === "all" || slope.status.toLowerCase() === statusFilter;
      const matchesSearch = slope.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesDifficulty && matchesStatus && matchesSearch;
    });
  }, [slopes, difficultyFilter, statusFilter, searchTerm]);

  return (
    <div className={classes.filterContainer}>
      <div className={classes.controls}>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="all">Toate dificultățile</option>
          <option value="easy">Ușoară</option>
          <option value="medium">Medie</option>
          <option value="difficult">Dificilă</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Toate stările</option>
          <option value="deschisă">Deschisă</option>
          <option value="închisă">Închisă</option>
        </select>

        <input
          type="text"
          placeholder="Caută după nume..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className={classes.slopeTable}>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Lungime (m)</th>
            <th>Dificultate</th>
            <th>Lățime (m)</th>
            <th>Altitudine Bază (m)</th>
            <th>Altitudine Vârf (m)</th>
            <th>Stare</th>
          </tr>
        </thead>
        <tbody>
          {filteredSlopes.map((slope) => (
            <tr key={slope._id}>
              <td>{slope.name}</td>
              <td>{slope.length}</td>
              <td>{slope.difficulty}</td>
              <td>{slope.width}</td>
              <td>{slope.baseElevation}</td>
              <td>{slope.topElevation}</td>
              <td>{slope.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
