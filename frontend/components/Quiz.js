import React from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators'
import { useEffect } from 'react';

function Quiz(props) {
useEffect(() => {
  if(!props.quiz){
    console.log('fetching');
  props.fetchQuiz()
  }
})

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
            {[0, 1].map(idx => (
              <div key={idx} className={props.quiz.answers[idx].answer_id === props.selectedAnswer ? "answer selected" : "answer"}>
                {props.quiz.answers[idx].text}
                <button id={props.quiz.answers[idx].answer_id} onClick={(e) => props.selectAnswer(e.target.id)}>
                  {props.quiz.answers[idx].answer_id === props.selectedAnswer ? "SELECTED" : "Select"}
                </button>
              </div>
            ))}
            </div>

            <button id="submitAnswerBtn" disabled={props.selectedAnswer ? false : true} onClick={() => props.postAnswer(props.quiz.quiz_id, `${props.selectedAnswer}`)}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}
export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer})(Quiz)