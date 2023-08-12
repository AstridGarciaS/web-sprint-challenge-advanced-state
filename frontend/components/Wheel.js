import React from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

const cogArray = [0,1,2,3,4,5];

function Wheel(props) {
const handleClockwise = () => {
  if(props.activeWheel === 5) {props.moveClockwise(0)}
  else(props.moveClockwise(props.activeWheel + 1))
}
const handleCounterClockwise = () => {
  if(props.activeWheel === 0) {props.moveCounterClockwise(5)}
  else(props.moveCounterClockwise(props.activeWheel - 1))
}

  return (
    <div id="wrapper">
      <div id="wheel">
        {
          cogArray.map(idx => (
          <div key={idx} className={`cog${idx === props.activeWheel ? ' active' : ''}`} style={{"--i" : idx}}>
            {idx === props.activeWheel ? 'B' : null}
          </div>
          ))
        }
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClockwise}>Clockwise</button>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    activeWheel: state.wheel
  }
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);