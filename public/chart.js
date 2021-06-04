fetch('http://localhost:3000/api')
.then(res => res.json())
.then(data => {
    console.log(data);
    let colorKeys = data[0].colors.map(function(element) {
        return element._id;
    });
    let colorVals = data[0].colors.map(function(element) {
        return element.total;
    });

    var ctx = document.getElementById('colorsCht');
    var colorChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: colorKeys,
            datasets: [{
                hoverOffset: 50,
                label: 'Number of Responses',
                data: colorVals,
                backgroundColor: colorKeys,
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

    let mealKeys = data[0].meals.map(function(element) {
        return element._id;
    });
    let mealVals = data[0].meals.map(function(element) {
        return element.total;
    });

    var ctx = document.getElementById('mealsCht');
    var colorChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: mealKeys,
            datasets: [{
                axis: 'x',
                barThickness: 60,
                label: 'Number of Responses',
                data: mealVals,
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
            indexAxis: 'x',
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    let heroKeys = data[0].superheroes.map(function(element) {
        return element._id;
    });
    let heroVals = data[0].superheroes.map(function(element) {
        return element.total;
    });

    var ctx = document.getElementById('superheroesCht');
    var colorChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: heroKeys,
            datasets: [{
                axis: 'y',
                label: 'Number of Responses',
                data: heroVals,
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
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});




