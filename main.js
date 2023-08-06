let types = document.getElementById("sideMenuTypes");
let categories = document.getElementById("mainContainerCatrgories");

const checkBox = document.getElementById("checkbox");

let lastFilteredType = null;


fetch("https://api-eko-bazarek.azurewebsites.net/api/products/types")
  .then(response => response.json())
  .then(productsTypesArray => {
    productsTypesArray.sort((type1, type2) => type1.name.localeCompare(type2.name));
    let sideMenulistHTML = "";
    for (var i = 0; i < productsTypesArray.length; i++) {
      sideMenulistHTML += `<div class="sideMenuCard" id="${productsTypesArray[i].id}" onclick="categoryFilter('${productsTypesArray[i].id}')">
                  <div class ="productType">${productsTypesArray[i].name}</div>
                  </div>`;
    }
    types.innerHTML = sideMenulistHTML;
  })

displayAllCategories();


function  categoryFilter(id) {
  checkBox.checked = false;


  fetch("https://api-eko-bazarek.azurewebsites.net/api/products/categories")
  .then(response => response.json())
  .then(productCategoriesArray => {
    productCategoriesArray.sort((type1, type2) => type1.name.localeCompare(type2.name));
    let listHTMLCategory = "";
    if(lastFilteredType == null || lastFilteredType != id) {
    for (var i = 0; i < productCategoriesArray.length; i++) {
        if(productCategoriesArray[i].type == id) {
          listHTMLCategory += `<div class="mainContainerCard" >
                    <img src="${productCategoriesArray[i].iconUrl}" alt="${productCategoriesArray[i].name}" class="categoryIcon">
                    <div class ="productCategory">${productCategoriesArray[i].name}</div>
                    </div>`;
        }
      }
      if(lastFilteredType != id && lastFilteredType != null) {
        document.getElementById(lastFilteredType).classList.remove('active');
    } 
    document.getElementById(id).classList.add('active');
    
      lastFilteredType = id;
    }
      else {
        for (var i = 0; i < productCategoriesArray.length; i++) {
            listHTMLCategory += `<div class="mainContainerCard" >
                      <img src="${productCategoriesArray[i].iconUrl}" alt="${productCategoriesArray[i].name}" class="categoryIcon">
                      <div class ="productCategory">${productCategoriesArray[i].name}</div>
                      </div>`;
        }
        document.getElementById(id).classList.remove('active');

        lastFilteredType = null;
      }
    
      

    return categories.innerHTML = listHTMLCategory;
  })
}


checkBox.addEventListener('change', function() {
  if(lastFilteredType != null) {
    document.getElementById(lastFilteredType).classList.remove('active');
    lastFilteredType = null
  }
  if(this.checked) {
    fetch("https://api-eko-bazarek.azurewebsites.net/api/products/categories")
  .then(response => response.json())
  .then(productCategoriesArray => {
    productCategoriesArray.sort((type1, type2) => type1.name.localeCompare(type2.name));
    let vegeArrayTypesId = ["FRUITS", "VEGETABLE", "HONEY","WINE_AND_SPIRITS","CEREALS", "OTHER"];
    let listHTMLCategory = "";
    for (var i = 0; i < productCategoriesArray.length; i++) {
      if(vegeArrayTypesId.includes(productCategoriesArray[i].type)) {
        listHTMLCategory += `<div class="mainContainerCard" >
                    <img src="${productCategoriesArray[i].iconUrl}" alt="${productCategoriesArray[i].name}" class="categoryIcon">
                    <div class ="productCategory">${productCategoriesArray[i].name}</div>
                    </div>`;
      }
    }

    categories.innerHTML = listHTMLCategory;
  })
  } else {
    displayAllCategories()
  }

});


function displayAllCategories() {
  fetch("https://api-eko-bazarek.azurewebsites.net/api/products/categories")
  .then(response => response.json())
  .then(productCategoriesArray => {
    productCategoriesArray.sort((type1, type2) => type1.name.localeCompare(type2.name));
    let listHTMLCategory = "";
    for (var i = 0; i < productCategoriesArray.length; i++) {
      listHTMLCategory += `<div class="mainContainerCard" >
                  <img src="${productCategoriesArray[i].iconUrl}" alt="${productCategoriesArray[i].name}" class="categoryIcon">
                  <div class ="productCategory">${productCategoriesArray[i].name}</div>
                  </div>`;
    }

    categories.innerHTML = listHTMLCategory;
  })
}

