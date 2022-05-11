import { alertMe } from "./myOtherModule";
import { countrysize } from "./countrylist";


console.log(helloWorld);
customElements.define("my-beispiel", Beispiel);

console.log(draggable_list);

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

