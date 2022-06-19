const bill = document.querySelector("#bill");
const btns = document.querySelectorAll(".btn");
let billValue = 0;
let btnValue = 0;
let peopleValue = 0;
let totalPerPerson = 0;
const tipPerPersonSpan = document.querySelector(".tip-person");
let tipPerPerson;
let tipTotal;

truncateDecimals = function (number, digits) {
   var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

   return truncatedNum / multiplier;
};

let calcTip = (bill, percent, nbPeople) => {
   tipPerPerson = truncateDecimals((bill * percent) / 100 / nbPeople, 2);
   totalPerPerson = truncateDecimals(
      (bill + (bill * percent) / 100) / nbPeople,
      2
   );
   tipPerPersonSpan.innerHTML = `$${tipPerPerson}`;
   document.querySelector('.total-tip').innerHTML = `$${totalPerPerson}`
};

bill.addEventListener("input", (e) => {
   billValue = parseFloat(e.target.value);
});

btns.forEach((btn) => {
   btn.addEventListener("click", (e) => {
      btnValue = e.target.value;
      if (peopleValue === 0) {
         document.querySelector(".error-text").style.visibility = "visible";
         document.querySelector("#people").classList.add("people-error");
      } else {
         calcTip(billValue, btnValue, peopleValue);
      }
   });
});

document.querySelector("#people").addEventListener("input", (e) => {
   peopleValue = parseFloat(e.target.value);
   document.querySelector("#people").classList.remove("people-error");
   document.querySelector(".error-text").style.visibility = "hidden";
   calcTip(billValue, btnValue, peopleValue);
});

document.querySelector("#percent").addEventListener("input", (e) => {
   btnValue = e.target.value;
});

btns.forEach((btn) => {
   btn.addEventListener("onclick", () => {
      btn.classList.add("btn-active");
   });
});

document.querySelector(".reset").addEventListener("click", () => {
   bill.value = 0;
   document.querySelector("#people").value = 0;
   document.querySelector("#percent").value = 0;
   billValue = 0;
   btnValue = 0;
   peopleValue = 0;
   tipPerPerson = 0;
   tipTotal = 0;
});
