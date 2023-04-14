import React from "react";
import "../auth.scss";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../firebase.config";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContextType } from "../../../../types";

const Login = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { setAlert }: OutletContextType = useOutletContext();

  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current) return;
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {
        setAlert({
          type: "Success",
          message: "You have successfully logged in",
        });
        navigate("/");
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      })
      .catch((err: Error) => {
        setAlert({
          type: "Error",
          message: err.message,
        });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      });
  };

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        setAlert({
          type: "Success",
          message: "You have successfully logged in",
        });
        navigate("/");
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      })
      .catch((err: Error) => {
        setAlert({
          type: "Error",
          message: err.message,
        });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      });
  };

  return (
    <div className="auth login">
      <h1>Login</h1>
      <article>
        <section>
          <form onSubmit={handleLogIn}>
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
        <section className="auth-providers">
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
