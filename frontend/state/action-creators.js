// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios'
import {
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER, 
  SET_INFO_MESSAGE, 
  INPUT_CHANGE_QUESTION, 
  INPUT_CHANGETRUE, 
  INPUT_CHANGEFALSE, 
  RESET_FORM 
  } from './action-types'

export function moveClockwise(nextCog) {
  return {type: MOVE_CLOCKWISE, payload: nextCog}
}

export function moveCounterClockwise(nextCog) { 
  return {type: MOVE_COUNTERCLOCKWISE, payload: nextCog}
}

export function selectAnswer(id) { 
  return {type: SET_SELECTED_ANSWER, payload: id}
}

export function setMessage(message) {
  return {type: SET_INFO_MESSAGE, payload: message}
 }

export function setQuiz(quiz) {
  return {type: SET_QUIZ_INTO_STATE, payload: quiz}
 }

export function changeQuestionInput(input) {
  return {type: INPUT_CHANGE_QUESTION, payload: input.trim()}
 }
export function changeTrueInput(input) {
  return {type: INPUT_CHANGETRUE, payload: input.trim()}
 }
export function changeFalseInput(input) {
  return {type: INPUT_CHANGEFALSE, payload: input.trim()}
 }
export function resetForm() {
  return {type: RESET_FORM}
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch(setQuiz(null))
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => dispatch(setQuiz(res.data)))
      .catch(err => console.error(err));
  }
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post('http://localhost:9000/api/quiz/answer', { "quiz_id": quiz_id, "answer_id": answer_id })
    .then(res => {
      dispatch(setMessage(res.data.message))
      dispatch(setQuiz(null))
    })
    .catch(err => dispatch(setMessage("Sorry, something went wrong")))
    
  }
}
export function submitQuiz(question, trueAnswer, falseAnswer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post('http://localhost:9000/api/quiz/new', { "question_text": question, "true_answer_text": trueAnswer, "false_answer_text": falseAnswer })
    .then(res => dispatch(setMessage(`Congrats: "${question}" is a great question!`)))
    .catch(err => dispatch(setMessage("Sorry, something went wrong")))
    dispatch(resetForm())

  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
