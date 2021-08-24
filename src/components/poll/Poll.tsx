import React, {
  ChangeEvent,
  FunctionComponent,
  useState,
  useEffect,
} from 'react'
import { Answers, OptionByQuestion, Question } from '../../types/Types'
import { db, firestore } from '../../config/firebase'
import './Poll.scss'
import ReactLoading from 'react-loading'

const Poll: FunctionComponent = () => {
  const [answers, setAnswers] = useState({} as Answers)
  const [questions, setQuestions] = useState([] as Question[])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)

  const getQuestion = async () => {
    setLoading(true)
    const pollRef = db.collection('poll')
    let activeRef = await pollRef.get()
    const queryQuestions: Question[] = []

    for (const poll of activeRef.docs) {
      let optionRef = await pollRef.doc(poll.id).collection('options').get()
      const queryOptions: OptionByQuestion[] = []
      for (const option of optionRef.docs) {
        queryOptions.push({
          id: option.id,
          ...option.data(),
        })
      }

      queryQuestions.push({
        id: poll.id,
        options: queryOptions,
        ...poll.data(),
      })
    }
    setQuestions(queryQuestions)
    setLoading(false)
  }

  useEffect(() => {
    getQuestion()
  }, [])

  const updateAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value })
  }

  const sendPoll = async () => {
    setLoading(true)
    const increment = firestore.FieldValue.increment(1)

    for (const pollId in answers) {
      await db.collection('poll').doc(pollId).update({
        totalVotes: increment,
      })

      await db
        .collection('poll')
        .doc(pollId)
        .collection('options')
        .doc(answers[pollId])
        .update({
          numberVotes: increment,
        })
    }
    await getQuestion()
    setShowResults(true)
    setAnswers({})
    setLoading(false)
  }

  const renderLoading = () => (
    <div className="loading">
      <div className="loading-title">Cargando...</div>
      <ReactLoading type="bars" color="#3f4551" width={72} />
    </div>
  )

  const renderQuestions = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        void sendPoll()
      }}
    >
      <div className="questions">
        {questions.map((question, index) => (
          <div key={question.id} className="question">
            <div className="box number">{index + 1}.</div>
            <div className="box title">{question.question}</div>
            <div className="box options">
              <ul>
                {question.options?.map((option) => (
                  <li key={option.id} className="option box-shadow">
                    <input
                      type="radio"
                      required
                      name={question.id}
                      id={option.id}
                      value={option.id}
                      onChange={(e) => updateAnswer(e)}
                      checked={answers[question.id] === option.id}
                    />
                    <label htmlFor={option.id}>{option.option}</label>
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
    </form>
  )

  const renderResults = () => {
    let percentage: number
    return (
      <div className="questions">
        {questions.map((question, index) => (
          <div key={question.id} className="question">
            <div className="box number">{index + 1}.</div>
            <div className="box title">{question.question}</div>
            <div className="box options">
              <ul>
                {question.options?.map((option) => {
                  percentage = Number(
                    (
                      ((option.numberVotes || 0) / (question.totalVotes || 1)) *
                      100
                    ).toFixed(0)
                  )

                  return (
                    <li key={option.id} className="option box-shadow">
                      <div>
                        {option.option}
                        {percentage <= 10 ? `- ${percentage}%` : ''}
                      </div>
                      <div className="percentage-container">
                        <div
                          className="percentage"
                          style={{
                            width: `${percentage}%`,
                          }}
                        >
                          {percentage > 10 ? `${percentage}%` : ''}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="poll" id="poll">
      <h2>Encuesta</h2>
      {loading
        ? renderLoading()
        : showResults
        ? renderResults()
        : renderQuestions()}
    </div>
  )
}

export default Poll
