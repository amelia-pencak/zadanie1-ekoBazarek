let typy = document.getElementById("typeCards");

    let products = [{ "id": "DAIRY", "name": "Nabiał" },
                   { "id": "FRUITS", "name": "Owoce" }, 
                   { "id": "VEGETABLE", "name": "Warzywa" }, 
                   { "id": "MEAT", "name": "Mięso" },
                    { "id": "FISHES", "name": "Ryby" }, 
                    { "id": "HONEY", "name": "Miody" }, 
                    { "id": "WINE_AND_SPIRITS", "name": "Alkohole" }, 
                    { "id": "COOKED_MEATS", "name": "Wędliny" },
                     { "id": "CEREALS", "name": "Zboża" }, 
                     { "id": "OTHER", "name": "Pozostałe" }]

    products.sort((type1, type2) => type1.name.localeCompare(type2.name));

    let listHTML = "";
    for (var i = 0; i < products.length; i++) {
      listHTML += `<div class="card">
                  <div class ="productName">${products[i].name}</div>
                  </div>`;
    }
    typy.innerHTML = listHTML;