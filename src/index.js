import $ from 'jquery';
import './css/style.css';
import createElement from './helper.js';
import showItems from './showItems';

let comments = [];
let counter = 0;
loadComments();

//find elements
let number1Input = document.getElementById('money');
let description = document.getElementById('description');
let dateEl = document.getElementById('date');
let income = document.getElementById('income');
let consumption = document.getElementById('consumption');
let add = document.getElementById('add');

income.addEventListener('change', onIncomeClick);
consumption.addEventListener('change', onConsumptionClick);
add.addEventListener('click', onAddClick);
number1Input.addEventListener('change', checkParams);
description.addEventListener('change', checkParams);
dateEl.addEventListener('change', checkParams);

//////////////////////////////////////////////////////////////////////////////
function onIncomeClick() {
    if (consumption.checked) {
        consumption.checked = false;
    }
    checkParams();
}

function onConsumptionClick() {
    if (income.checked) {
        income.checked = false;
    }
    checkParams();
}
////////////////////////////////////////////////////////////////////
function checkParams() {
    let amount = number1Input.value;
    let desc = description.value;
    let date = dateEl.value;

    if (amount.length != 0 && description.length != 0 && date.length != 0 && (income.checked || consumption.checked)) {
        $('#add').removeAttr('disabled');
    } else {
        $('#add').attr('disabled', 'disabled');
    }
}
////////////////////////////////////////////////////////////////////
function onAddClick() {
    let comment1 = {
        id: counter,
        numb: number1Input.value,
        description: description.value,
        date: dateEl.value
    };
    if (income.checked) {
        comment1.type = 'income';
    } else if (consumption.checked) {
        comment1.type = 'consumption';
    }
    comments.push(comment1);
    createItem(comment1);
    clear();
}

function clear() {
    consumption.checked = false;
    income.checked = false;
    number1Input.value = '';
    description.value = '';
    dateEl.value = '';
    $('#add').attr('disabled', 'disabled');
}

function createItem(comment1) {
        const changeBtn = createElement('button', { id: counter, className: 'change btn float-right' }, 'Изменить');
        const deleteBtn = createElement('button', { id: counter, className: 'delete btn float-right' }, 'Удалить');
        const amount = createElement('label', { className: 'amount' }, comment1.numb);
        const textfield = createElement('input', { className: 'textfield' });
        const date = createElement('p', { className: 'date float-right' }, comment1.date);
        const comment = createElement('p', { className: 'description' }, comment1.description);
        const listItem = createElement('li', { id: counter, className: '' }, changeBtn, deleteBtn, amount, textfield, comment, date);

        bindEvents(listItem);
        showItems(listItem, comment1);
        AddAllAmount(comment1);
        counter += 1;
}

function bindEvents(item) {
    const deleteBtn = item.querySelector('.delete');
    const changeBtn = item.querySelector('.change');

    deleteBtn.addEventListener('click', ondeleteBtnClick);
    changeBtn.addEventListener('click', OnChangeBtnClick);
}
/////////////////////////////////////////////////////////////////////
function AddAllAmount() {
    let result = { balance: 0, income: 0, expense: 0 };

    comments.forEach(comment => {
        if (comment.type == 'income') {
            result.income += +comment.numb;
        } else if (comment.type == 'consumption') {
            result.expense += +comment.numb;
        }
    });

    result.balance = result.income - result.expense

    saveComments();
    showAmount(result)
}

function showAmount(result) {
    let allIncome = document.querySelector('.all-income-p');
    let allExpense = document.querySelector('.all-expense-p');
    let balance = document.querySelector('.balance');

    allIncome.textContent = result.income;
    allExpense.textContent = result.expense;
    balance.textContent = result.balance;
}
////////////////delete Item from two Array and li////////////////////////
 function ondeleteBtnClick(e) {
     const listItem = this.parentNode;
     const id = listItem.getAttribute('id');
     let list = listItem.parentNode;
     list.removeChild(listItem);

     comments.map((value, index) => {
         if (value.id == id) {
             comments.splice(index, 1);
         }
     })

     AddAllAmount();
}

////////////////change Item/////////////////
 function OnChangeBtnClick(e) {
     const listItem = this.parentNode;
     const id = listItem.getAttribute('id');
     const title = listItem.querySelector('.amount');
     const editInput = listItem.querySelector('.textfield');
     const isEditing = listItem.classList.contains('editing');

      if(isEditing) {
          title.innerText = editInput.value;
          this.innerText = 'Изменить';
      } else {
         editInput.value = title.innerText;
         this.innerText = 'Сохранить';
     }
     listItem.classList.toggle('editing');

	 for(let i = 0; i < comments.length; i++){
		if(id == comments[i].id){
			comments[i].numb = title.innerText;
		}
     }
     AddAllAmount();
 }
////////////////////////////////////////////////////////////////////////////////
function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    if (localStorage.getItem('comments')) {
        comments = JSON.parse(localStorage.getItem('comments'));
        let counter2 = 0;
        comments.forEach(function (item) {
            createItem(item);
            item.id = counter2;
            counter2 += 1;
        })
    }
}

export default comments;