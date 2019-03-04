//find elements
let number1Input = document.getElementById('money');
let description = document.getElementById("comment");
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

    // ñ null íàäî îñòîðîæíî â íåðàâåíñòâàõ,
    // ò.ê. íàïðèìåð null >= '0' => true
    // íà âñÿêèé ñëó÷àé ëó÷øå âûíåñòè ïðîâåðêó chr == null îòäåëüíî
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
        return String.fromCharCode(event.which) // îñòàëüíûå
    }

    return null; // ñïåöèàëüíàÿ êëàâèøà
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
function onAddClick() {
    let li = document.createElement('li');
    let changeBtn = document.createElement('button'); 
    let deleteBtn = document.createElement('button');
    let text = document.createElement('label');
    let textfield = document.createElement('input');
    let comment = document.createElement('p');
    let date = document.createElement('p');

    changeBtn.className += "change";
    deleteBtn.className +="delete";
    comment.className += "description";
    textfield.className +="textfield";  

    changeBtn.innerHTML = "change";
    deleteBtn.innerHTML = "delete";
    text.innerHTML = number1Input.value;
    comment.innerHTML = description.value;
    date.innerHTML = dateEl.value;


    if (income.checked) {
         li.id = "income";
         text.className += "income-amount";
                
         incomeEl.insertBefore(li, incomeEl.children[1]);    

         addAllIncome();
     } else if (consumption.checked) {
         li.className += "consumption"
         text.className += "consumption-amount";

         consumptionEl.insertBefore(li, consumptionEl.children[1]);

         addAllConsumption();
     } else {
         alert('you need chose')
     }

    li.appendChild(changeBtn);
    li.appendChild(deleteBtn);
    li.appendChild(text);
    li.appendChild(comment);
    li.appendChild(date);
    li.appendChild(textfield);

    deleteBtn.addEventListener('click', deleteItem);
    //changeBtn.addEventListener('click', changeItem);
	
     consumption.checked = false;
     income.checked = false;

     let comment1 = {
         numb: number1Input.value,
     }
     comments.push(comment1);

     money.value = '';
}
//////////////////////////////////////////////////////////////////////
 let sum;
 function addAllIncome() {
     if (allIncome.children.length < 2) {
         let text1 = document.createElement('p');
         text1.className += "income";
         text1.innerHTML = number1Input.value;
         sum = Number(text1.innerHTML);
         allIncome.insertBefore(text1, allIncome.children[1]);

     } else {
         let newText = document.querySelector('.income');
         sum += Number(number1Input.value);
         newText.textContent = sum;
     }
     // money.value = '';
     AddCountedBalance();

 }

 let sum2;
 function addAllConsumption() {
     if (allConsumption.children.length < 2) {
         let text2 = document.createElement('p');
         text2.className += "consumption";
         text2.innerHTML = number1Input.value;
         sum2 = Number(text2.innerHTML);
         allConsumption.insertBefore(text2, allConsumption.children[1]);

     } else {
         let newText = document.querySelector('.consumption');
         sum2 += Number(number1Input.value);
         newText.textContent = sum2;
    }
     // money.value = '';
     AddCountedBalance();
 }

 function AddCountedBalance() {
     let newBalance;

     if (sum == undefined) {
         sum = 0;
     } else if (sum2 == undefined) {
         sum2 = 0;
     }

     newBalance = sum - sum2;

     if (balance.children.length < 2) {
         let text3 = document.createElement('p');
         text3.className += "balance";
         text3.innerHTML = newBalance;
         balance.insertBefore(text3, balance.children[1]);
     } else {
         let newText = document.querySelector('.balance');
         newText.textContent = newBalance;
     }
 }
////////////////delete Item from two Array and li////////////////////////
var arrayElem = [];
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
}
////////////////change Item/////////////////
 function changeItem() {
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
     return editInput;
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



