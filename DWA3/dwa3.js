// @ts-check

/**
 * @typedef {Object} User
 * @prop {string} name - The user's name.
 * @prop {number} age - The user's age.
 */

/**
 * @function getUser
 * @returns {User} The user object.
 */
function getUser() {
  return {
    name: "John",
    age: 30,
  };
}

// Using the custom type
const user = getUser(); // user is of type User
console.log(user.name); // Accessing properties with autocomplete support
console.log(user.age);
