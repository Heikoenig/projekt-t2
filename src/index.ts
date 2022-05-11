import { alertMe } from "./myOtherModule";
import { countrysize } from "./countrylist";
import { createList } from "./myModule";

let listItems: HTMLElement[] = [];

const check = document.getElementById("check") as HTMLButtonElement;

let dragStartIndex: number = 0;

alertMe();

const myInputValue = document.querySelector<HTMLInputElement>("#myInput");

const myInputValueAlternate = document.querySelector(
  "#myInput"
) as HTMLInputElement;

document
  .querySelector<HTMLInputElement>("#myInput")
  ?.addEventListener("focus", doSmth);

function doSmth(e: UIEvent) {
  const val = e.target as HTMLInputElement;
  console.log(e, val.value);
}

const dragStart = (e: Event, item: Element): void => {
  const index = item.closest("li")!.getAttribute("data-index");
  dragStartIndex = index ? +index : dragStartIndex;
};

const dragEnter = (e: Event, item: Element): void => {
  item.classList.add("over");
};

const dragOver = (e: Event): void => {
  e.preventDefault();
};

const dragLeave = (e: Event, item: Element): void => {
  item.classList.remove("over");
};

const dragDrop = (e: Event, item: Element): void => {
  const index = item.getAttribute("data-index");
  const dragEndIndex = index ? +index : 0;
  swapItems(dragStartIndex, dragEndIndex);
  item.classList.remove("over");
};

const addEventListeners = (): void => {
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

(async () => {
  listItems = await createList(countrysize);
  addEventListeners();
})();

const swapItems = (fromIndex: number, toIndex: number) => {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo as Node);
  listItems[toIndex].appendChild(itemOne as Node);
};

const checkOrder = (): void => {
  listItems.forEach((listItem, index) => {
    const countryName = listItem.querySelector(".country-name")!.innerHTML;
    if (countryName !== countrysize[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
};

check.addEventListener("click", checkOrder);

