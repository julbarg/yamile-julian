import React, {
  ChangeEvent,
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from 'react'
import { collection, doc, getDocs, increment, updateDoc } from 'firebase/firestore'

import { Answers, Question } from '../../types/Types'
import './Poll.scss'

import { DBContext } from '../../App'
import Loading from '../loading/Loading'

const Poll: FunctionComponent = () => {
  const [answers, setAnswers] = useState({} as Answers)
  const [questions, setQuestions] = useState([] as Question[])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)
  const db = useContext(DBContext)

  const getQuestion = async () => {
    try {
      const queryQuestions: Question[] = []
      const pollRef = collection(db, 'poll')
      const pollSnapshot = await getDocs(pollRef)

      for (const pollDoc of pollSnapshot.docs) {
        const questionData = pollDoc.data() as Question
        questionData.id = pollDoc.id

        const optionsRef = collection(db, `poll/${pollDoc.id}/options`)
        const optionsSnapshot = await getDocs(optionsRef)
        questionData.options = optionsSnapshot.docs.map(optionDoc => ({
          ...optionDoc.data(),
          id: optionDoc.id
        }))

        queryQuestions.push(questionData)
      }

      setQuestions(queryQuestions)
    } catch (error) {
      console.log('🚀 ~ getFaqs ~ error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getQuestion()
  }, [])

  const updateAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value })
  }

  const sendPoll = async () => {
    setLoading(true)
    for (const pollId in answers) {
      await updateDoc(doc(db, 'poll', pollId), {
        totalVotes: increment(1),
      })

      await updateDoc(doc(db, `poll/${pollId}/options`, answers[pollId]), {
        numberVotes: increment(1),
      })
    }
    await getQuestion()
    setShowResults(true)
    setAnswers({})
    setLoading(false)
  }

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
      {loading ? (
        <Loading />
      ) : showResults ? (
        renderResults()
      ) : (
        renderQuestions()
      )}
    </div>
  )
}

export default Poll
