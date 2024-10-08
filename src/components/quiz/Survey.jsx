import React, { useState, useEffect } from "react";
import "./Survey.css";
import { data } from "../../assets/data/data2";
import Questionnaire from "./Questionnaire/Questionnaire";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore/lite";
import { db } from "../../db/db";

const Survey = ({ goToNextComponent, goToPreviousComponent, docId }) => {
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [openAnswer, setOpenAnswer] = useState("");
  const [responses, setResponses] = useState([]);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = data[index];
  const currentResponse = responses[index];

  // Load responses from Firestore when component mounts
  useEffect(() => {
    const loadResponses = async () => {
      const docRef = doc(db, "surveyResponses", docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResponses(docSnap.data().responses || []);
      }
    };

    loadResponses();
  }, [docId]);

  // Update local state when responses change
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

  const updateFirestoreResponses = async (updatedResponses) => {
    const docRef = doc(db, "surveyResponses", docId);
    try {
      await updateDoc(docRef, { responses: updatedResponses });
      console.log("Responses updated in Firestore");
    } catch (error) {
      console.error("Error updating responses in Firestore:", error);
    }
  };

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
      updateFirestoreResponses(updatedResponses);
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
      updateFirestoreResponses(updatedResponses);
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
    <>
      {completed ? (
        <div className="thanks">Thank you!</div>
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
    </>
  );
};

export default Survey;
