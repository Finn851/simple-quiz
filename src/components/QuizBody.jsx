import {NavLink} from "react-router-dom";

const QuizBody = (props) => {
    return (
        <div className="quiz-container">
            <div className="question-number">
                <h3>Вопрос
                    <span id="number-of-question"> </span>
                    из
                    <span id="number-of-all-questions"> </span>
                </h3>
            </div>
            <div id="question"></div>
            <div className="options">
            </div>
            <div className="button">
                <NavLink to={"/question" + (props.iden + 1)}><button id="btn-next">Next</button></NavLink>
            </div>
            <div id="answers-tracker">

            </div>
        </div>
    )
}

export default QuizBody;