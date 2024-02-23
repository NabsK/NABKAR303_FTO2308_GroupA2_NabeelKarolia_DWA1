const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

// Use forEach to console.log each product name to the console.
products.forEach((fruit) => {
  console.log(fruit.product);
});

console.log("------------------");

// Use filter to filter out products that have a name longer than 5 characters
const filteredProducts = products.filter((item) => item.product.length <= 5);
console.log(filteredProducts);

console.log("------------------");

// Using both filter and map. Convert all prices that are strings to numbers, and remove all products from the array that do not have prices. After this has been done then use reduce to calculate the combined price of all remaining products.
const updatedProducts = products.map((product) => {
  if (typeof product.price === "string") {
    product.price = parseFloat(product.price);
  }
  return product;
});

const filterProducts = updatedProducts.filter((product) => !isNaN(product.price));
const total = filterProducts.reduce((sum, product) => sum + product.price, 0);
console.log(total);

console.log("------------------");

// Use reduce to concatenate all product names to create the following string: banana, mango, potato, avocado, coffee and tea.
const productNames = products.reduce((names, product, index) => {
  if (index !== products.length - 1) {
    return names + product.product + ", ";
  } else {
    return names + "and " + product.product;
  }
}, "");
console.log(productNames);

console.log("------------------");

// Use reduce to calculate both the highest and lowest-priced items. The names should be returned as the following string: Highest: coffee. Lowest: banana.
const newProducts = products.map((product) => {
  if (typeof product.price === "string") {
    product.price = parseFloat(product.price);
  }
  return product;
});

// Use reduce to calculate both the highest and lowest-priced items
const result = newProducts.reduce(
  (acc, product) => {
    if (product.price > acc.maxPrice) {
      acc.maxPrice = product.price;
      acc.maxProduct = product.product;
    }
    if (product.price < acc.minPrice) {
      acc.minPrice = product.price;
      acc.minProduct = product.product;
    }
    return acc;
  },
  { maxPrice: -Infinity, minPrice: Infinity, maxProduct: "", minProduct: "" }
);

console.log(`Highest: ${result.maxProduct}. Lowest: ${result.minProduct}.`);

console.log("------------------");

// Using only Object.entries and reduce recreate the object with the exact same values
const newArray = products.map((product) => {
  return Object.entries(product).reduce((newProduct, [key, value]) => {
    if (key === "product") {
      newProduct["name"] = value;
    } else if (key === "price") {
      newProduct["cost"] = value;
    }
    return newProduct;
  }, {});
});

console.log(newArray);
