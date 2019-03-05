//find elements
let number1Input = document.getElementById('money');
let description = document.getElementById('comment');
let dateEl = document.getElementById('date');
let income = document.getElementById('income');
let consumption = document.getElementById('consumption');
let add = document.getElementById('add');
let incomeEl = document.getElementById('incomeCont');
let consumptionEl = document.getElementById('consumptionCont');
let allIncome = document.getElementById('all-income');
let allConsumption = document.getElementById('all-expense');
let balance = document.getElementById('balance');
let deleteBtn = document.querySelector('.delete');


income.addEventListener('change', onIncomeClick);
consumption.addEventListener('change', onConsumptionClick);
add.addEventListener('click', onAddClick);



//function allows you to enter only numbers
number1Input.onkeypress = function (e) {
    e = e || event;

    if (e.ctrlKey || e.altKey || e.metaKey) return;

    var chr = getChar(e);
    if (chr == null) return;

    if (chr < '0' || chr > '9') {
        return false;
    }
}

function getChar(event) {
    if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which);
    }
    return null; 
}
//////////////////////////////////////////////////////////////////////////////
function onIncomeClick() {
    if (consumption.checked) {
        consumption.checked = false;
    }
}

function onConsumptionClick() {
    if (income.checked) {
        income.checked = false;
    }
}
////////////////////////////////////////////////////////////////////
commentsIncome = [];
commentsConsumption = [];
function onAddClick() {
    let li = document.createElement('li');
    let changeBtn = document.createElement('button'); 
    let deleteBtn = document.createElement('button');
    let amount = document.createElement('label');
    let textfield = document.createElement('input');
    let comment = document.createElement('p');
    let date = document.createElement('p');

    comment.className += 'description';
    textfield.className +='textfield';  

    changeBtn.innerHTML = 'Изменить';
    deleteBtn.innerHTML = 'Удалить';
    amount.innerHTML = number1Input.value;
    comment.innerHTML = description.value;
    date.innerHTML = dateEl.value;


    if (income.checked) {
         li.id = 'income';
         amount.className += 'income-amount';
		 deleteBtn.className = 'delete-income';
		 changeBtn.className += 'change-income';

         incomeEl.insertBefore(li, incomeEl.children[0]);  
		 
		 let comment1 = {
			numb: number1Input.value,
		 }
		 commentsIncome.push(comment1);

		 deleteBtn.addEventListener('click', deleteItemFromIncome);
		 changeBtn.addEventListener('click', changeItemIncome);

         addAllIncome();
     } else if (consumption.checked) {
         li.className += 'consumption';
         amount.className += 'consumption-amount';

		 deleteBtn.className += 'delete-consumption';
		 changeBtn.className += 'change-consumption';

         consumptionEl.insertBefore(li, consumptionEl.children[0]);

		 let comment1 = {
			 numb: number1Input.value,
		}
		commentsConsumption.push(comment1);

		deleteBtn.addEventListener('click', deleteItemFromConsumption);
		changeBtn.addEventListener('click', changeItemConsumption);

         addAllConsumption();
     } else {
         alert('you need chose')
     }

    li.appendChild(changeBtn);
    li.appendChild(deleteBtn);
    li.appendChild(amount);
    li.appendChild(comment);
    li.appendChild(date);
    li.appendChild(textfield);
	
     consumption.checked = false;
     income.checked = false;

     number1Input.value = '';
}
//////////////////////////////////////////////////////////////////////
 function addAllIncome() {
	 let sum = 0;
     if (allIncome.children.length < 2) {
         let text1 = document.createElement('p');
         text1.className += 'income';
         text1.innerHTML = commentsIncome[commentsIncome.length - 1].numb;
         allIncome.insertBefore(text1, allIncome.children[1]);

     } else {
         let newText = document.querySelector('.income'); 
		 let result = allIncomeAmount();
		 newText.textContent = result;
     }
     AddCountedBalance();
 }

 function addAllConsumption() {
	 sum = 0;
     if (allConsumption.children.length < 2) {
         let text2 = document.createElement('p');
         text2.className += 'consumption';
         text2.innerHTML = commentsConsumption[commentsConsumption.length - 1].numb;
         allConsumption.insertBefore(text2, allConsumption.children[1]);

     } else {
         let newText = document.querySelector('.consumption');
		 let result = allConsumptionAmount();
         newText.textContent = result;
    }
     AddCountedBalance();
 }


 function AddCountedBalance() {
     let newBalance;
	 let result1 = allIncomeAmount();
	 let result2 = allConsumptionAmount();
	 
	 let sum = result1;
	 let sum2 = result2;

     if (sum == undefined) {
         sum = 0;
     } else if (sum2 == undefined) {
         sum2 = 0;
     }

     newBalance = sum - sum2;

     if (balance.children.length < 2) {
         let text3 = document.createElement('p');
         text3.className += 'balance';
         text3.innerHTML = newBalance;
         balance.insertBefore(text3, balance.children[1]);
     } else {
         let newText = document.querySelector('.balance');
         newText.textContent = newBalance;
     }
 }
////////////////delete Item from two Array and li////////////////////////
var arrayElem = [];
 function deleteItemFromIncome(e) {
	let h = e.target;
	
	let arrElems =  document.querySelectorAll('.delete-income');
	let g;
	for (var i = 0; i < arrElems.length; i++){
		arrayElem.unshift(arrElems[i]);
		g = arrayElem.indexOf(e.target);
	}
	arrayElem.splice(g, 1);
	commentsIncome.splice(g, 1);

    const listItem = this.parentNode;
    let list = listItem.parentNode;
    list.removeChild(listItem);

	newAmountInAllIncome();
	AddCountedBalance();
}

var arrayElem2 = [];
 function deleteItemFromConsumption(e) {
	//let h = e.target;
	
	let arrElems =  document.querySelectorAll('.delete-consumption');
	let g;
	for (var i = 0; i < arrElems.length; i++){
		arrayElem2.unshift(arrElems[i]);
		g = arrayElem2.indexOf(e.target);
	}
	arrayElem2.splice(g, 1);
	commentsConsumption.splice(g, 1);

    const listItem = this.parentNode;
    let list = listItem.parentNode;
    list.removeChild(listItem);

	newAmountInAllConsumption();
	AddCountedBalance();
}
////////////////change Item/////////////////
let arrayElem3 = [];
 function changeItemIncome(e) {
	let arrElems = document.querySelectorAll('.change-income');

	let g;
	for(let i = 0; i < arrElems.length; i ++){
		arrayElem3.unshift(arrElems[i]);
		g = arrayElem3.indexOf(e.target);
	}

     const listItem = this.parentNode;
     const title = listItem.querySelector('.income-amount');
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

	 commentsIncome[g].numb = title.innerText;

	 newAmountInAllIncome();
 }

 let arrayElem4 = [];
 function changeItemConsumption(e) {
	let arrElems = document.querySelectorAll('.change-consumption');

	let g;
	for(let i = 0; i < arrElems.length; i ++){
		arrayElem4.unshift(arrElems[i]);
		g = arrayElem4.indexOf(e.target);
	}

     const listItem = this.parentNode;
     const title = listItem.querySelector('.consumption-amount');
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

	 commentsConsumption[g].numb = title.innerText;

	 newAmountInAllConsumption();
 }

/////////////////////////////////////////////////////////////////////////////////

function newAmountInAllIncome() {
	let p = document.querySelector('.income');
	let result = allIncomeAmount();
	p.innerHTML = result;
	AddCountedBalance();
}

function newAmountInAllConsumption() {
	let p = document.querySelector('.consumption');
	let result = allConsumptionAmount();
	p.innerHTML = result;
	AddCountedBalance();
}


function allIncomeAmount() {
	let amount = 0;
	commentsIncome.forEach(function (comment) {
		amount += Number(comment.numb);
	})
	return amount;
}

function allConsumptionAmount() {
	let amount = 0;
	commentsConsumption.forEach(function (comment) {
		amount += Number(comment.numb);
	})
	return amount;
}

