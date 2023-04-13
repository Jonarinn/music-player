import React from "react";
import "../auth.scss";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../firebase.config";

const Login = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current) return;
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="auth login">
      <h1>Login</h1>
      <article>
        <section>
          <form>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </section>
        <section className="or">
          <div></div>
          <p>Or</p>
          <div></div>
        </section>
        <section>
          <button className="google-btn" onClick={handleGoogle}>
            <FcGoogle />
            Continue with Google
          </button>
        </section>
      </article>
    </div>
  );
};

export default Login;
