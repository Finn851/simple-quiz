import {NavLink} from "react-router-dom";
import Chart from 'chart.js/auto';
import React from "react";
import $ from "jquery";

const QuizModalEnd = (props) => {
    $(document).ready(() => {
        let chart = document.getElementById('chart');
        var ctx = chart.getContext('2d');

        const data = {
            labels: [
                'Easy',
                'Medium',
                'Hard'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [props.easy, props.middle, props.hard],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        };

        var myChart = new Chart(ctx,{
            type: 'doughnut',
            data: data,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: "white"
                        }
                    }
                }
            }
        });
    });

    return(
        <div className="quiz-over-modal active">
            <div className="content">
                <h1>Тест пройден</h1>
                <canvas id="chart"/>
                <p>Спасибо, что поучаствовал в нём!</p>
                <NavLink to="/"><button id="btn-try-again">Пройти ещё раз</button></NavLink>
            </div>
        </div>
    )
}

export default QuizModalEnd;