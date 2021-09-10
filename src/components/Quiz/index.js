import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizGame } from "../QuizGame";
import QuizOver from "../QuizOver";
import { FaChevronCircleRight } from 'react-icons/fa';

toast.configure();

class Quiz extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      levelNames: ["beginner", "middle", "expert"],
      quizLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnDisabled: true,
      userAnswer: null,
      score: 0,
      showWelcomeMsg: false,
      quizEnd:false
    };
  
    this.state = this.initialState;
    this.storedDataRef = React.createRef();
  }
  


  loadQuestions = (quizz) => {
    const fetchedQuiz = QuizGame[0].quizz[quizz];
    if (fetchedQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedQuiz;

      const newArray = fetchedQuiz.map(({ answer, ...keepRest }) => keepRest);

      this.setState({
        storedQuestions: newArray,
      });
    } 
  };

  showToastMsg = () => {
    if (!this.state.showWelcomeMsg) {
      this.setState
      ({showWelcomeMsg: true });

      toast.warn("Welcome and good luck", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      //this.gameOver();
      this.setState({
        quizEnd: true,
      })
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
       score: prevState.score + 1,
      }));
      toast.success("Congratulation +1 mark", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color",
      });
    } else {
      toast.error("Bad Answer 0 mark!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color",
        quizEnd: false,
      });
    }
  };
  
  componentDidUpdate(prevProps, prevState) {
    if ((this.state.storedQuestions !== prevState.storedQuestions) && this.state.storedQuestions.length ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
    if ((this.state.idQuestion !== prevState.idQuestion) && this.state.storedQuestions.length) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }
    if (this.state.quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercentage(this.state.maxQuestions, this.state.score);
      this.gameOver(gradePercent);
    }

    if (this.props.quizData.name !== prevProps.quizData) {
      this.showToastMsg(this.props.quizData.name);
    }
    
  }
  

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  getPercentage = (maxQuest, Ourscore) => (Ourscore / maxQuest) *100;



  gameOver = percent => {

if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent
      })

    } else {
      this.setState({percent})
    }
  };

  loadLevelQuestions = param => {
    this.setState({ ...this.initialState, quizLevel: param })
    
    this.loadQuestions(this.state.levelNames[param]);

  }



  render() {
    console.log(this.props.quizData)

    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p
          key={index}
          onClick={() => this.submitAnswer(option)}
          className={`answerOptions ${
            this.state.userAnswer === option ? " selected" : null
          }`}
        >
         <FaChevronCircleRight color='#832c31'/> {option}
        </p>
      );
    });

    return this.state.quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={this.state.levelNames}
        score={this.state.score}
        maxQuestions={this.state.maxQuestions}
        quizLevel={this.state.quizLevel}
        percent={this.state.percent}
        loadLevelQuestions={this.loadLevelQuestions}
      
      />
    ) : (
      <>
          <Levels
            levelNames={this.state.levelNames}
            quizLevel={this.state.quizLevel}
          
          />
        <ProgressBar
          idQuestion={this.state.idQuestion}
          maxQuestions={this.state.maxQuestions}
        />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button
          disabled={this.state.btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
        >
          {this.state.idQuestion < this.state.maxQuestions - 1
            ? "Next"
            : "Last Question"}
        </button>
      </>
    );
  }
}

export default Quiz;
