import React from "react";
import "./Questionnaire.css";

const Questionnaire = ({
  question,
  index,
  selectedAnswers,
  openAnswer,
  handleAnswerSelection,
  handleOpenAnswer,
  handleBack,
  handleNext,
  isNextButtonEnabled,
  totalQuestions,
}) => {
  return (
    <div className="card">
      {question && (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <hr></hr>

          {question.subquestion && (
            <p className="paragraph">{question.subquestion}</p>
          )}

          {question.type === "multiple" && (
            <ul>
              {question.answers.map((answer, i) => (
                <li
                  key={i}
                  className={`answer ${
                    selectedAnswers.includes(answer.text) ? "selected" : ""
                  }`}
                  onClick={() => handleAnswerSelection(i)}
                >
                  {answer.text}
                </li>
              ))}
            </ul>
          )}

          {question.type === "checkbox" && (
            <ul>
              {question.answers.map((answer, i) => (
                <li
                  key={i}
                  className={`answer ${
                    selectedAnswers.includes(answer.text) ? "selected" : ""
                  }`}
                  onClick={() => handleAnswerSelection(i)}
                >
                  {answer.text}
                </li>
              ))}
            </ul>
          )}

          {question.type === "open" && (
            <textarea
              className="open-answer"
              placeholder={question.placeholder}
              value={openAnswer}
              onChange={handleOpenAnswer}
            />
          )}
        </>
      )}

      <div className="buttons-container questionnaire">
        <button
          onClick={handleBack}
          disabled={index === 0}
          className={`back-next-button ${index === 0 ? "disabled" : "enabled"}`}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <p>
          Question {index + 1} of {totalQuestions}
        </p>
        <button
          onClick={handleNext}
          disabled={!isNextButtonEnabled()}
          className={`back-next-button ${
            !isNextButtonEnabled() ? "disabled" : "enabled"
          }`}
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
