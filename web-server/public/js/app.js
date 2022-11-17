

console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#m-1');
const message2 = document.querySelector('#m-2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault(); //to prevent page from loading
    const address =  search.value;  //value gives the value we entered into the form
    message1.textContent='Loading.....';
    fetch('/weather?address='+address).then((response) =>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = data.error;
        } else {
            message1.textContent = 'Weather information loaded!!'
            message2.textContent = 'Here in '+data.address+' '+data.forecast;
        }
    })
})
})
