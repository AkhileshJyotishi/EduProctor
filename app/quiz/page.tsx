"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
// @ts-ignore
import Quiz from "react-quiz-component";

// const question = [
//   {
//     question:
//       "How can you access the state of a component from inside of a member function?",
//     questionType: "text",
//     questionPic: "https://dummyimage.com/600x400/000/fff&text=X", // if you need to display Picture in Question
//     answerSelectionType: "single",
//     answers: [
//       "this.getState()",
//       "this.prototype.stateValue",
//       "this.state",
//       "this.values",
//     ],
//     correctAnswer: "3",
//     messageForCorrectAnswer: "Correct answer. Good job.",
//     messageForIncorrectAnswer: "Incorrect answer. Please try again.",
//     point: "20",
//   },
//   {
//     question: "ReactJS is developed by ___?",
//     questionType: "text",
//     answerSelectionType: "single",
//     answers: ["Google Engineers", "Facebook Engineers"],
//     correctAnswer: "2",
//     messageForCorrectAnswer: "Correct answer. Good job.",
//     messageForIncorrectAnswer: "Incorrect answer. Please try again.",
//     point: "20",
//   },
//   {
//     question: "ReactJS is an MVC based framework?",
//     questionType: "text",
//     answerSelectionType: "single",
//     answers: ["True", "False"],
//     correctAnswer: "2",
//     messageForCorrectAnswer: "Correct answer. Good job.",
//     messageForIncorrectAnswer: "Incorrect answer. Please try again.",
//     point: "10",
//   },
//   {
//     question: "Which of the following concepts is/are key to ReactJS?",
//     questionType: "text",
//     answerSelectionType: "single",
//     answers: [
//       "Component-oriented design",
//       "Event delegation model",
//       "Both of the above",
//     ],
//     correctAnswer: "3",
//     messageForCorrectAnswer: "Correct answer. Good job.",
//     messageForIncorrectAnswer: "Incorrect answer. Please try again.",
//     point: "30",
//   },
//   {
//     question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
//     questionType: "photo",
//     answerSelectionType: "single",
//     answers: [
//       "https://dummyimage.com/600x400/000/fff&text=A",
//       "https://dummyimage.com/600x400/000/fff&text=B",
//       "https://dummyimage.com/600x400/000/fff&text=C",
//       "https://dummyimage.com/600x400/000/fff&text=D",
//     ],
//     correctAnswer: "1",
//     messageForCorrectAnswer: "Correct answer. Good job.",
//     messageForIncorrectAnswer: "Incorrect answer. Please try again.",
//     point: "20",
//   },
//   {
//     question: "What are the advantages of React JS?",
//     questionType: "text",
//     answerSelectionType: "multiple",
//     answers: [
//       "React can be used on client and as well as server side too",
//       "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
//       "React components have lifecycle events that fall into State/Property Updates",
//       "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer",
//     ],
//     correctAnswer: [1, 2, 4],
//     messageForCorrectAnswer: "Correct answer. Good job.",
//     messageForIncorrectAnswer: "Incorrect answer. Please try again.",
//     point: "20",
//   },
// ];

    const question= [
      {
        "answerSelectionType": "single",
        "answers": [
          "Saltwater",
          "Brackish",
          "Phytoplankton",
          "freshwater"
        ],
        "correctAnswer": "4",
        "id": 1,
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "options_algorithm": "sense2vec",
        "point": "20",
        "question": "What is the only water on Earth that is used for drinking and growing food?",
        "questionType": "text"
      },
      {
        "answerSelectionType": "single",
        "answers": [
          "Polar Caps",
          "Sea Levels",
          "Glaciers",
          "Ice Sheets",
          "Permafrost",
          "Oceans",
          "Arctic Ice",
          "ice caps"
        ],
        "correctAnswer": "8",
        "id": 2,
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "options_algorithm": "sense2vec",
        "point": "20",
        "question": "Where is most of the freshwater on Earth trapped?",
        "questionType": "text"
      },
      {
        "answerSelectionType": "single",
        "answers": [
          "Ice Sheets",
          "Oceans",
          "Sea Ice",
          "Lakes",
          "Antarctic",
          "Polar Caps",
          "Volcanic Activity",
          "Permafrost",
          "glaciers"
        ],
        "correctAnswer": "9",
        "id": 3,
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "options_algorithm": "sense2vec",
        "point": "20",
        "question": "Where is most of the freshwater on Earth trapped?",
        "questionType": "text"
      },
      {
        "answerSelectionType": "single",
        "answers": [
          "Pollutants",
          "Environmental Damage",
          "Carbon Emissions",
          "Greenhouse Gasses",
          "Oil Spills",
          "pollution"
        ],
        "correctAnswer": "6",
        "id": 4,
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "options_algorithm": "sense2vec",
        "point": "20",
        "question": "Why do people have no clean water?",
        "questionType": "text"
      },
      {
        "answerSelectionType": "single",
        "answers": [
          "Planet",
          "Moon",
          "Solar System",
          "earth"
        ],
        "correctAnswer": "4",
        "id": 5,
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "options_algorithm": "sense2vec",
        "point": "20",
        "question": "What is the most important place for life on earth?",
        "questionType": "text"
      },
      {
        "answerSelectionType": "single",
        "answers": [
          "Issues",
          "problems"
        ],
        "correctAnswer": "2",
        "id": 6,
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "options_algorithm": "sense2vec",
        "point": "20",
        "question": "Why do people have no clean water?",
        "questionType": "text"
      }
    ]
  

// const quiz = {
//   quizTitle: "Class Review Quiz: Test Your Knowledge!",
//   quizSynopsis:
//     "Put your learning to the test with our Class Review Quiz! This quiz is designed to help you review and reinforce the key concepts covered in your recent online class. Challenge yourself with questions that reflect the material discussed during the session. Assess your understanding and identify areas for further study. Dive in and see how well you've mastered the content!",
//   nrOfQuestions: question.length,
//   questions: question,
// };

const Quizz = () => {
  const [show, setShow] = useState<Boolean>(false);
  const router = useRouter();
  const setQuizResult = (obj: any) => {
    setShow(true);
  };
//   const  params=useSearchParams()
//   let p=params.get("data")

const quiz = {
    quizTitle: "Class Review Quiz: Test Your Knowledge!",
    quizSynopsis:
      "Put your learning to the test with our Class Review Quiz! This quiz is designed to help you review and reinforce the key concepts covered in your recent online class. Challenge yourself with questions that reflect the material discussed during the session. Assess your understanding and identify areas for further study. Dive in and see how well you've mastered the content!",
    nrOfQuestions:5,
    questions: question,
  };
// if(p)
//   console.log(p)
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 text-teal-300 text-xl">
      <Quiz
        quiz={quiz}
        shuffle={true}
        shuffleAnswer={true}
        showInstantFeedback={true}
        timer={60}
        allowPauseTimer={true}
        onComplete={setQuizResult}
      />
      {show && (
        <button
          onClick={() => {
            router.push("/");
          }}
          className="bg-transparent border-teal-300 border p-4 rounded-md cursor-pointer hover:bg-teal-300 hover:text-teal-950"
        >
          {" "}
          Go Back to Home
        </button>
      )}
    </div>
  );
};

export default Quizz;