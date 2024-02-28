document.addEventListener("DOMContentLoaded", function (event) {
  let searchBar = document.getElementById("searchBar");
  let searchButton = document.getElementById("searchBarButton");
  searchBar.style.pointerEvents = "all";
  searchButton.style.pointerEvents = "all";
});

function makeUpdateForm(pizzaData, toppingData) {
  let updateForm = document.createElement("form");
  Object.assign(updateForm, {
    method: "POST",
    action: pizzaData.pizza_id + "?_method=patch&id=" + pizzaData.pizza_id,
  });
  updateForm.setAttribute("id", "updateForm");
  let helperInput = document.createElement("input");
  Object.assign(helperInput, {
    type: "hidden",
    name: "_method",
    value: "patch",
  });
  updateForm.append(helperInput);
  let updateTitle = document.createElement("h1");
  updateTitle.innerHTML = `Update ${pizzaData.name}`;
  let updateName = document.createElement("input");
  Object.assign(updateName, {
    type: "text",
    placeholder: pizzaData.name,
    name: "name",
    required: true,
  });
  let toppingSelect = document.createElement("div");
  let selectOptions = toppingData;
  for (optionItem of selectOptions) {
    let option = document.createElement("input");
    option.type = "checkbox";
    option.name = optionItem.name;
    option.id = optionItem.name;
    let label = document.createElement("label");
    label.htmlFor = "id";
    label.appendChild(document.createTextNode(optionItem.name));
    toppingSelect.appendChild(label);
    toppingSelect.appendChild(option);
  }
  let updateWholePrice = document.createElement("input");
  updateWholePrice.type = "number";
  Object.assign(updateWholePrice, {
    placeholder: pizzaData.whole_price,
    name: "whole_price",
    step: ".01",
    required: true,
  });
  let updateSlicePrice = document.createElement("input");
  updateSlicePrice.type = "number";
  Object.assign(updateSlicePrice, {
    placeholder: pizzaData.slice_price,
    name: "slice_price",
    step: ".01",
    required: true,
  });
  let submitButton = document.createElement("button");
  Object.assign(submitButton, {
    name: "pizza_id",
    value: pizzaData.pizza_id,
    onclick: "this.form.submit()",
    textContent: "Submit",
  });
  let cancelButton = document.createElement("button");
  Object.assign(cancelButton, {
    textContent: "Cancel",
  });
  cancelButton.onclick = () => {
    updateForm.remove();
  };
  updateForm.append(
    updateTitle,
    updateName,
    toppingSelect,
    updateWholePrice,
    updateSlicePrice,
    submitButton,
    cancelButton
  );
  document.getElementsByTagName("main")[0].append(updateForm);
}

function makeNewPizzaForm(toppingData) {
  let newPizzaForm = document.createElement("form");
  Object.assign(newPizzaForm, {
    method: "POST",
    action: "/pizzas/",
  });
  newPizzaForm.setAttribute("id", "newPizzaForm");
  let newTitle = document.createElement("h1");
  newTitle.innerHTML = "Make a new Pizza";
  let newName = document.createElement("input");
  Object.assign(newName, {
    type: "text",
    placeholder: "Pizza name",
    name: "name",
    required: true,
  });
  let toppingSelect = document.createElement("div");
  let selectOptions = toppingData;
  for (optionItem of selectOptions) {
    let option = document.createElement("input");
    option.type = "checkbox";
    option.name = optionItem.name;
    option.id = optionItem.name;
    let label = document.createElement("label");
    label.htmlFor = "id";
    label.appendChild(document.createTextNode(optionItem.name));
    toppingSelect.appendChild(label);
    toppingSelect.appendChild(option);
  }
  let newWholePrice = document.createElement("input");
  newWholePrice.type = "number";
  Object.assign(newWholePrice, {
    placeholder: "Whole Pizza Price",
    name: "whole_price",
    step: ".01",
    required: true,
  });
  let newSlicePrice = document.createElement("input");
  newSlicePrice.type = "number";
  Object.assign(newSlicePrice, {
    placeholder: "Single Slice Price",
    name: "slice_price",
    step: ".01",
    required: true,
  });
  let submitButton = document.createElement("button");
  Object.assign(submitButton, {
    type: "submit",
    textContent: "Submit",
  });
  let cancelButton = document.createElement("button");
  Object.assign(cancelButton, {
    textContent: "Cancel",
  });
  cancelButton.onclick = () => {
    newPizzaForm.remove();
  };
  newPizzaForm.append(
    newTitle,
    newName,
    toppingSelect,
    newWholePrice,
    newSlicePrice,
    submitButton,
    cancelButton
  );
  document.getElementsByTagName("main")[0].append(newPizzaForm);
}
