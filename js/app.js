// CODE EXPLAINED channel
//Select the elements

const clear = document.querySelector('.clear');
const dateElement = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('#input');

//Classes names

const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

//Variables
let LIST = [], id = 0;

//get item from localstorage
let data = localStorage.getItem('TODO');
//check if the data is not empty in localstorage
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last
    loadList(LIST); //load the list to the user interface
} else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage

clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})
//add item to localstorage (this code must be added where the LIST array is updated)
localStorage.setItem('TODO', JSON.stringify(LIST));
//Show today's date

const options = {weekday: 'long', month: 'short', day: 'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-us', options);

//add to do functions

function addToDo(todo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
               <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${todo}</p>
                <i class="fa fa-trash-o de"job="delete" id="${id}"></i> 
               </li> 
    `;
    const position = 'beforeend';

    list.insertAdjacentHTML(position, item);
}

//add an item to the list when the user hits the enter key

document.addEventListener('keyup', event => {
    let key = event.key || event.keyCode;
    if (key === 'Enter' || key === 13) {
        const todo = input.value;

        //    if the input isn't empty
        if (todo) {
            addToDo(todo);

            LIST.push({
                name: todo,
                id: id,
                done: false,
                trash: false,
            });


            //add item to localstorage (this code must be added where the LIST array is updated)
            localStorage.setItem('TODO', JSON.stringify(LIST));

            id++;

        }
        //empties the input field after enter is pressed
        input.value = '';
    }
});

//complete to do function

const completeTodo = (element) => {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}
//remove to do

const removeTodo = (element) => {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}


//target the items created dynamically

list.addEventListener('click', event => {
    const element = event.target; //return the clicked element inside the list
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob === 'complete') {
        completeTodo(element);
    } else if (elementJob === 'delete') {
        removeTodo(element);
    }

    //add item to localstorage (this code must be added where the LIST array is updated)
    localStorage.setItem('TODO', JSON.stringify(LIST));
});





















