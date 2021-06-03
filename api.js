const meal = document.getElementById('category1');
const colors = document.getElementById('category2');
const superhero = document.getElementById('category3');
const submit = document.getElementById('submit');
const answer = document.getElementById(option);

submit.addEventListener('click', () => {
    fetch('http://localhost:3000/submitted', {method: 'POST', headers:{'Content-Type': 'application/x-www-form-urlencoded' }, body: `category=${category.value}&answer=${option.value}`})
    .then(res => res.json())
    .then(data => console.log(data));
})
