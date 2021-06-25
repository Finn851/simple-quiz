import {NavLink} from "react-router-dom";
import $ from "jquery";

const QuizModalStart = (props) => {
    return(
        <div className="quiz-over-modal active">
            <div className="content">
                <h1>Привет!</h1>
                <p>Ты готов пройти Quiz?</p>
                <NavLink to="/question1"><button id="btn-try-again">Готов</button></NavLink>
            </div>
        </div>
    )
}
export default QuizModalStart;