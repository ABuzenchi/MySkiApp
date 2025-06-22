import { useEffect, useState } from "react";
import { Avatar, Button, Divider, Group } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface Props {
  username: string | null;
  openUserProfile: (username: string) => void;
}

const OtherUserProfileContent = ({ username, openUserProfile }: Props) => {
  const { id: currentUserId } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<any>(null);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const isFriend = userData?.friends?.some((f: any) => f._id === currentUserId);

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
        body: JSON.stringify({
          senderId: currentUserId,
          receiverId: userData._id,
        }),
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
      <p>
        <strong>Favorite Slopes:</strong> {userData.favoriteSlopes?.length ?? 0}
      </p>
      <p>
        <strong>Visited Slopes:</strong> {userData.visitedSlopes?.length ?? 0}
      </p>

      {currentUserId && userData._id !== currentUserId && !isFriend && (
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
          <p>
            <strong>Friends:</strong>
          </p>
          {userData.friends.map((friend: any) => (
            <div
              key={friend.username}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", cursor: "pointer" }}
              onClick={() => openUserProfile(friend.username)}
            >
              <Avatar
                src={friend.profilePicture || undefined}
                alt={friend.username}
                size="md"
                color="cyan"
              />
              <span>{friend.username}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OtherUserProfileContent;
