import styles from "./TweetInput.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar, Button, IconButton } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import React, { useState } from "react";
import { auth, storage, db } from "../firebase";
import firebase from "firebase/app";

const TweetInput = () => {
  const user = useSelector(selectUser);
  const [msg, setMsg] = useState("");
  const sendTweet = (e: any) => {
    e.preventDefault();
    db.collection("posts").add({
      avatar: user.photoUrl,
      image: "",
      text: msg,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
      userId: user.uid,
    });
    setMsg("");
  };
  return (
    <>
      <form onSubmit={sendTweet}>
        <div className={styles.tweer_form}>
          <Avatar
            className={styles.tweet_avatar}
            src={user.photoUrl}
            onClick={async () => {
              await auth.signOut();
            }}
          />
          <input
            className={styles.tweet_input}
            placeholder="What's happening?"
            type="text"
            autoFocus
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          disabled={!msg}
          className={msg ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn}
        >
          Tweet
        </Button>
      </form>
    </>
  );
};

export default TweetInput;
