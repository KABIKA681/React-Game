import React, { useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent
  } = props;

  const [asked, setAsked] = useState([]);


  useEffect(() => {
    setAsked(ref.current)
  }, [ref])

  const averageGrade = maxQuestions / 2;
  const decision = score >= averageGrade ? (
     <>
      <div className="stepsBtnContainer">
      
      {
        quizLevel < levelNames.length ?
          (
            <>
          <p className="successMsg"> Congratulation, Go to Next Level!</p>
              <button className="btnResult success">Next Level</button>
              </>
          )
          :
          (
            <>
              <p className="successMsg"> Congratulation, You have made it!</p>
              <button className="btnResult gameOver">Next Level</button>
              </>
            )
      }
      </div>
      <div className="percentage">
        <div className="progressPercent">Success Rate: {percent }%</div>
        <div className="progressPercent">Marks: {score}/{ maxQuestions}</div>
      </div>

    </>
  )
    :
    (
    <>
      <div className="stepsBtnContainer">
          <p className="successMsg">You have failed!</p>
      </div>
    
    
      <div className="percentage">
      <div className="progressPercent">Success Rate: {percent }%</div>
        <div className="progressPercent">Marks: {score}/{ maxQuestions}</div>
    </div>
      
    </>
    )

  const questionAnswer = asked.map(question => {
    return (
      <tr key={question.id}>
        <td>{question.question }</td>
        <td>{question.answer }</td>
        <td>
          <button className="btnInfo">Infos</button>
        </td>
        
      </tr>
    )
  })


  return (
    <>
     { decision}

      <hr />
      <p>Answers to asked questions : </p>
      <div className="answerContainer">
        <table className="answers">
        <thead>
          <tr>
            <th>QUESTION</th>
            <th>ANSWERS</th>
            <th>INFOS</th>
          </tr>
        </thead>
        <tbody>
          {questionAnswer}
        </tbody>
        </table>
      </div>
    </>
  );
});

export default React.memo(QuizOver);
