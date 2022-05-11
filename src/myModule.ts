export const createList = async (
  countrysize: string[]
): Promise<HTMLElement[]> => {
  const listItems: HTMLElement[] = [];

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
          const draggable_list = document.getElementById(
            "draggable-list"
          ) as HTMLUListElement;
          draggable_list.appendChild(listItem);
        });
    } catch (error) {
      reject(error);
    }
    resolve(true);
  });

  await listCreator;

  return listItems;
};
      