var productNameInp = document.getElementById("productNameInput")
var productPriceInput = document.getElementById("productPriceInput")
var productCategoryInput = document.getElementById("productCategoryInput")
var productDescInp = document.getElementById("productDescInput");
var productContainer;
var currentIndex;

if (localStorage.getItem("myProducts") == null) {
    productContainer = []; //zbon gded

}
else {
    productContainer = JSON.parse(localStorage.getItem("myProducts")); //3ndo 7gat fel local storage w (json.parse)34an hya btrg3 string
    displayProduct();
    //h-call el function bta3t 3ard el data 34an lma a3ml reload el 7agart elly mogoda abl kda tzhr mn 3'er m ydos 3al button
}
function addProduct() {

    var product = {
        name: productNameInp.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescInp.value

    }

    productContainer.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productContainer))
    displayProduct();
    clearForm()

}


function displayProduct() {
    var cartooona = "";
    for (let i = 0; i < productContainer.length; i++) {
        cartooona += `<tr><td>${productContainer[i].name}</td> <td>${productContainer[i].price}</td>
         <td>${productContainer[i].category}</td> <td>${productContainer[i].description}</td>
         <td><button class="btn btn-success" onclick="updateProduct(${i})">update</button></td><td><button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td></tr>`

    }
    document.getElementById("tableBody").innerHTML = cartooona;
    console.log(productContainer[0].description)
}

function clearForm() {
    productNameInp.value = "";
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescInp.value = '';

}
// hst2bl el this.value f parameter asmo term
function searchProduct(term) {
    var cartooona = "";
    document.getElementById("tableOfResults").style.display = "table"

    for (var i = 0; i < productContainer.length; i++) {
    //lw el array of objects elly gwaha el product elname bta3on = el term elly d5lt fel input wla la
    // ast5dmt includes bdl = fel if condition 34an hya method fel strings btsm7li ashof el klma elly b3dha mogoda fel name wla la
    //string.includes("ay klma")

        if (productContainer[i].name.includes(term.trim())) {
            cartooona += `<tr><td>${productContainer[i].name.replace(term, `<span class="termSpan">${term}</span>`)}</td>
             <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
             <td>${productContainer[i].description}</td>
             <td><button class="btn btn-success">update</button></td>
             <td><button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td></tr>`

        }

    }
    if (cartooona != "") {
        document.getElementById("tableBody").innerHTML = cartooona;
        document.getElementById("no_results").innerHTML = "";
        document.getElementById("tableOfResults").style.display = "table"
    }
    else {
        document.getElementById("no_results").innerHTML = `<p>there isn't any products matches '${term}'</p>`
        document.getElementById("tableOfResults").style.display = "none"
    }

}

function deleteProduct(index) {
debugger;

    
        productContainer.splice(index, 1)
        localStorage.setItem("myProducts", JSON.stringify(productContainer));
        displayProduct();
    
    // window.alert("the product has been deleted successfully") 

}



function updateProduct(index) {

    productNameInp.value = productContainer[index].name;
    productPriceInput.value = productContainer[index].price;
    productCategoryInput.value = productContainer[index].category;
    productDescInp.value = productContainer[index].description;
    document.getElementById("addOrUpdate").innerHTML = "update";
    currentIndex = index;

}
function saveUpdatedProduct() {
    debugger;
    var product = {
        name: productNameInp.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescInp.value

    }
    productContainer[currentIndex] = product;
    localStorage.setItem("myProducts", JSON.stringify(productContainer));
    displayProduct();
    clearForm();
    document.getElementById("addOrUpdate").innerHTML = "add product"

}

var mybutton = document.getElementById("addOrUpdate")
mybutton.addEventListener("click", function () {
    debugger;
    if (document.getElementById("addOrUpdate").innerHTML == "update") {
        saveUpdatedProduct()
    }
    else {
        addProduct()
    }

})

