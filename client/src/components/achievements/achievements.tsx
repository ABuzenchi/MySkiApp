import { useEffect, useState } from "react";
import classes from "./achievements.module.css";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

interface Props {
  username: string | null;
}

const AchievementsSection = ({ username }: Props) => {
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allRes, userRes] = await Promise.all([
          fetch("http://localhost:3000/achievements"),
          fetch(`http://localhost:3000/achievements/${username}`),
        ]);
        const allData = await allRes.json();
        const userData = await userRes.json();

        setAllAchievements(allData);
        setUserAchievements(userData.map((a: any) => a.achievementTitle));
      } catch (err) {
        console.error("Error fetching achievements:", err);
      }
    };

    if (username) fetchData();
  }, [username]);

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Achievements</h3>
      <div className={classes.grid}>
        {allAchievements.length === 0 && (
          <p style={{ fontStyle: "italic" }}>No achievements available yet.</p>
        )}
        {allAchievements.map((ach) => {
          const unlocked = userAchievements.includes(ach.title);
          return (
            <div key={ach._id} className={classes.achievementBox}>
              <img
                src={ach.icon}
                alt={ach.title}
                className={`${classes.achievementIcon} ${
                  unlocked ? classes.unlocked : classes.locked
                }`}
                title={unlocked ? "Unlocked!" : ach.description}
              />
              <p className={classes.achievementTitle}>{ach.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
