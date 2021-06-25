import './App.css';
import QuizModalStart from './components/QuizModal/QuizModal';
import QuizModalEnd from './components/QuizModal/QuizModalEnd';
import QuizBody from './components/QuizBody';
import {Route} from "react-router-dom";

function App(props) {
    let allCorrectAnswers = 0;
    let correctAnswersEasy = 0;
    let correctAnswersMiddle = 0;
    let correctAnswersHard = 0;

    const shuffle = (array) => { //перемешивает массив
        return array.sort(() => Math.random() - 0.5);
    }

    const createTemplate = (data, quest) => {
        let see = [];
        const inCorrect = data.results[quest].incorrect_answers;
        const correct = data.results[quest].correct_answer;
        const questionData = data.results[quest].question;
        const question = document.getElementById('question');

        const numberOfAllQuestion = document.getElementById('number-of-all-questions');
        const numberOfQuestion = document.getElementById('number-of-question'); //номер вопросаs

        question.innerHTML = questionData.toString();
        inCorrect.push(correct.toString());
        let allAnswers = shuffle(inCorrect);
        
        for(let i = 0; i < allAnswers.length; i++){
            see.push(`<div data-id="${i}" class="option option${i}">${allAnswers[i]}</div>`);
        }

        numberOfAllQuestion.innerHTML = ' ' + data.results.length;
        if(numberOfQuestion){
            numberOfQuestion.innerHTML += quest + 1 + ' ';
        }
        return see.join("");
    }

    const answersDifficulty = (difficulty) => {
        switch(difficulty){
            case "easy":
                correctAnswersEasy++;
                break;
            case "medium":
                correctAnswersMiddle++;
                break;
            case "hard":
                correctAnswersHard++;
                break;
        }
    }

    const getRightAnswer = (rightAnswer, difficulty) => {
        const option = document.querySelectorAll('.option');
        option.forEach(el => {
            el.addEventListener('click', () => {
                if(rightAnswer == el.innerHTML){
                    console.log(rightAnswer.toString());
                    for(let i = 0; i < option.length; i++){
                        option[i].classList.add('disabled');
                    }
                    el.classList.add('correct');
                    allCorrectAnswers++;
                    answersDifficulty(difficulty);
                } else {
                    for(let i = 0; i < option.length; i++){
                        option[i].classList.add('disabled');
                        if(rightAnswer == option[i].innerHTML){
                            option[i].classList.add('correct');
                        }
                    }
                    el.classList.add('wrong');
                }
            })
        })
    }

    let api;
    const gettingApi = async (i) => {
        const requestUrl = 'https://opentdb.com/api.php?amount=5';
        let requestData = await fetch(requestUrl);
        let data = await requestData.json();
        if(i === 0){
            api = data;
            console.log(api);
            allCorrectAnswers = 0;
            correctAnswersEasy = 0;
            correctAnswersMiddle = 0;
            correctAnswersHard = 0;
        }
        const options = document.querySelector('.options');
        options.innerHTML = createTemplate(api, i);
        getRightAnswer(api.results[i].correct_answer,api.results[i].difficulty);
    }
    

    return (
        <div className="App">
            <Route exact path="/" render={() => <QuizModalStart/>} />
            <Route exact path="/question1" render={() => <QuizBody iden={1} api={gettingApi(0)}/>}/>
            <Route exact path="/question2" render={() => <QuizBody iden={2} api={gettingApi(1)}/>}/>
            <Route exact path="/question3" render={() => <QuizBody iden={3} api={gettingApi(2)}/>}/>
            <Route exact path="/question4" render={() => <QuizBody iden={4} api={gettingApi(3)}/>}/>
            <Route exact path="/question5" render={() => <QuizBody iden={5} api={gettingApi(4)}/>}/>
            <Route exact path="/question6" render={() => <QuizModalEnd all={allCorrectAnswers} 
                                                                       easy={correctAnswersEasy}
                                                                       middle={correctAnswersMiddle}
                                                                       hard={correctAnswersHard}/>}/>
        </div>
    );
}

export default App;
