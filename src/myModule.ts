// THIS IS A MODULE!

export const helloWorld: string = "Drag and Drop Spiel";

export class Beispiel extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "<h1>Drag amd Drop Spiel</h1>";
  }
}
