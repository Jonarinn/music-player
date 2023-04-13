import React from "react";
import "../auth.scss";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className="auth register">
      <h1>Register</h1>
      <article>
        <section>
          <form>
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
        <section>
          <button className="google-btn">
            <FcGoogle />
            Continue with Google
          </button>
        </section>
      </article>
    </div>
  );
};

export default Register;
