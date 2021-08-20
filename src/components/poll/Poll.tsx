import React from 'react'
import { Question } from '../../types/Types'
import './Poll.scss'

const Poll = () => {
  const questions: Question[] = [
    {
      id: '1',
      question: 'Que es lo mas importante en la boda?',
      options: [
        {
          id: '1',
          description: 'La fiesta',
        },
        {
          id: '2',
          description: 'La comida',
        },
        {
          id: '3',
          description: 'La ceremonia',
        },
        {
          id: '4',
          description: 'Todas son importante',
        },
      ],
    },
    {
      id: '2',
      question: 'Por que estamos en este mundo?',
      options: [
        {
          id: '1',
          description: 'Para ser felices',
        },
        {
          id: '2',
          description: 'Por la comida',
        },
        {
          id: '3',
          description: 'A vivir',
        },
      ],
    },
    {
      id: '3',
      question: 'Donde prefieres las vacaciones?',
      options: [
        {
          id: '1',
          description: 'En la playa',
        },
        {
          id: '2',
          description: 'En la montaña',
        },
        {
          id: '3',
          description: 'En la casa',
        },
      ],
    },
  ]

  return (
    <div className="poll" id="poll">
      <h2>Encuesta</h2>
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
      <button className="button-send box-shadow">Enviar</button>
    </div>
  )
}

export default Poll
