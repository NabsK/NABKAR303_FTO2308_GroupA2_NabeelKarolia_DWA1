const provinces = ["Western Cape", "Gauteng", "Northern Cape", "Eastern Cape", "KwaZulu-Natal", "Free State"];
const names = ["Ashwin", "Sibongile", "Jan-Hendrik", "Sifso", "Shailen", "Frikkie"];

//Use forEach to console log each name to the console. You are allowed to call console.log seven times
names.forEach((people) => console.log(people));

console.log("--------------------------------");

// Use forEach to console log each name with a matching province (for example Ashwin (Western Cape). Note that you are only allowed to call console.log seven times
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

console.log("--------------------------------");

// Using map loop over all province names and turn the string to all uppercase. Log the new array to the console.
const uppercaseProvinces = provinces.map((word) => word.toUpperCase());
console.log(uppercaseProvinces);

console.log("--------------------------------");

// Create a new array with map that has the amount of characters in each name. The result should be: [6, 9, 11, 5, 7, 7]
const nameLength = names.map((name) => name.length);
console.log(nameLength);

console.log("--------------------------------");

// Using toSorted to sort all provinces alphabetically.
provinces.sort();
console.log(provinces);

console.log("--------------------------------");

// Use filter to remove all provinces that have the word Cape in them. After filtering the array, return the amount of provinces left. The final value should be 3
const filterProvinces = provinces.filter((province) => !province.includes("Cape"));
const remainingProvinces = filterProvinces.length;
console.log(remainingProvinces);

console.log("--------------------------------");

// Create a boolean array by using map and some to determine whether a name contains an S character. The result should be [true, true, false, true, true, false]
const containsS = names.map((name) => name.split("").some((element) => element.toLowerCase() === "s"));
console.log(containsS);

console.log("--------------------------------");

// Using only reduce, turn the above into an object that indicates the province of an individual
function createProvinceObject(resultCollector, currentProvince, index) {
  resultCollector[currentProvince] = provinces[index];
  return resultCollector;
}
const provinceObject = names.reduce(createProvinceObject, {});
console.log(provinceObject);
