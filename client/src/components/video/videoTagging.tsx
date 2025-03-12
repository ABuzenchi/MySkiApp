// import React, { useState, useRef } from "react";
// import ReactPlayer from "react-player";

// const VideoTagging = () => {
//   const [videoFile, setVideoFile] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState("");
//   const playerRef = useRef(null);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   const addComment = () => {
//     if (playerRef.current && commentText.trim()) {
//       const currentTime = playerRef.current.getCurrentTime();
//       setComments([...comments, { time: currentTime, text: commentText }]);
//       setCommentText("");
//     }
//   };

//   const seekToTime = (time) => {
//     if (playerRef.current) {
//       playerRef.current.seekTo(time, "seconds");
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoFile(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="p-4">
//       <input type="file" accept="video/*" onChange={handleFileChange} className="mb-4" />
//       {videoFile && (
//         <ReactPlayer
//           url={videoFile}
//           controls
//           ref={playerRef}
//           width="100%"
//         />
//       )}
//       <div className="mt-4">
//         <input
//           type="text"
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//           placeholder="Adaugă un comentariu"
//           className="border p-2 rounded w-full"
//         />
//         <button
//           onClick={addComment}
//           className="bg-blue-500 text-white p-2 rounded mt-2"
//         >
//           Adaugă Comentariu
//         </button>
//       </div>
//       <div className="mt-4">
//         <h3 className="font-bold">Comentarii:</h3>
//         <ul>
//           {comments.sort((a, b) => a.time - b.time).map((comment, index) => (
//             <li key={index} className="border-b p-2">
//               <strong>
//                 <button 
//                   className="text-blue-500 underline" 
//                   onClick={() => seekToTime(comment.time)}
//                 >
//                   {formatTime(comment.time)}
//                 </button>
//               </strong>: {comment.text}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default VideoTagging;