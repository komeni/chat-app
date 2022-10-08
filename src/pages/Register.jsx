import React from "react";
import addAvatar from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };
  return (
    <div className="form__container">
      <div className="form__wrapper">
        <span className="logo">Komeni Chats</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your name here" />
          <input type="email" placeholder="Your email here" />
          <input type="password" placeholder="Choose a strong password" />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            placeholder="You want to pick your best picture"
          />
          <label htmlFor="file">
            <img src={addAvatar} alt="" />
            <span>Choose your best selfie</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went haywire!</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
