import { useEffect, useState } from "react";
import { Avatar, Button, Image, Group } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { EnDictionary } from "../../../dictionaries/en";
import FirstFavorite from "../../../assets/first-favorite.png";
import FirstSlope from "../../../assets/first-slope.png";
import FirstReview from "../../../assets/reviews.png";
import DayTrackForm from "../../day-track/day-track";
import classes from "../user-profile.module.css";
import SignUp from "../../signUp/signUp";
import SignIn from "../../signIn/signIn";
import { fetchPrediction, fetchSuggestions } from "../../../api/suggestionsApi.ts";

interface Props {
  openUserProfile: (username: string) => void;
  onLogout: () => void;
}

interface ExtraStats {
  totalRuns: number;
  topSlopeName: string | null;
  activeDays: number;
  averageKm: number;
}

const UserProfileContent = ({ openUserProfile, onLogout }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    username,
    isAuthenticated,
    favoriteSlopes,
    visitedSlopes,
    profilePicture,
    id: userId,
  } = useSelector((state: RootState) => state.auth);

  const [otherUsers, setOtherUsers] = useState<{ username: string; profilePicture?: string }[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [prediction, setPrediction] = useState<any | null>(null);
  const [suggestedSlopes, setSuggestedSlopes] = useState<any[]>([]);
  const [extraStats, setExtraStats] = useState<ExtraStats | null>(null);

  const computeExtraStats = (dayTracks: any[], slopes: any[]) => {
    let totalRuns = 0;
    const slopeCounter: Record<string, number> = {};

    for (const day of dayTracks) {
      for (const entry of day.slopes) {
        if (!entry.slopeId) continue;
        const slopeId = typeof entry.slopeId === "object" ? entry.slopeId._id : entry.slopeId;
        slopeCounter[slopeId] = (slopeCounter[slopeId] || 0) + entry.times;
        totalRuns += entry.times;
      }
    }

    const topSlopeId = Object.entries(slopeCounter).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    const topSlopeName = slopes.find((s) => s._id === topSlopeId)?.name || null;
    const totalKm = dayTracks.reduce((sum, d) => sum + (d.totalDistance || 0), 0);
    const activeDays = dayTracks.length;
    const averageKm = activeDays > 0 ? totalKm / activeDays : 0;

    return {
      totalRuns,
      topSlopeName,
      activeDays,
      averageKm: Math.round(averageKm),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!username || !userId) return;

      try {
        const [usersRes, pendingRes] = await Promise.all([
          fetch(`http://localhost:3000/auth/all?exclude=${encodeURIComponent(username)}`),
          fetch(`http://localhost:3000/friend-requests/pending/${userId}`),
        ]);

        setOtherUsers(await usersRes.json());
        setPendingRequests(await pendingRes.json());
      } catch (err) {
        console.error("Failed to fetch users or pending requests", err);
      }
    };

    fetchData();
  }, [username, userId]);

  useEffect(() => {
    const fetchInsights = async () => {
      if (!username) return;
      try {
        const [dayTrackRes, slopesRes] = await Promise.all([
          fetch(`http://localhost:3000/day-track/${username}`),
          fetch(`http://localhost:3000/slopes`),
        ]);

        const dayTracksRaw = await dayTrackRes.json();
        const slopes = await slopesRes.json();

        const formattedTracks = dayTracksRaw.map((track: any) => ({
          date: track.date,
          slopes: track.slopes
            .filter((s: any) => s.slopeId)
            .map((s: any) => ({
              slopeId: typeof s.slopeId === "object" ? s.slopeId._id : s.slopeId,
              times: s.times,
            })),
        }));

        const trackData = {
          dayTracks: formattedTracks,
          slopesInfo: slopes.map((s: any) => ({
            id: s._id,
            name: s.name,
            location: s.location,
            length: s.length,
            difficulty: s.difficulty,
          })),
        };

        const [predictionResult, suggestionsResult] = await Promise.all([
          fetchPrediction(trackData),
          fetchSuggestions(trackData),
        ]);

        setPrediction(predictionResult);
        setSuggestedSlopes(suggestionsResult.suggestedSlopes || []);
        setExtraStats(computeExtraStats(dayTracksRaw, slopes));
      } catch (err) {
        console.error("Error fetching prediction/suggestions", err);
      }
    };

    fetchInsights();
  }, [username]);

  const acceptRequest = async (requestId: string) => {
    await fetch(`http://localhost:3000/friend-requests/accept/${requestId}`, {
      method: "POST",
    });
    setPendingRequests((prev) => prev.filter((r) => r._id !== requestId));
  };

  const declineRequest = async (requestId: string) => {
    await fetch(`http://localhost:3000/friend-requests/decline/${requestId}`, {
      method: "POST",
    });
    setPendingRequests((prev) => prev.filter((r) => r._id !== requestId));
  };

  const statsData = [
    { id: 1, icon: "🏔️", value: favoriteSlopes.length, label: "Favorite Slopes" },
    { id: 2, icon: "🎿", value: visitedSlopes.length, label: "Visited Slopes" },
    { id: 3, icon: "🔷", value: "Sapphire", label: "Current League" },
    { id: 4, icon: "🏅", value: "5", label: "League Medals" },
    ...(extraStats
      ? [
          { id: 5, icon: "📅", value: extraStats.activeDays, label: "Active Days" },
          { id: 6, icon: "🔁", value: extraStats.totalRuns, label: "Total Runs" },
          { id: 7, icon: "📏", value: `${extraStats.averageKm} km`, label: "Avg per Day" },
          {
            id: 8,
            icon: "🏔️",
            value: extraStats.topSlopeName || "–",
            label: "Top Slope",
          },
        ]
      : []),
  ];

  return (
    <div className={classes.butttonsContainer}>
      {isAuthenticated ? (
        <div className={classes.userContainer}>
          <UserAvatar username={username} />

          <div className={classes.container}>
            <DayTrackForm />
            <h3 className={classes.title}>Statistics</h3>
            <div className={classes.grid}>
              {statsData.map((stat) => (
                <div key={stat.id} className={classes.statBox}>
                  <span className={classes.icon}>{stat.icon}</span>
                  <div className={classes.info}>
                    <span className={classes.value}>{stat.value}</span>
                    <span className={classes.label}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={classes.container}>
            <h3 className={classes.title}>AI Insights</h3>
            {prediction && (
              <div className={classes.predictionBox}>
                <p><strong>Tracked:</strong> {Math.round(prediction.totalLogged / 1000)} km</p>
                <p><strong>Estimated Season:</strong> {Math.round(prediction.seasonPrediction / 1000)} km</p>
              </div>
            )}
            {suggestedSlopes.length > 0 && (
              <div className={classes.userList}>
                <h4>Recommended Slopes:</h4>
                {suggestedSlopes.map((slope) => (
                  <div key={slope.id} className={classes.userCard}>
                    <p>{slope.name} – {slope.location} ({slope.difficulty})</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={classes.container}>
            <h3 className={classes.title}>Achievements</h3>
            <div className={classes.imageContainer}>
              <Image src={FirstFavorite} className={classes.image} />
              <Image src={FirstSlope} className={classes.image} />
              <Image src={FirstReview} className={classes.image} />
            </div>
          </div>

          <div className={classes.container}>
            <h3 className={classes.title}>Pending Friend Requests</h3>
            <div className={classes.userList}>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <div key={request._id} className={classes.userCard}>
                    <Avatar src={request.sender.profilePicture || undefined} />
                    <span>{request.sender.username}</span>
                    <Group>
                      <Button size="xs" color="green" onClick={() => acceptRequest(request._id)}>
                        Accept
                      </Button>
                      <Button size="xs" color="red" onClick={() => declineRequest(request._id)}>
                        Decline
                      </Button>
                    </Group>
                  </div>
                ))
              ) : (
                <p>No pending requests</p>
              )}
            </div>
          </div>

          <div className={classes.container}>
            <h3 className={classes.title}>Other Users</h3>
            <div className={classes.userList}>
              {otherUsers.length > 0 ? (
                otherUsers.map((user) => (
                  <div
                    key={user.username}
                    className={classes.userCard}
                    onClick={() => openUserProfile(user.username)}
                    style={{ cursor: "pointer" }}
                  >
                    <Avatar
                      src={user.profilePicture || undefined}
                      alt={user.username}
                      size="md"
                      color="cyan"
                    />
                    <span>{user.username}</span>
                  </div>
                ))
              ) : (
                <p>No other users found</p>
              )}
            </div>
          </div>

          <Button variant="default" onClick={onLogout}>
            {EnDictionary.Logout}
          </Button>
        </div>
      ) : (
        <div className={classes.authContainer}>
          <SignUp />
          <SignIn />
        </div>
      )}
    </div>
  );
};

export default UserProfileContent;
