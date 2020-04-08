// this "require" syntax is another way to "import" a third-party library
const fs = require("fs")

const dir = "my-files"
// this is going to make a directory on our local filesystem
fs.mkdirSync(dir)

for (let i=1; i<=100; i++) {
	// create a new file for every iteration of the loop
	fs.writeFileSync(`${dir}/${i}.txt`, `Hello from ${i}`)
}


//node create.js