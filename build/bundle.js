(function () {
    'use strict';

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function alertMe() {
        alert("SPIELREGELN - Ordne die Länder nach ihrer Größe - Clicke auf den Button, um die Reihenfolge zu kontrollieren - Grün= Richtig - Rot=Falsch");
    }

    const countrysize = [
        "Russland",
        "China",
        "USA",
        "Kasachstan",
        "Südafrika",
        "Frankreich",
        "Deutschland",
        "Polen",
        "Island",
        "Malta",
    ];

    const createList = (countrysize) => __awaiter(void 0, void 0, void 0, function* () {
        const listItems = [];
        const listCreator = new Promise((resolve, reject) => {
            try {
                countrysize
                    .map((a) => ({ value: a, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map((a) => a.value)
                    .forEach((country, index) => {
                    const listItem = document.createElement("li");
                    listItem.setAttribute("data-index", index.toString());
                    listItem.innerHTML = `
        <span class="number">${index + 1}</span>
          <div class="draggable" draggable="true">
          <p class="country-name">${country}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
                    listItems.push(listItem);
                    const draggable_list = document.getElementById("draggable-list");
                    draggable_list.appendChild(listItem);
                });
            }
            catch (error) {
                reject(error);
            }
            resolve(true);
        });
        yield listCreator;
        return listItems;
    });

    var _a;
    let listItems = [];
    const check = document.getElementById("check");
    let dragStartIndex = 0;
    alertMe();
    document.querySelector("#myInput");
    document.querySelector("#myInput");
    (_a = document
        .querySelector("#myInput")) === null || _a === void 0 ? void 0 : _a.addEventListener("focus", doSmth);
    function doSmth(e) {
        const val = e.target;
        console.log(e, val.value);
    }
    const dragStart = (e, item) => {
        const index = item.closest("li").getAttribute("data-index");
        dragStartIndex = index ? +index : dragStartIndex;
    };
    const dragEnter = (e, item) => {
        item.classList.add("over");
    };
    const dragOver = (e) => {
        e.preventDefault();
    };
    const dragLeave = (e, item) => {
        item.classList.remove("over");
    };
    const dragDrop = (e, item) => {
        const index = item.getAttribute("data-index");
        const dragEndIndex = index ? +index : 0;
        swapItems(dragStartIndex, dragEndIndex);
        item.classList.remove("over");
    };
    const addEventListeners = () => {
        const draggables = document.querySelectorAll(".draggable");
        const dragListItems = document.querySelectorAll(".draggable-list li");
        draggables.forEach((draggable) => {
            draggable.addEventListener("dragstart", (e) => dragStart(e, draggable));
        });
        dragListItems.forEach((item) => {
            item.addEventListener("dragover", dragOver);
            item.addEventListener("drop", (e) => dragDrop(e, item));
            item.addEventListener("dragenter", (e) => dragEnter(e, item));
            item.addEventListener("dragleave", (e) => dragLeave(e, item));
        });
    };
    (() => __awaiter(void 0, void 0, void 0, function* () {
        listItems = yield createList(countrysize);
        addEventListeners();
    }))();
    const swapItems = (fromIndex, toIndex) => {
        const itemOne = listItems[fromIndex].querySelector(".draggable");
        const itemTwo = listItems[toIndex].querySelector(".draggable");
        listItems[fromIndex].appendChild(itemTwo);
        listItems[toIndex].appendChild(itemOne);
    };
    const checkOrder = () => {
        listItems.forEach((listItem, index) => {
            const countryName = listItem.querySelector(".country-name").innerHTML;
            if (countryName !== countrysize[index]) {
                listItem.classList.add("wrong");
            }
            else {
                listItem.classList.remove("wrong");
                listItem.classList.add("right");
            }
        });
    };
    check.addEventListener("click", checkOrder);

})();
