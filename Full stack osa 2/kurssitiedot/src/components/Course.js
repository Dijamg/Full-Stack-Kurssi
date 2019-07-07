import React from 'react'

const Header = (props) =>(
        <h2>
            {props.course}
        </h2>
    )


const Content = ({parts}) =>{
    return (
        <div>
          {parts.map((a) => <Part part = {a} key = {a.id}/>)}
        </div>
      )
}

const Total = ({parts}) =>{
    const exercises = parts.map(part => part.exercises)
    const sum = exercises.reduce((a,b)=> a+b, 0)
    return(
        <div>
            <b>total of {sum} exercises</b>
        </div>

    )
}

const Part = (props) =>{
    return(
            <p>
                {props.part.name} {props.part.exercises}
            </p>
    )
}

const Course = ({course})=> {
    return(
        <>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts = {course.parts}/>
        </>
    )
}

export default Course