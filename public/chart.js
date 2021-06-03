var Chart = require('chart.js');
import Chart from 'chart.js/auto';
canvas id="colors" width="200" height="200"
var ctx = document.getElementById('colors');
var colorChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: 'Number of Responses',
            data: [],
            backgroundColor: [
                'rgb(255,0,0)',
                'rgb(13, 4, 254)',
                'rgb(255, 233, 0)'
               
            ],
            borderColor: [
                'rgb (0,0,0)',
                'rgb (0,0,0)',
                'rgb (0,0,0)'
             
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

canvas id="meal" width="200" height="200"
var ctx = document.getElementById('meal');
var mealChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Breakfast', 'Lunch', 'Dinner'],
        datasets: [{
            label: 'Number of Responses',
            data: [],
            backgroundColor: [
                'rgb(251, 124, 227)',
                'rgb(124, 237, 252)',
                'rgb(124, 252, 173)'
               
            ],
            borderColor: [
                'rgb (0,0,0)',
                'rgb (0,0,0)',
                'rgb (0,0,0)'
             
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


canvas id="superheroes" width="200" height="200"
var ctx = document.getElementById('superheroes');
var heroChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Batman', 'Superman', 'Captain America'],
        datasets: [{
            label: 'Number of Responses',
            data: [],
            backgroundColor: [
                'rgb(76, 76, 76)',
                'rgb(127, 3, 14)',
                'rgb(4, 20, 146)'
               
            ],
            borderColor: [
                'rgb (0,0,0)',
                'rgb (0,0,0)',
                'rgb (0,0,0)'
             
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
