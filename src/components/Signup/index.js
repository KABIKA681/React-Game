import React, { useState, useContext } from "react";
import competition from "../../images/competition.jpg";
import { FirebaseContext } from "../Firebase";
import { Link } from "react-router-dom";

const imgEchcec = {
  width: "690px",
  height: "700px",
  marginLeft: "0 0",
  marginBottom: "0",
  objectFit: "cover",
};

const Signup = (props) => {
  const firebase = useContext(FirebaseContext);

  const data = {
    name: "",
    othername: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = loginData;
    firebase
      .signupUser(email, password)
      .then((authUser) => {
        return firebase.user(authUser.user.uid).set({
          name,
          email,
        });
      })
      .then(() => {
        setLoginData({ ...data });
        props.history.push("/welcome");
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  const { name, othername, email, password, confirmPassword } = loginData;

  const btn =
    name === "" ||
    othername === "" ||
    email === "" ||
    password !== confirmPassword ? (
      <button disabled>Register</button>
    ) : (
      <button>Submit</button>
    );

  //ERROR CATCHING
  const errorMsg = error !== "" && <span>{error.message}</span>;
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup">
          <img src={competition} alt="signup" style={imgEchcec} />
        </div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <form onSubmit={handleSubmit}>
              <h2>Registration</h2>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={name}
                  type="text"
                  id="name"
                  autoComplete="off"
                  required
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={othername}
                  type="text"
                  id="othername"
                  autoComplete="off"
                  required
                />
                <label htmlFor="name">Other Name</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="text"
                  id="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email"> Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="create password">Create Password</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  required
                />
                <label htmlFor="Confirm password">Confirm Password</label>
              </div>
              {btn}
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

export default Signup;
