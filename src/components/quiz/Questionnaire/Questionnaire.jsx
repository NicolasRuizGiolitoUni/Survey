import React from "react";

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
    <>
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

      <div className="buttons-container">
        {/* Conditionally render the "Back" button */}
        {index > 0 && (
          <button onClick={handleBack} className="back-next-button back">
            <p>Back</p>
          </button>
        )}

        {/* Always render the "Next" button */}
        <button
          onClick={handleNext}
          disabled={!isNextButtonEnabled()}
          className={`back-next-button ${
            !isNextButtonEnabled() ? "disabled" : "enabled"
          }`}
        >
          <p>Next</p>
        </button>
      </div>
    </>
  );
};

export default Questionnaire;
