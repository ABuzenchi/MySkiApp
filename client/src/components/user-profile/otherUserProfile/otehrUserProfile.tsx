// OtherUserProfileContent.tsx
import { useEffect, useState } from "react";
import { Avatar, Divider } from "@mantine/core";

interface Props {
  username: string | null;
}

const OtherUserProfileContent = ({ username }: Props) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return;
      try {
        const res = await fetch(`http://localhost:3000/auth/${username}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, [username]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <Avatar src={userData.profilePicture} size="xl" mb="md" />
      <h2>{userData.username}</h2>
      <Divider my="sm" />
      <p><strong>Favorite Slopes:</strong> {userData.favoriteSlopes?.length ?? 0}</p>
      <p><strong>Visited Slopes:</strong> {userData.visitedSlopes?.length ?? 0}</p>
      <p><strong>League:</strong> Sapphire</p>
      <p><strong>Medals:</strong> 5</p>
      {/* Adaugă mai multe detalii dacă dorești */}
    </div>
  );
};

export default OtherUserProfileContent;
