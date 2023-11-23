//////////////////////////////////////////////
/// ELEMENTS

let themeSection = document.querySelector(".theme-container");
let variantSection = document.querySelector(".variant-section");
let variantContainer = document.querySelector(".variant-container");
let btnGenerate = document.querySelector(".btn-generate");
let btnAddAttribute = document.querySelectorAll(".btn-add-attribute");
let btnAddVariant = document.querySelector(".btn-add-variant");

let colorArr = [];
let sizeArr = [];
let brandArr = [];
let variantArr = [];

///////////////////////////
// DEMO FUNCTION

function demo() {
  colorArr = ["red", "blue", "black", "Orange"];
  sizeArr = ["Small", "Medium", "Large", "Extra Large"];
  brandArr = ["adidas", "puma"];
  listAttributes("color", colorArr);
  listAttributes("size", sizeArr);
  listAttributes("brand", brandArr);
}
demo();

/////////////////////////////////////////////////////
///////////////////////////////////////////////
// CLICK TO ADD ATTRIBUTES IN CURRENT ARRAY

btnAddAttribute.forEach((element) => {
  element.addEventListener("click", addAttributes);
});

function addAttributes() {
  let currentId = this.previousElementSibling.id;
  let value = this.previousElementSibling.value.split(",");
  let currentArr = getCurrentArr(currentId);

  if (value[0]) {
    for (let i = 0; i < value.length; i++) {
      if (!currentArr.includes(value[i])) {
        currentArr.push(value[i]);
      }
    }

    listAttributes(currentId, currentArr);
    document.getElementById(currentId).value = "";
  }
}

///////////////////////////////////////////
// LIST ATTRIBUTES IN ATTRIBUTE CONTAINER

function listAttributes(id, arr) {
  let values = "";
  arr.forEach((item, i) => {
    values += `<button onclick="removeAttributes(${id},${i})" class="btn btn-delete" style="background-color:${
      id == "color" ? item : "#6c757d"
    }">${item}<span>x</span></button>`;
  });

  document.querySelector(`.box-${id}`).innerHTML = values;
}

/////////////////////////////////////////////
// DELETE ATTRIBUTES...

function removeAttributes(el, i) {
  let currentArr = getCurrentArr(el.id);
  currentArr.splice(i, 1);
  listAttributes(el.id, currentArr);
}

//////////////////////////////////////////////
// CURRENT ARRAY BY ID ( ID-> COLOR ==> COLORARRAY[] )...

function getCurrentArr(id) {
  let currentArr;
  switch (id) {
    case "color":
      currentArr = colorArr;
      break;
    case "size":
      currentArr = sizeArr;
      break;
    case "brand":
      currentArr = brandArr;
      break;
  }
  return currentArr;
}

////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// CLICK TO GENERATE THE VARIaNTS...

btnGenerate.addEventListener("click", generateVariants);

function generateVariants() {
  variantArr = [];
  if (colorArr.length > 0 && sizeArr.length > 0 && brandArr.length > 0) {
    for (let i = 0; i < colorArr.length; i++) {
      for (let j = 0; j < sizeArr.length; j++) {
        for (let k = 0; k < brandArr.length; k++) {
          variantArr.push({
            brand: brandArr[k],
            color: colorArr[i],
            size: sizeArr[j],
          });
        }
      }
    }
    orderVariantsByBrand();
  } else if (colorArr.length > 0 && sizeArr.length > 0) {
    for (let i = 0; i < colorArr.length; i++) {
      for (let j = 0; j < sizeArr.length; j++) {
        variantArr.push({
          color: colorArr[i],
          size: sizeArr[j],
        });
      }
    }
  } else if (colorArr.length > 0 && brandArr.length > 0) {
    for (let i = 0; i < colorArr.length; i++) {
      for (let j = 0; j < brandArr.length; j++) {
        variantArr.push({
          color: colorArr[i],
          brand: brandArr[j],
        });
      }
    }
    orderVariantsByBrand();
  } else if (colorArr.length > 0) {
    for (let i = 0; i < colorArr.length; i++) {
      variantArr.push({
        color: colorArr[i],
      });
    }
  } else if (sizeArr.length > 0) {
    for (let i = 0; i < sizeArr.length; i++) {
      variantArr.push({
        size: sizeArr[i],
      });
    }
  } else {
    alert("Variants is Empty..");
    return;
  }
  listVariants();
}

////////////////////////////////////////////////
// ORDER VARIANTS BY BRAND NAME

function orderVariantsByBrand() {
  variantArr = brandArr
    .map((item) => variantArr.filter((val) => val["brand"] == item))
    .flat();

  //console.log(variantArr);
}

/////////////////////////////////
// CART TOGGLE (CONTAINER SHOW AND HIDE)

btnAddVariant.addEventListener("click", cartToggle);

function cartToggle() {
  themeSection.classList.toggle("hidden");
  variantSection.classList.toggle("hidden");
}

///////////////////////////////////////////////////
/////////////////////////////////////////////////
// LIST VARIANTS (CART ITEMS)

function listVariants() {
  cartToggle();
  variantContainer.innerHTML = "";
  let cartItems = "";
  variantArr.forEach((item, i) => {
    cartItems += `<div class="cart-box">
            <p>Brand: ${item.brand || "No Brand"} <span>${cartNumber(
      i + 1
    )}</span></p>
            <p>Size:  ${item.size || "No Size"} <span >${sizeIcon(
      item.size
    )}</span></p>
            <p>Color:  ${
              item.color || "No Color"
            } <span style="background-color:${item.color}"></span></p>
            </div>`;
  });
  variantContainer.innerHTML = cartItems;
}

//////////////////////////////////////////////
//  MAKE SIZE ICON ( SMALL => S, MEDIUM => M, LARGE => L )......

function sizeIcon(size) {
  if (size) {
    return size
      .toLowerCase()
      .split(" ")
      .map((val) => val[0])
      .join("")
      .toUpperCase()
      .replace("E", "X");
  } else {
    return "-";
  }
}

///////////////////////////////////////////
// CART NUMBER CHANGE TWO DIGIT ( 1 => 01 )..

function cartNumber(num) {
  return String(num).padStart("2", "0");
}
