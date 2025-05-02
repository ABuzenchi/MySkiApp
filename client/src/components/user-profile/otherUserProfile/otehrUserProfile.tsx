import { useEffect, useState } from "react";
import { Avatar, Button, Divider, Group } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface Props {
  username: string | null;
}

const OtherUserProfileContent = ({ username }: Props) => {
  const { id: currentUserId } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<any>(null);
  const [friendRequestSent, setFriendRequestSent] = useState(false);

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

  const sendFriendRequest = async () => {
    if (!userData || !currentUserId) return;
    try {
      const res = await fetch("http://localhost:3000/friend-requests/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId: currentUserId, receiverId: userData._id }),
      });

      if (res.ok) setFriendRequestSent(true);
    } catch (err) {
      console.error("Error sending friend request", err);
    }
  };

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

      {currentUserId && userData._id !== currentUserId && (
        <Group mt="md">
          <Button
            size="xs"
            disabled={friendRequestSent}
            onClick={sendFriendRequest}
          >
            {friendRequestSent ? "Request Sent" : "Add Friend"}
          </Button>
        </Group>
      )}

      {userData.friends && userData.friends.length > 0 && (
        <>
          <Divider my="sm" />
          <p><strong>Friends:</strong></p>
          {userData.friends.map((friend: any) => (
            <div key={friend._id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Avatar src={friend.profilePicture} size="sm" />
              <span>{friend.username}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OtherUserProfileContent;
