import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

let appSetting = {
  databaseURL:
    "https://realtime-database-6858d-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

let app = initializeApp(appSetting);
let database = getDatabase(app);

let cartlocation = ref(database, "Cart");

let btnEl = document.getElementById("btn-el");
let inputEl = document.getElementById("input-el");
let ulEl = document.getElementById("ul-el");

btnEl.addEventListener("click", function () {
  push(cartlocation, inputEl.value);
});

onValue(cartlocation, function (snapshot) {
  if (snapshot.exists()) {
    ulEl.innerHTML = "";

    let items = Object.entries(snapshot.val());

    for (let i = 0; i < items.length; i++) {
      let newItem = document.createElement("li");

      // console.log(items[i][1]);

      newItem.innerHTML = items[i][1];

      newItem.addEventListener("click", function () {
        let exacthlocation = ref(database, `Cart/${items[i][0]}`);
        remove(exacthlocation);
      });
      ulEl.appendChild(newItem);
    }
  } else {
    ulEl.innerHTML = "Nothing added so far";
  }
});
