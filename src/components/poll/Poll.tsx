import React, { FunctionComponent } from 'react'
import { Question } from '../../types/Types'
import './Poll.scss'

const Poll: FunctionComponent<{ questions: Question[] }> = ({ questions }) => {
  return (
    <div className="poll" id="poll">
      <h2>Encuesta</h2>
      <div className="questions">
        {questions.map((question, index) => (
          <div key={question.id} className="question">
            <div className="box number">{index + 1}.</div>
            <div className="box title">{question.question}</div>
            <div className="box options">
              <ul>
                {question.options.map((option) => (
                  <li key={option.id} className="option box-shadow">
                    <input
                      type="radio"
                      name={question.id}
                      id={`${question.id}-${option.id}`}
                      value={option.id}
                    />
                    <label htmlFor={`${question.id}-${option.id}`}>
                      {option.description}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="container-button">
          <button className="button-send box-shadow">Enviar</button>
        </div>
      </div>
    </div>
  )
}

export default Poll
