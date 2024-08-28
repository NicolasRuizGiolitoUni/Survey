import React, { useState, useEffect } from "react";
import "./Survey.css";
import { data } from "../../assets/data/data";
import Questionnaire from "./Questionnaire/Questionnaire";

const Survey = ({ goToNextComponent, goToPreviousComponent }) => {
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [openAnswer, setOpenAnswer] = useState("");
  const [responses, setResponses] = useState([]);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = data[index];
  const currentResponse = responses[index];

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

  const handleNext = () => {
    if (index >= data.length - 1) {
      setCompleted(true);
      return;
    }

    if (index < data.length - 1) {
      setIndex(index + 1);
      setSelectedAnswers([]);
      setOpenAnswer("");
      console.log("Current Responses:", responses);
    }
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedAnswers([]);
      setOpenAnswer("");
    } else {
      goToPreviousComponent();
    }
  };

  const handleAnswerSelection = (i) => {
    if (question) {
      const selectedText = question.answers[i].text;
      const updatedResponses = [...responses];

      if (question.type === "multiple") {
        updatedResponses[index] = {
          question: question.question,
          answer: selectedText,
        };
      } else if (question.type === "checkbox") {
        const currentAnswer = updatedResponses[index]?.answer || [];
        const newAnswer = currentAnswer.includes(selectedText)
          ? currentAnswer.filter((answer) => answer !== selectedText)
          : [...currentAnswer, selectedText];

        updatedResponses[index] = {
          question: question.question,
          answer: newAnswer,
        };
      }

      setResponses(updatedResponses);
    }
  };

  const handleOpenAnswer = (e) => {
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

  useEffect(() => {
    if (completed) {
      goToNextComponent();
    }
  }, [completed, goToNextComponent]);

  return (
    <div className="app-container" id="survey-container">
      <div className="center-container">
        {completed ? (
          <div className="thannks">Thank you!</div>
        ) : (
          <Questionnaire
            question={question}
            index={index}
            selectedAnswers={selectedAnswers}
            openAnswer={openAnswer}
            handleAnswerSelection={handleAnswerSelection}
            handleOpenAnswer={handleOpenAnswer}
            handleBack={() => {
              handleBack();
            }}
            handleNext={() => {
              handleNext();
              if (index >= data.length - 1) {
                goToNextComponent();
              }
            }}
            isNextButtonEnabled={isNextButtonEnabled}
            totalQuestions={data.length}
          />
        )}
      </div>
    </div>
  );
};

export default Survey;
