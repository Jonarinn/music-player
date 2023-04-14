import React from "react";
import "../auth.scss";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../firebase.config";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContextType } from "../../../../types";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setAlert }: OutletContextType = useOutletContext();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setAlert({
          type: "Success",
          message: "You have successfully registered",
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
    <div className="auth register">
      <h1>Register</h1>
      <article>
        <section>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Register</button>
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

export default Register;
