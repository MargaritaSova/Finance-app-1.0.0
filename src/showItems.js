function showItems(listItem, comment1) {
    if (comment1.type == 'income') {
        listItem.className += 'income';
        let incomeEl = document.getElementById('incomeCont');
        incomeEl.insertBefore(listItem, incomeEl.children[0]);
    } else if (comment1.type == 'consumption') {
        listItem.className += 'consumption';
        let consumptionEl = document.getElementById('consumptionCont');
        consumptionEl.insertBefore(listItem, consumptionEl.children[0]);
    }
}

export default showItems;