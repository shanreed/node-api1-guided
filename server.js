const express = require("express")
const db = require('./database.js')


const server = express() //enables routing

// this is middleware that allows express
// to parse JSON request bodies. We'll talk about this more later.
server.use(express.json())

server.get("/", (req, res) => {
	res.json({ message: "hello, world" })
})

server.get("/lambda", (req, res) => {
	// this will automatically return all the required response headers
	// and status code for a proper HTTP redirect
	res.redirect("https://lambdaschool.com")
})

server.get("/users", (req, res) => {
	// this is simulating a real database call
	const users = db.getUsers();
	res.json(users)
})

server.get("/users/:id", (req, res) => {
	// our route params come into variables with the same name as the param.
	// so :id === req.params.id
	// pull the ID value from the URL
	const userId = req.params.id
	// find the specific user from our fake database with that ID
	const user = db.getUserById(userId)

	// a user was found with that ID
	if (user) {
		// return the data to the client
		res.json(user)
	// no user was found with that ID
	} else {
		// return an error to the client
		res.status(404).json({ message: "User not found" })
	}
})

server.post("/users", (req, res) => {
	// // create a new fake user
	// const newUser = db.createUser ({
	// 	name: "Shannon",
	// })
	//or
	if(!req.body.name) {
		return res.status(400).json({message: "Need a user name!"})
	}
	const newUser =db.createUser({name: req.body.name})
	// 201 means success and a resource was created
	res.status(201).json(newUser)
})

server.put("/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id)
	if (user) {
		// use a fallback value if no name is specified, so it doesn't empty the field ????
		const updatedUser = db.updateUser(user.id, {name: req.body.name || user.name})
		res.json(updatedUser)
	}else{
		res.status(404).json({message: "User not found"})
	}


})

server.delete("/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id)
	if (user) {
		db.deleteUser(user.id)
		res.status(200).json({message: "User has been deleted"})
	}else{
		res.status(404).json({message: "User not found"})
	}
})

const port = 8080

// start the server on localhost at port 8080
server.listen(port, () => {
	console.log(`server started at http://localhost:${port}`)
})