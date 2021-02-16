import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {

    const { name, parts } = course
    const total = parts.reduce(((total, element) => total + element.exercises), 0);

    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <Total total={total} />
        </div>
    )
}

export default Course
