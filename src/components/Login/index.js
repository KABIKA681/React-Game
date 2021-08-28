import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import smileg from "../../images/smileg.jpg";
import { FirebaseContext } from "../Firebase";

const imgEchcec = {
  width: "700px",
  height: "700px",
  marginLeft: "0 0",
  marginBottom: "0",
  objectFit: "cover",
};

const Login = (props) => {
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if ("btn") {
      setBtn(false);
    }
  }, [password, email, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .loginUser(email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        props.history.push("/welcome");
      })
      .catch((error) => {
        setError(error);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin">
          <img src={smileg} alt="signup" style={imgEchcec} />
        </div>
        <div className="formBoxRight">
          <div className="formContent">
            {error !== "" && <span>{error.message}</span>}
            <h2>Login</h2>
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
              <div className="inputBox">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="create password">Password</label>

                <Link className="simpleLink" to="/forgetpassword">
                  Forget Password? Recover here!
                </Link>
              </div>
              <br />
              <br />

              {btn ? <button>Login</button> : <button disabled>Login</button>}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Not registered? Register now to play
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
