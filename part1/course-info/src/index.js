import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {
        parts.map(p => <Part p={p} key={p.name} />)
      }
    </div>
  )
}

const Part = ({ p }) => {
  return (
    <div>
      <p>{p.name} {p.exercises}</p>
    </div>
  )
}

const Total = ({ parts }) => {

  return (
    <div>
      Number of exercises : {
        parts.reduce(((total, p) => total + p.exercises), 0)
      }
    </div>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))