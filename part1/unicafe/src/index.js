import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ feedbacks }) => {

  return (
    <div>
      <table>
        <tbody>
          {
            feedbacks.map(item =>
              <tr key={item.text}>
                <Statistic text={item.text} value={item.value} />
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({ text, value }) => {
  if (text === 'positive') {
    value += ' %'
  }
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const Button = ({ feedbackFunc, value }) => {
  return (
    <button key={value} onClick={() => feedbackFunc(value)}>{value}</button>
  )
}



export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0
  })


  const { good, neutral, bad } = feedback
  const all = good + bad + neutral
  const positive = ((good * 100) / (all)).toFixed(1)
  const average = ((good + (bad * -1)) / (all)).toFixed(1)

  const feedbacks = [
    { text: "good", value: good },
    { text: 'neutral', value: neutral },
    { text: 'bad', value: bad },
    { text: 'all', value: all },
    { text: 'average', value: average },
    { text: 'positive', value: positive }
  ]

  const feedbackFunc = (name) => {
    switch (name) {
      case 'good':
        return setFeedback({ ...feedback, good: feedback[name] + 1 })
      case 'neutral':
        return setFeedback({ ...feedback, neutral: feedback[name] + 1 })
      case 'bad':
        return setFeedback({ ...feedback, bad: feedback[name] + 1 })
      default:
        return feedback
    }

  }
  return (
    <div>
      <h2>give feedback</h2>
      {
        Object.keys(feedback).map(value =>
          <Button key={value} feedbackFunc={feedbackFunc} value={value} />)
      }
      <h2>statistics</h2>
      {
        all ? <Statistics feedbacks={feedbacks} />
          : <div>No feedback given</div>
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))