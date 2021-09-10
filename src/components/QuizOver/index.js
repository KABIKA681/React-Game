import React, { useEffect, useState } from "react";
import { ImGift } from 'react-icons/im'
import Modal from "../Modal";

const QuizOver = React.forwardRef((props, ref) => {
  
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions
  } = props;

  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);


  console.log(loadLevelQuestions)

  useEffect(() => {
    setAsked(ref.current)
  }, [ref])

  const showModal = id => {
    setOpenModal(true)
  }
  const hideModal = () => {
    setOpenModal(false);

  }


  const averageGrade = maxQuestions / 2;
  if (score < averageGrade) {
    // setTimeout(() => { loadLevelQuestions(0) }, 3000);
    setTimeout(() => { loadLevelQuestions(quizLevel) }, 3500);
  }
  const decision = score >= averageGrade ? (
    <>
      <div className="stepsBtnContainer">
      
        {
          quizLevel < levelNames.length ?
            (
              <>
                <p className="successMsg"> Congratulation, Go to Next Level!</p>
                <button
                  className="btnResult success"
                  onClick = { () => loadLevelQuestions(quizLevel)}
                >
                  Next Level</button>
              </>

            )
            :
            (
              <>
                <p className="successMsg">
                  <ImGift  size='70px'/> Congratulation, You have made it!
                </p>
                <button
                  className="btnResult gameOver"
                  onClick = { () => loadLevelQuestions(0)}

                >
                  Back
                </button>
              </>
            )

        }

      </div>
      <div className="percentage">
        <div className="progressPercent">Success Rate: {percent}%</div>
        <div className="progressPercent">Marks: {score}/{maxQuestions}</div>
      </div>

    </>
  )
    :
    (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">You have failed!</p>
        </div>
    
    
        <div className="percentage">
          <div className="progressPercent">Success Rate: {percent}%</div>
          <div className="progressPercent">Marks: {score}/{maxQuestions}</div>
        </div>
      
      </>
    )

    const questionAnswer = score >= averageGrade ? (
    asked.map(question => {
      return (
        <tr key={question.id}>
          <td>{question.question}</td>
          <td>{question.answer}</td>
          <td>
            <button
              onClick={ () => showModal(question.heroId)}
              className="btnInfo">
              Infos
            </button>
          </td>
          
        </tr>
      )
    })
  )
    :
    (
      <tr >
          <td colSpan="3">
            <div className="loader"></div>
            <p style={{ textAlign: 'center', color: 'red' }}>
             Repeat the failed level to pass!
            </p>
          </td>
      
    </tr>
    )
  

  return (
    <>
     { decision }

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
     <Modal showModal={openModal} hideModal={hideModal}>
      <div className="modalHeader">
          <h2>Titre</h2>
        </div>
        <div className="modalBody">
          <h3>Titre 2</h3>
        </div>
        <div className="modalFooter">
          <button className="modalBtn">Close</button>
        </div>
      </Modal>
    

    </>

   
  );
});

export default React.memo(QuizOver);
