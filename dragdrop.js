const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const countrysize = [
    'Russland',
    'China',
    'USA',
    'Kasachstan',
    'Südafrika',
    'Frankreich',
    'Deutschland',
    'Polen',
    'Island',
    'Malta'
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
    [...countrysize]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((country, index) => {
         // console.log(country);

         const listItem = document.createElement('li');

         listItem.setAttribute('data-index', index);

          listItem.innerHTML =`
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                 <p class="country-name">${country}</p>
                 <i class="fas fa-grip-lines"></i>
                </div>
            `;

         listItems.push(listItem);

         draggable_list.appendChild(listItem);
        });

    addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  // console.log(dragStartIndex);
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
   // console.log('Event: ', 'drop');
   const dragEndIndex = +this.getAttribute('data-index');
   swapItems(dragStartIndex, dragEndIndex);
   this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const countryName = listItem.querySelector('.draggable').innerText.trim();

    if(countryName !== countrysize[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click', checkOrder);