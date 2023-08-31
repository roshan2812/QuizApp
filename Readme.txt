Here's a brief description of its functionality:


The app uses the useState hook to manage various states like the list of questions, the current question index,
the selected answer for the current question, the remaining time, user answers, quiz finish status, and more.

The app makes an API call to retrieve a set of quiz questions using the Open Trivia Database API 
(https://opentdb.com/api.php?amount=15).The fetched questions are stored in the questions state array.

A timer is implemented using the setInterval function to countdown the remaining time for the quiz.
The timer updates the remainingTime state, and if it reaches 0, the quiz is marked as finished.

Users can navigate through questions using navigation buttons.
Each question's index is displayed in a navigation panel, and the active and answered questions are visually indicated.

The current question is displayed along with multiple-choice options that are randomly shuffled for each question.
Users can select an answer by clicking on a radio button beside the option.
Selected answers are stored in the userAnswers state.

Users can move to the next question using a "Next" button.
If there are no more questions, a "Finish" button is displayed to end the quiz.
The app keeps track of the current question index using the currentQuestionIndex state.

Once the quiz is finished (either by answering all questions or when the timer reaches 0), the user is
presented with a "ReportPage" that displays a summary of their answers and the correct answers.
