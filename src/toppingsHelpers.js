document.addEventListener("DOMContentLoaded", function (event) {
  let searchBar = document.getElementById("searchBar");
  let searchButton = document.getElementById("searchBarButton");
  searchBar.style.pointerEvents = "all";
  searchButton.style.pointerEvents = "all";
});

function makeUpdateForm(data, url) {
  let updateForm = document.createElement("form");
  console.log(url);
  Object.assign(updateForm, {
    method: "POST",
    action: data.topping_id + "?_method=patch&id=" + data.topping_id,
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
  updateTitle.innerHTML = `Update ${data.name}`;
  let updateName = document.createElement("input");
  Object.assign(updateName, {
    type: "text",
    placeholder: data.name,
    name: "name",
    required: true,
  });
  let updateSelect = document.createElement("select");
  Object.assign(updateSelect, {
    placeholder: "Type",
    name: "type",
    required: true,
  });
  let selectOptions = ["vegetable", "meat"];
  for (optionItem of selectOptions) {
    var option = document.createElement("option");
    option.value = optionItem;
    option.text = optionItem;
    updateSelect.appendChild(option);
  }
  let updateServingSize = document.createElement("input");
  Object.assign(updateServingSize, {
    placeholder: "Serving Size",
    name: "serving_size",
    required: true,
  });
  let updatePrice = document.createElement("input");
  updatePrice.type = "number";
  Object.assign(updatePrice, {
    placeholder: data.price_per_serving,
    name: "price_per_serving",
    step: ".01",
    required: true,
  });
  let submitButton = document.createElement("button");
  Object.assign(submitButton, {
    name: "id",
    value: data.topping_id,
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
    updateSelect,
    updateServingSize,
    updatePrice,
    submitButton,
    cancelButton
  );
  document.getElementsByTagName("main")[0].append(updateForm);
}

function makeNewToppingForm() {
  let newToppingForm = document.createElement("form");
  Object.assign(newToppingForm, {
    method: "POST",
    action: "/toppings/",
  });
  newToppingForm.setAttribute("id", "newToppingForm");
  let newTitle = document.createElement("h1");
  newTitle.innerHTML = "Make a new Topping";
  let newName = document.createElement("input");
  Object.assign(newName, {
    type: "text",
    placeholder: "Topping name",
    name: "name",
    required: true,
  });
  let newSelect = document.createElement("select");
  Object.assign(newSelect, {
    placeholder: "Type",
    name: "type",
    required: true,
  });
  let selectOptions = ["vegetable", "meat"];
  for (optionItem of selectOptions) {
    var option = document.createElement("option");
    option.value = optionItem;
    option.text = optionItem;
    newSelect.appendChild(option);
  }
  let newServingSize = document.createElement("input");
  Object.assign(newServingSize, {
    placeholder: "Serving Size",
    name: "serving_size",
    required: true,
  });
  let newPrice = document.createElement("input");
  newPrice.type = "number";
  Object.assign(newPrice, {
    placeholder: "Price per serving",
    name: "price_per_serving",
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
    newToppingForm.remove();
  };
  newToppingForm.append(
    newTitle,
    newName,
    newSelect,
    newServingSize,
    newPrice,
    submitButton,
    cancelButton
  );
  document.getElementsByTagName("main")[0].append(newToppingForm);
}
