import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import TweetInput from "./TweetInput";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      image: "",
      text: "",
      timestamp: null,
      username: "",
    },
  ]);
  useEffect(() => {
    const unSub = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);
  return (
    <div>
      <TweetInput />
      {posts[0]?.id && (
        <>
          {posts.map((post) => (
            // <p>{post.text}</p>
            <Post
              key={post.id}
              postId={post.id}
              avatar={post.avatar}
              image={post.image}
              text={post.text}
              timestamp={post.timestamp}
              username={post.username}
            />
          ))}
        </>
      )}
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
};

export default Feed;
