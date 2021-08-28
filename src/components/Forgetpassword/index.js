import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import motdpass from "../../images/motdpass.jpg";
import { FirebaseContext } from "../Firebase";

const imgEchcec = {
  width: "700px",
  height: "700px",
  marginLeft: "0 0",
  marginBottom: "0",
  objectFit: "cover",
};

const ForgetPassword = (props) => {
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState(null);

  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .passwordReset(email)
      .then(() => {
        setError(null);
        setSuccess(`Check your email ${email} to change your password`);
        setEmail("");

        setTimeout(() => {
          props.history.push("/");
        }, 5000);
      })
      .catch((error) => {
        setError(error);
        setEmail("");
      });
  };

  const disabled = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget">
          <img src={motdpass} alt="signup" style={imgEchcec} />
        </div>
        <div className="formBoxRight">
          <div className="formContent">
            {success && (
              <span
                style={{
                  border: "1px solid green",
                  background: "green",
                  color: "#ffffff",
                }}
              >
                {success}
              </span>
            )}

            {error && <span>{error.message}</span>}

            <h2>Forgot password?</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email"> Email</label>
              </div>
              <button disabled={disabled}>Recover</button>
            </form>

            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Alreary registered? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
