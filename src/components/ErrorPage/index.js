import React from "react";
import checkmate from "../../images/checkmate.png";

const centerH2 = {
  textAlign: "center",
  marginTop: "50px",
};
const centerH3 = {
  textAlign: "center",
  marginTop: "20px",
  color: "red",
};
const imgStyle = {
  display: "block",
  width: "35%",
  height: "100%",
  margin: "40px auto",
};

const ErrorPage = () => {
  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 style={centerH2}>
          Error, Page does not exist; Write your link very well.
        </h2>
        <h3 style={centerH3}>Go Back!!!</h3>
        <img src={checkmate} alt="error page" style={imgStyle} />
      </div>
    </div>
  );
};

export default ErrorPage;
