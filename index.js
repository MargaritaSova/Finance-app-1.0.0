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
comments = [];
let counter = 0;

commentsIncome = [];
commentsConsumption = [];

comments = [];

function onAddClick() {
    let li = document.createElement('li');
    let changeBtn = document.createElement('button'); 
    let deleteBtn = document.createElement('button');
    let amount = document.createElement('label');
    let textfield = document.createElement('input');
    let comment = document.createElement('p');
    let date = document.createElement('p');

	amount.className += 'amount';
    comment.className += 'description';
    textfield.className +='textfield';  
	deleteBtn.className = 'delete';
	deleteBtn.id = counter;
	changeBtn.id = counter;
	changeBtn.className += 'change';

    changeBtn.innerHTML = 'Изменить';
    deleteBtn.innerHTML = 'Удалить';
    amount.innerHTML = number1Input.value;
    comment.innerHTML = description.value;
    date.innerHTML = dateEl.value;


    if (income.checked) {
		let comment1 = {
			id:  counter,
			type: 'income',
			numb: number1Input.value
		 }
		 comments.push(comment1);

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

         li.id = "income";
         text.className += "income-amount";
                
         incomeEl.insertBefore(li, incomeEl.children[1]);    


         addAllIncome();
     } else if (consumption.checked) {
         li.className += 'consumption';
         amount.className += 'consumption-amount';

		 deleteBtn.className += 'delete-consumption';
		 changeBtn.className += 'change-consumption';

		 li.className += 'income';

		 addAllIncome();
	} else if (consumption.checked) {
		let comment1 = {
			id:  counter,
			type: 'consumption',
			numb: number1Input.value
		 }
		 comments.push(comment1);

		 li.className += 'consumption';

		 addAllConsumption();
		 } else {
				alert('you need chose')
			}

		 let g = comments[comments.length - 1].type;
		 if(g == 'income'){
				incomeEl.insertBefore(li, incomeEl.children[0]); 
		 }else if(g == 'consumption'){
				consumptionEl.insertBefore(li, consumptionEl.children[0]);
		 }
			
    li.appendChild(changeBtn);
    li.appendChild(deleteBtn);
    li.appendChild(amount);
    li.appendChild(comment);
    li.appendChild(date);
    li.appendChild(textfield);


    deleteBtn.addEventListener('click', deleteItem);
    //changeBtn.addEventListener('click', changeItem);

	
     consumption.checked = false;
     income.checked = false;

     number1Input.value = '';

	 deleteBtn.addEventListener('click', ondeleteBtnClick);
	 changeBtn.addEventListener('click', OnChangeBtnClick);

	 counter += 1;

  number1Input.value = '';

  
     let comment1 = {
         numb: number1Input.value,
     }
     comments.push(comment1);

     money.value = '';
}
//////////////////////////////////////////////////////////////////////
 function addAllIncome() {
     if (allIncome.children.length < 2) {
         let text1 = document.createElement('p');
         text1.className += 'income-p';
         text1.innerHTML = comments[comments.length - 1].numb;
         allIncome.insertBefore(text1, allIncome.children[1]);

     } else {
         let newText = document.querySelector('.income-p'); 
		 let result = allAmount('income');
		 newText.textContent = result;
     }
     AddCountedBalance();
 }

 function addAllConsumption() {
     if (allConsumption.children.length < 2) {
         let text2 = document.createElement('p');
         text2.className += 'consumption-p';
         text2.innerHTML = comments[comments.length - 1].numb;
         allConsumption.insertBefore(text2, allConsumption.children[1]);

     } else {
         let newText = document.querySelector('.consumption-p');
		 let result = allAmount('consumption');
         newText.textContent = result;
    }
     AddCountedBalance();
 }


 function AddCountedBalance() {
     let newBalance;
	 let result1 = allAmount('income');
	 if(result1 == null){
		result1 = 0;
	 }
	 let result2 = allAmount('consumption');
	 if(result2 == null){
		result2 = 0;
	 }

	 
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
 function ondeleteBtnClick(e) {
var arrayElem = [];

 function deleteItemFromIncome(e) {
	let h = e.target;
	let id = h.id;

	for (var i = 0; i < comments.length; i++){
		if(id == comments[i].id){
			let index = comments.indexOf(comments[i])
			comments.splice(index, 1);
		}
	}

 function deleteItem(e) {
	let h = e.target;
	
	let arrElems =  document.querySelectorAll('.delete');
	let g;
	for (var i = 0; i < arrElems.length; i++){
		arrayElem.push(arrElems[i]);
		g = arrayElem.indexOf(e.target);
	}
	arrayElem.splice(g, 1);
	comments.splice(g, 1);


    const listItem = this.parentNode;
    let list = listItem.parentNode;
    list.removeChild(listItem);

	if(listItem.className == 'income'){
		newAmountInAllIncome();

	}else if(listItem.className == 'consumption'){
		newAmountInAllConsumption();
	}
	AddCountedBalance();
}
////////////////change Item/////////////////
 function OnChangeBtnClick(e) {
	let h = e.target;
	let id = h.id;
	
     const listItem = this.parentNode;
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
	if(listItem.className == 'income'){
		newAmountInAllIncome();
	}else if(listItem.className == 'consumption'){
		newAmountInAllConsumption();
	}
	 AddCountedBalance();
 }
/////////////////////////////////////////////////////////////////////////////////

function newAmountInAllIncome() {
	let p = document.querySelector('.income-p');
	let result = allAmount('income');
	p.innerHTML = result;
}

function newAmountInAllConsumption() {
	let p = document.querySelector('.consumption-p');
	let result = allAmount('consumption');
	p.innerHTML = result;
}

function allAmount(l) {
	let value = l;
	let amount = 0;
	if(value == 'income') {
		
		for(let i = 0; i < comments.length; i++){
			if(comments[i].type == 'income'){
				amount += Number(comments[i].numb);
			}
		}
	}else if(value == 'consumption') {
		for(let i = 0; i < comments.length; i++){
			if(comments[i].type == 'consumption'){
				amount += Number(comments[i].numb);
			}
		}
	}	
	return amount;

}

//  function changeArray(editInput){
//     const j = editInput.value;
//     const l = listItem.querySelector('.textfield');
//     let h = l.value;
//     // this.textfield = 
//     comments.forEach(function (comment) {
//       if (comment.numb == '1') {
//         comment.numb = 666;
//       }    
// });
// }
// changeArray();





