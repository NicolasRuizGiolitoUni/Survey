import React, { useState, useEffect } from "react";
import "./Quiz.css";
import { data } from "../../assets/data/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [openAnswer, setOpenAnswer] = useState("");
  const [responses, setResponses] = useState([]);
  const [followUpIndex, setFollowUpIndex] = useState(null);

  const question = data[index];
  const currentResponse = responses[index];
  const followUpQuestion = followUpIndex !== null ? data[followUpIndex] : null;

  useEffect(() => {
    if (question) {
      if (currentResponse) {
        const savedAnswer = currentResponse.answer;
        if (question.type === "open") {
          setOpenAnswer(savedAnswer || "");
        } else {
          const answerTexts = question.answers.map((answer) => answer.text);
          const newSelectedAnswers = answerTexts.filter((text) =>
            Array.isArray(savedAnswer)
              ? savedAnswer.includes(text)
              : savedAnswer === text
          );
          setSelectedAnswers(newSelectedAnswers);
        }
      } else {
        setSelectedAnswers([]);
        setOpenAnswer("");
      }
    }
  }, [index, responses, question]);

  useEffect(() => {
    if (question && question.followUp) {
      const condition = question.followUp.condition;
      if (responses[index]?.answer === condition) {
        setFollowUpIndex(index + 1);
      } else {
        setFollowUpIndex(null);
      }
    } else {
      setFollowUpIndex(null);
    }
  }, [index, responses, question]);

  const handleNext = () => {
    if (index >= data.length - 1) {
      console.log("Quiz completed");
      return;
    }

    if (index < data.length - 1) {
      if (followUpIndex !== null) {
        setIndex(followUpIndex);
      } else {
        setIndex(index + 1);
      }
      setSelectedAnswers([]);
      setOpenAnswer("");

      // Log the current responses
      console.log("Current Responses:", responses);
    }
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedAnswers([]);
      setOpenAnswer("");
    }
  };

  const handleAnswerSelection = (i, isFollowUp = false) => {
    const questionToUpdate = isFollowUp ? followUpQuestion : question;
    if (questionToUpdate) {
      const selectedText = questionToUpdate.answers[i].text;
      const updatedResponses = [...responses];

      if (questionToUpdate.type === "multiple") {
        updatedResponses[index] = {
          question: questionToUpdate.question,
          answer: selectedText,
        };
      } else if (questionToUpdate.type === "checkbox") {
        const currentAnswer = updatedResponses[index]?.answer || [];
        const newAnswer = currentAnswer.includes(selectedText)
          ? currentAnswer.filter((answer) => answer !== selectedText)
          : [...currentAnswer, selectedText];

        updatedResponses[index] = {
          question: questionToUpdate.question,
          answer: newAnswer,
        };
      }

      setResponses(updatedResponses);
    }
  };

  const handleOpenAnswer = (e, isFollowUp = false) => {
    const updatedResponses = [...responses];

    if (question) {
      updatedResponses[index] = {
        question: question.question,
        answer: e.target.value,
      };
      setResponses(updatedResponses);
    }
    setOpenAnswer(e.target.value);
  };

  const isNextButtonEnabled = () => {
    if (question) {
      if (question.type === "open") {
        return openAnswer.trim() !== "";
      } else if (question.type === "checkbox") {
        return selectedAnswers.length > 0;
      } else {
        return selectedAnswers.length > 0;
      }
    }
    return false;
  };

  return (
    <div className="app-container">
      <div className="center-container">
        <div className="header">
          <h1>Not-Too-Dumb Phone Survey</h1>
        </div>
        <div className="card">
          {question && (
            <>
              <h2>
                {index + 1}. {question.question}
              </h2>

              {question.subquestion && (
                <p className="subquestion">{question.subquestion}</p>
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
                  onChange={(e) => handleOpenAnswer(e)}
                />
              )}

              {followUpIndex !== null && followUpQuestion && (
                <div className="follow-up">
                  <h2>{followUpQuestion.question}</h2>
                  {followUpQuestion.type === "multiple" && (
                    <ul>
                      {followUpQuestion.answers.map((answer, i) => (
                        <li
                          key={i}
                          className={`answer ${
                            responses[followUpIndex]?.answer === answer.text
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleAnswerSelection(i, true)}
                        >
                          {answer.text}
                        </li>
                      ))}
                    </ul>
                  )}

                  {followUpQuestion.type === "checkbox" && (
                    <ul>
                      {followUpQuestion.answers.map((answer, i) => (
                        <li
                          key={i}
                          className={`answer ${
                            (responses[followUpIndex]?.answer || []).includes(
                              answer.text
                            )
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleAnswerSelection(i, true)}
                        >
                          {answer.text}
                        </li>
                      ))}
                    </ul>
                  )}

                  {followUpQuestion.type === "open" && (
                    <textarea
                      className="open-answer"
                      placeholder={followUpQuestion.placeholder}
                      value={responses[followUpIndex]?.answer || ""}
                      onChange={(e) => handleOpenAnswer(e, true)}
                    />
                  )}
                </div>
              )}
            </>
          )}

          <div className="buttons-container">
            <button
              onClick={handleBack}
              disabled={index === 0}
              className={`nav-button ${index === 0 ? "disabled" : "enabled"}`}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              onClick={handleNext}
              disabled={!isNextButtonEnabled()}
              className={`nav-button ${
                !isNextButtonEnabled() ? "disabled" : "enabled"
              }`}
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="progress-bar">
            <p>
              Question {index + 1} of {data.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
