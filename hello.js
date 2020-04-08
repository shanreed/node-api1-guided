// process.argv allows us to use parameters passed to the CLI app.
// so calling `node hello.js Jason` would result in name === "Jason"
const name = process.argv[2] || "World"

console.log(`Hello, ${name}`)
//in terminal run: node hello.js