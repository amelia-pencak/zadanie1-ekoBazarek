let types = document.getElementById("sideMenuTypes");
let categories = document.getElementById("mainContainerCatrgories");

const checkBox = document.getElementById("checkbox");
let productsTypesArray = [];
let productCategoriesArray = [];

let lastFilteredType = null;

async function renderDataFromApi() {
  const typesRespons = await fetch("https://api-eko-bazarek.azurewebsites.net/api/products/types");
  productsTypesArray = await typesRespons.json();

  const categoriesRespons = await fetch("https://api-eko-bazarek.azurewebsites.net/api/products/categories");
  productCategoriesArray = await categoriesRespons.json();

  displayAllTypes();
  displayAllCategories();

}

checkBox.addEventListener('change', function() {
  if(lastFilteredType) {
    document.getElementById(lastFilteredType).classList.remove('active');
    lastFilteredType = null
  }
  this.checked ? filterVegeCategories() : displayAllCategories(); //if checked display only vege categories else display all categories
});


function filterVegeCategories() {
  productCategoriesArray.sort((type1, type2) => type1.name.localeCompare(type2.name));
  let vegeArrayTypesId = ["FRUITS", "VEGETABLE", "HONEY","WINE_AND_SPIRITS","CEREALS", "OTHER"];
    let listHTMLCategory = "";
    for (var i = 0; i < productCategoriesArray.length; i++) {
      if(vegeArrayTypesId.includes(productCategoriesArray[i].type)) {
        listHTMLCategory += dispalyCategoryCard(i);
      }
    }
    categories.innerHTML = listHTMLCategory;
}


function displayAllTypes() {
  
  productsTypesArray.sort((type1, type2) => type1.name.localeCompare(type2.name));
  let sideMenulistHTML = "";
    for (var i = 0; i < productsTypesArray.length; i++) {
      sideMenulistHTML += `<div class="sideMenuCard" id="${productsTypesArray[i].id}" >
                  <div class ="productType">${productsTypesArray[i].name}</div>
                  </div>`;
    }

  // let sideMenulistHTML = productsTypesArray.map(function(type) {
  //     return `<div class="sideMenuCard" id="${type.id}">
  //                 <div class ="productType">${type.name}</div>
  //             </div>`;
  // })
  // .join('');
  
  types.innerHTML = sideMenulistHTML;

  document.querySelectorAll('.sideMenuCard').forEach(card => {
    card.addEventListener('click', function() {
        categoryFilter(card.id);
    });
});
}

function  categoryFilter(id) {
  checkBox.checked = false;
  productCategoriesArray.sort((type1, type2) => type1.name.localeCompare(type2.name));
  let listHTMLCategory = "";
  if(lastFilteredType == null || lastFilteredType != id) {
  for (var i = 0; i < productCategoriesArray.length; i++) {
      if(productCategoriesArray[i].type == id) {
        listHTMLCategory += dispalyCategoryCard(i);
      }
    }
    if(lastFilteredType != id && lastFilteredType) {
      document.getElementById(lastFilteredType).classList.remove('active');
    } 
    document.getElementById(id).classList.add('active');
    lastFilteredType = id;
  }
  else {
    for (var i = 0; i < productCategoriesArray.length; i++) {
        listHTMLCategory += dispalyCategoryCard(i);
    }
    document.getElementById(id).classList.remove('active');
    lastFilteredType = null;
  }
  return categories.innerHTML = listHTMLCategory;
}

function dispalyCategoryCard(i) {
  return `<div class="mainContainerCard" >
                      <img src="${productCategoriesArray[i].iconUrl}" alt="${productCategoriesArray[i].name}" class="categoryIcon">
                      <div class ="productCategory">${productCategoriesArray[i].name}</div>
                      </div>`;
}

function displayAllCategories() {
    productCategoriesArray.sort((type1, type2) => type1.name.localeCompare(type2.name));
    let listHTMLCategory = "";
    for (var i = 0; i < productCategoriesArray.length; i++) {
      listHTMLCategory += dispalyCategoryCard(i);
    }
    categories.innerHTML = listHTMLCategory;
    addClickListenerToCategory();
}

function addClickListenerToCategory() {
  const categoriesElements = document.querySelectorAll('.mainContainerCard');
  categoriesElements.forEach(category => {
    category.addEventListener('click', function() {
       fetchCategoryDetails();
    });
  });
}

async function fetchCategoryDetails() {
  try {
    const response = await fetch(`https://api-eko-bazarek.azurewebsites.net/api/products/01d5e2a0-1b34-4644-8205-506130e03b75`);
    const categoryData = await response.json();
    console.log(categoryData);
    alert(`Wybrano kategorię: ${categoryData.id}`);
  } catch (error) {
    console.error("Error fetching category details:", error);
  }
}


renderDataFromApi();