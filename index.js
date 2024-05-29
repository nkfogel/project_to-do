const createTaskBtn = document.querySelectorAll('.open-modal-btn');
const blockNoTasks = document.querySelector('.main__no-tasks');
const modal = document.querySelector('.modal');
const backgroundModalBlock = document.querySelector('.modal');
const modalWindow = document.querySelector('.modal__window');
const closeBtn = document.querySelector('.modal__window-close');
const okBtn = document.querySelector('.modal__button-ok');
const cancelBtn = document.querySelector('.modal__button-cancel');

//task counter block
const taskCounter = document.querySelector('.block-task-counter');

// // dark mode
// const btnDarkMode = document.querySelector('.dark-mode-btn')
// btnDarkMode.onclick= function() {
//     btnDarkMode.classList.toggle('dark-mode-btn--active')
//     // // console.log('dark')
//     // document.body.classList.toggle('dark')
// }




let data = localStorage.getItem('tasks');
let arr = [];

function init() {

    if(data){
        arr = JSON.parse(data)
        loadingTasks()
        countCase()
    }   

    function loadingTasks(){
        arr.forEach(elem => {
            let listElement = document.querySelector('#list');
            console.log(listElement)
            listElement.insertAdjacentHTML('beforeend', 
            `
                <li class="list__group-item">
                    <div class="note">
                        <span>${elem.title}</span>
                        
                        <span>${elem.description}</span>
                    
                        <span>${elem.priority}</span>
                    </div>
                    <span>
                        <span>${elem.date}</span>
                        <span class="btn__success">&check;</span>
                        <span class="btn__danger">&times;</span>
                        <span class="btn__change">&#9998;</span>
                    </span>
                </li>
            `
        ) 
    
        blockNoTasks.style.display = 'none'
    
        })
    }     
}

init()


createTaskBtn.forEach(elem => {                        //перебираю каждую из кнопок создания задачи и при клике на любую из кнопок запускаю функцию                             
    elem.addEventListener('click', openModal)
})

function openModal() {                               //функция присваивает элементу новый класс, который показывает его на странице
    backgroundModalBlock.classList.add('open')
}


cancelBtn.addEventListener('click', cancelModal)      //при нажатии запускаеться функция, которая вызываетсья в строке 21
closeBtn.addEventListener('click', closeModal)         //при нажатии запускаеться функция, которая вызываетсья в строке 24

function cancelModal() {
    reset()
    let inputForm = document.querySelector('.modal__form-input');
    let textareaForm = document.querySelector('.modal__form-textarea');
    let radioForm = document.querySelector('.modal__form-radio');
    inputForm.classList.remove('error');
    textareaForm.classList.remove('error');
    radioForm.classList.remove('error');
   
}
function closeModal() {
    reset()
    let inputForm = document.querySelector('.modal__form-input');
    let textareaForm = document.querySelector('.modal__form-textarea');
    let radioForm = document.querySelector('.modal__form-radio');
    inputForm.classList.remove('error');
    textareaForm.classList.remove('error');
    radioForm.classList.remove('error');
  
}

function reset() {                                                    //функция, которая удаялет класс у модального окна и убирая его со страницы, также очищая инпуты, вызываеться выше в функциях
    let radioForm = document.querySelectorAll('.form__radio');
    for(let radio of radioForm){
        radio.checked = false
    }
    document.querySelector('.modal__form-input').value = '';
    document.querySelector('.modal__form-textarea').value = '';
    backgroundModalBlock.classList.remove('open');
}

function countCase() {
    let totalTasks = document.querySelector('.total')
    taskCounter.classList.add('open')
    totalTasks.textContent = arr.length;
}


okBtn.addEventListener('click', saveForm);

function saveForm() {   
    let inputForm = document.querySelector('.modal__form-input');
    let textareaForm = document.querySelector('.modal__form-textarea');
    let colorForm = document.querySelector('.modal__form-input-color');
    let radioForm = document.querySelectorAll('.modal__form-radio');
    let date = new Date().toLocaleString();

    // const fullYear = date.getFullYear();
    // const mounth = date.getMonth();
    // const date1 = date.getDate();
    // const hour = date.getHours();
    // const minutes = date.getMinutes();

    // function formatTime(date) {
    //     const fullYear = date.getFullYear();
    //     const d = date.getDate();
    //     const mounth = (date.getMonth() +1).toString().padStart(2, '0') ;


    //     const hour = date.getHours().toString().padStart(2, '0') ;
    //     const minutes = date.getMinutes();

    //     return`${d}.${mounth}.${fullYear}, ${hour}:${minutes} `
    // }
   
    let priority

    radioForm.forEach(item => {
        if(item.checked){
            priority = item.value
        }
    })

    let modalObj = {
        title: inputForm.value, 
        description: textareaForm.value,
        color: colorForm.value,
        priority,
        date
    }

    // arr.push(modalObj)                                      //при сохранений данных добавляем данные в массив 
   
    
    checkValidation(modalObj) && addTask(modalObj)
    countCase()
}


// function counterСase() {
//     taskCounter.classList.add('open')
//     const counterAll = document.querySelector('.counter-of-all');
//     counterTasks++
//     counterAll.textContent = counterTasks
// }

function addTask(data){
    arr.push(data);
    let listElement = document.querySelector('#list');
    console.log(listElement)


    listElement.insertAdjacentHTML('beforeend', 
    `
        <li class="list__group-item">
            <div class="note">
                <span>${data.title}</span>
                
                <span>${data.description}</span>
            
                <span>${data.priority}</span>
            </div>
            <span>
                <span>${data.date}</span>
                <span class="btn__success">&check;</span>
                <span class="btn__danger">&times;</span>
                <span class="btn__change">&#9998;</span>
            </span>
        </li>
    `
) 
    blockNoTasks.style.display = 'none'
    localStorage.setItem('tasks', JSON.stringify(arr))      //сохраняем данные из массива в localStorage
}


function checkValidation(modalObj) {
    let inputForm = document.querySelector('.modal__form-input');
    let textareaForm = document.querySelector('.modal__form-textarea');
    let radioForm = document.querySelector('.modal__form-radio');
    console.log(modalObj)

    if (inputForm.value.length === 0){
        inputForm.classList.add('error')
        return false
    }else{
        inputForm.classList.remove('error')
    }

    if(textareaForm.value.length === 0){
        textareaForm.classList.add('error')
        return false
    }else{
        textareaForm.classList.remove('error')
    }

    let radioValidation = document.querySelectorAll('.form__radio');
    if (radioValidation.length > 0){
        let checked = false;
        radioValidation.forEach(item => {
            if (item.checked){
                checked = true;
            }
        })
        // for(i=0; i<radioValidation.length;i++){
        //     if (radioValidation[i].checked){
        //         checked = true;
        //         break;
        //     }
        // }
        if(!checked){
            radioForm.classList.add('error')
            return false
        }else{
            radioForm.classList.remove('error')
        }
    }
    reset()
    return true;
}


//закрытие модалки при нажатии на esc
window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
        backgroundModalBlock.classList.remove('open')
    }
})

//зыкрытие модалки при нажатии вне модалки
window.onclick = function(e){
    if(e.target === backgroundModalBlock){
        backgroundModalBlock.classList.remove('open')
    }
}