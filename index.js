const express = require('express')
const session = require('express-session')
const parser = require('body-parser')

const app = express()
const port = 80


var teams = {
	"Segfaulters":{name:"Segfaulters", members:["JT", "Dexton"], points:0}
}



var challenges = [
	{title:"Multiply two numbers", description:"Given two integers, a and b, find their product. Example a = 5, b = 3 5 * 3 = 15", points: 0, solvedBy:[], questions:{value:{a:0, b:2}},
	verifyer: challenge_one_verify, generator:challenge_one_generator}
]

function challenge_one_generator()
{
	return {a:2, b:1}
}

function challenge_one_verify(value, answer)
{
	var real = value.a*value.b
	return real == answer
}


app.use(session({secret:"xactware compete"})
app.use(bodyParser.json())

//Display the current rankings, and completed challenges
app.get('/', (req, res) => {
	res.send("test")
	res.end()
})

//display list of challenges
app.get('/challenges', (req, res) => {
	//If no team is currently chosen, prompt to select a team

})

//display challenge details
app.get('/challenge/:id', (req, res) => {

	var challenge = challenges[req.params.id]
	if (challenge == undefined)
	{
		//Challenge not found
		res.end()
	}

	var questions = req.session.questions
	if (questions == undefined)
	{
		//question no found. question represents the dataset
		questions = {}
		req.session.questions = questions
	}

	var question = questions[req.params.id]
	//Question has not been generated
	if (question == undefined)
	{
		question = challenge.generate()
		questions[req.param.id] = question
	}


})


//submit solution to  challenge
app.post('/challenge/:id/', (req, res) => {

	var question = session.questions[req.params.id]
	var challenge = challenges[req.params.id]

	if (challenge.verify(question, req.body))
	{
		challenge.solvedBy.add(req.session.name)
		teams[req.session.name].points += challenge.points
		res.end("true")
		return
	}

	res.end("false")
})


//Create a new team
app.post('/team/:name', (req, res) => {

	if (teams[req.params.name] != undefined)
	{
		res.end("Team already exists")
		return
	}

	teams.add({name:req.params.name, members:req.body, points:0})
	req.session.name = req.params.name
	res.end()
})


app.listen(port, () => console.log("server started"))
