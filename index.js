const store = [];
var items = 0;
var totalCost = 0;
var totalTax = 0;


const addItem = document.getElementById("add-item");
const form = document.getElementById("form");
const bill = document.getElementById("bill");
const addMore = document.getElementById("add-more");

const calculateTax = (cost, input) => {
    var importTax = 0;
    if (input.match(/imported/i)) {
        importTax = 5;
    }
    var salesTax = 10;
    if (input.match(/book/i) || input.match(/pill/i) || input.match(/choco/i)) {
        salesTax = 0;
    }
    var productTax = importTax + salesTax;
    var productCost = (cost * (1 + (productTax) / 100))
    return productCost;

}

const formatNumber = (number) =>{
    let num = Math.round(number*100);
    if(num%5>=1){
        num+=5-num%5;
    }else{
        num-=num%5;
    }
    return num/100;
}



addItem.addEventListener("click", () => {
    items++;
    const input = document.getElementById("input");
    const value = input.value.trim();
    let inputArr = value.split(" ");

    if (inputArr.length < 4) {
        window.alert("Please Insert a Valid input");
        return ;
    }

    if (Number.isNaN(Number(inputArr[0]))) {
        window.alert("Unit should be written at first and in Number Format");
        return ;
    }

    if (Number.isNaN(Number(inputArr[inputArr.length - 1]))) {
        window.alert("Price should be written at Last and in Number Format");
        return;
    }


    let unit = inputArr[0];
    let product = "";
    for (let i = 1; i < inputArr.length - 2; i++) {
        product += inputArr[i] + " ";
    }
    let cost = formatNumber(Number(inputArr[inputArr.length - 1]));
    let productCost = formatNumber(calculateTax(cost, value));
    let tax = formatNumber(productCost - cost);

    totalCost += productCost;
    totalTax += tax;
    let detail = {
        id: items,
        unit: unit,
        product: product.trim(),
        cost: cost,
        tax: tax,
        productCost: productCost,

    }
    const div = document.createElement("div");
    div.innerHTML = value+" added";
    div.setAttribute('class','display');
    form.appendChild(div);

    store.push(detail);
    input.value = "";
    inputArr = [];
    product = "";
    cost = 0;
    detail = {};
    tax = 0;
    productCost = 0;
    unit =0;

})


const getBill = document.getElementById("get-bill");
getBill.addEventListener("click", (e) => {
    e.preventDefault();
    if (store.length == 0) {
        window.alert("Please Enter Some Input");
        return;
    }
    form.style.display = "none";
    bill.style.display = "block"
   
    const div = document.createElement("div");
    for(let i=0; i<store.length;i++){
        const div1 = document.createElement("div");
        div1.innerHTML = `<div class='output'>${store[i].unit} ${store[i].product}: ${store[i].productCost.toFixed(2)}</div>`
        div.appendChild(div1);
    }
    const div2 = document.createElement("div");
    div2.innerHTML = `<div class='output'>Sales Taxes: ${totalTax.toFixed(2)} </div> <div class='output'>Total: ${totalCost.toFixed(2)}</div>`
    div.appendChild(div2);
    document.getElementById('bill-output').appendChild(div);

})

document.getElementById('print').addEventListener("click", ()=>{
    window.print();
})

document.getElementById('add-more').addEventListener('click',()=>{
    form.style.display= 'block';
    bill.style.display = 'none';
    document.getElementById('bill-output').innerHTML=''
})

document.getElementById('get-new').addEventListener('click', ()=>{
    let flag = window.confirm("New Bill will earse old data");
    
    if(flag){
    window.location.reload();
}

})
