let tit = document.getElementById("title");
let pr = document.getElementById("Price");
let tx = document.getElementById("Taxes");
let adss = document.getElementById("Ads");
let dis = document.getElementById("Discount");
let total = document.getElementById("total");
let cont = document.getElementById("count");
let category = document.getElementById("Category");

let table = document.getElementsByTagName("table")[0];

let create = document.getElementById("create");

let parentSearch = document.getElementById("search");
let searchByTitle = document.getElementById("SBT");
let searchByCategory = document.getElementById("SBC");

function getTotal() {
  if (pr.value !== "") {
    let result = +pr.value + +tx.value + +adss.value - +dis.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}

pr.addEventListener("input", getTotal);
tx.addEventListener("input", getTotal);
adss.addEventListener("input", getTotal);
dis.addEventListener("input", getTotal);

// create prodect
let arrOfObj;
if (localStorage.prodect != null) {
  arrOfObj = JSON.parse(localStorage.getItem("prodect"));
} else {
  arrOfObj = [];
}

create.onclick = function () {
  let ob = {
    title: tit.value.toLowerCase(),
    price: pr.value,
    Taxes: tx.value,
    addess: adss.value,
    discount: dis.value,
    total: +total.innerHTML,
    category: category.value.toLowerCase(),
  };

  if (
    tit.value != "" &&
    pr.value != "" &&
    tx.value != "" &&
    adss.value != "" &&
    cont.value <= 100
  ) {
    if (create.innerHTML == "create") {
      for (let i = 0; i < cont.value; i++) {
        arrOfObj.push(ob);
      }
    } else {
      arrOfObj[tmp] = ob;
    }
  }
  //   arrOfObj.push(ob);

  //   save it in localStorage
  localStorage.setItem("prodect", JSON.stringify(arrOfObj));
  // call function when create button clicked make all inputs are cleared this function line 60
  clearInputs();
  //   call function when create button clicked make all input in html page line 75
  read();
  //   deleteItem();
};
//clear all input
function clearInputs() {
  tit.value = "";
  pr.value = "";
  tx.value = "";
  adss.value = "";
  dis.value = "";
  cont.value = "";
  category.value = "";
  total.innerHTML = "";
}

// read all objects and append it in table

function read() {
  let tablee = "";

  for (let i = 0; i < arrOfObj.length; i++) {
    tablee += `
        <tr>
            <td>${i + 1}</td>
            <td>${arrOfObj[i].title}</td>
            <td>${arrOfObj[i].price}</td>
            <td>${arrOfObj[i].Taxes}</td>
            <td>${arrOfObj[i].discount}</td>
            <td>${arrOfObj[i].total}</td>
            <td>${arrOfObj[i].category}</td>
            <td><button onclick="update(${i})" type="button">Upadate</button></td>
            <td><button onclick="deleteBtn(${i})" type="button">Delete</button></td>
        </tr>`;
  }

  document.getElementById("tbody").innerHTML = tablee;
}
read();

function deleteBtn(i) {
  arrOfObj.splice(i, 1);
  localStorage.prodect = JSON.stringify(arrOfObj);
  read();
}

// delet Button
let deleteAllBtn = document.getElementById("DA");
deleteAllBtn.append(` (${arrOfObj.length})`);
function deleteAll() {
  localStorage.clear();
}

deleteAllBtn.addEventListener("click", deleteAll);

// update function

function update(i) {
  tit.value = arrOfObj[i].title;
  pr.value = arrOfObj[i].price;
  tx.value = arrOfObj[i].Taxes;
  adss.value = arrOfObj[i].addess;
  dis.value = arrOfObj[i].discount;
  category.value = arrOfObj[i].category;
  getTotal();
  create.innerHTML = "Update";
  tmp = i;
  document.documentElement.scrollTop = 0;
  cont.style.display = "none";
}

let tmp;

let searchbar = "title";

function searchBy(id) {
  if (id == "SBT") {
    searchbar = "title";
    parentSearch.placeholder = searchByTitle.innerHTML;
  } else {
    searchbar = "Category";
    parentSearch.placeholder = searchByCategory.innerHTML;
  }

  parentSearch.focus();
}

function searchFoucs(value) {
  let tablee = "";
  if (searchbar == "title") {
    for (let i = 0; i < arrOfObj.length; i++) {
      if (arrOfObj[i].title.includes(value)) {
        tablee += `
        <tr>
            <td>${i + 1}</td>
            <td>${arrOfObj[i].title}</td>
            <td>${arrOfObj[i].price}</td>
            <td>${arrOfObj[i].Taxes}</td>
            <td>${arrOfObj[i].discount}</td>
            <td>${arrOfObj[i].total}</td>
            <td>${arrOfObj[i].category}</td>
            <td><button onclick="update(${i})" type="button">Upadate</button></td>
            <td><button onclick="deleteBtn(${i})" type="button">Delete</button></td>
        </tr>`;
      }
    }
  } else {
    for (let i = 0; i < arrOfObj.length; i++) {
      if (arrOfObj[i].category.includes(value)) {
        tablee += `
          <tr>
              <td>${i + 1}</td>
              <td>${arrOfObj[i].title}</td>
              <td>${arrOfObj[i].price}</td>
              <td>${arrOfObj[i].Taxes}</td>
              <td>${arrOfObj[i].discount}</td>
              <td>${arrOfObj[i].total}</td>
              <td>${arrOfObj[i].category}</td>
              <td><button onclick="update(${i})" type="button">Upadate</button></td>
              <td><button onclick="deleteBtn(${i})" type="button">Delete</button></td>
          </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = tablee;
}
