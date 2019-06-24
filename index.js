const express = require('express')
const session = require('express-session')
const parser = require('body-parser')
const pug = require('pug')

const challenges = require('./challenges.js')

const app = express()
const port = 80

//=======================================================
///TODO: Convertto mongo db
var teams = [
	{id:0, name:"Segfaulters", members:["JT", "Dexton"], points:0}
]

var challenge_solvers = {0 : ["SegFaulters", "duh"]}
//=======================================================

app.use(session({secret:"xactware compete"}))
app.use(parser.json())
app.use(parser.urlencoded({extended:true}))
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/js'))

//Display the current rankings, and challenges
app.get('/', (req, res) => {
	res.render('index', {teams:teams, challenges:challenges, solvers:challenge_solvers})
})

//display challenge details
app.get('/challenge/:id', (req, res) => {

	var challenge = challenges.find(c => c.id == req.params.id)
	if (challenge == undefined)
	{
		//Challenge not found
		res.end("Challenge not found")
		return;
	}

	var questions = req.session.questions
	if (questions == undefined)
	{
		//initialize the questions object onthe session
		questions = {}
		req.session.questions = questions
	}

	var question = questions[challenge.id]
	//Question data has not been generated
	if (question == undefined)
	{
		question = challenge.generate()
		questions[challenge.id] = question
	}
	console.log("current id " + req.session.teamId)
	var team = teams.find(team => team.id == req.session.teamId)

	var questionhtml = pug.renderFile("views/" + challenge.pug, question)
	res.render('challenge', {team:team, teams:teams, challenge:challenge, question:questionhtml})
})


//submit solution to  challenge
app.post('/challenge/:id', (req, res) => {

	if (req.session.name != undefined)
	{
		res.end("Please select a team")
		return
	}

	var question = session.questions[req.params.id]
	var challenge = challenges.find(c => c.id == req.params.id)

	if (challenge.verify(question, req.body))
	{
		var solvers = challenge_solvers[challenge.id]
		if (solvers == undefined)
		{
			solvers = []
			challenge_solvers[challenge.id] = solvers
		}
		var team = teams.find(team => team.id == req.session.teamId)
		solvers.push(team.name)
		team.points += challenge.points
		res.end("true")
		return
	}

	res.end("false")
})

app.get('/team', (req, res) => {
	res.render('register')
})
//Create a new team
app.post('/team', (req, res) => {

	console.log(req.body)

	var teamName = req.body.teamName
	if (teamName == '' || teamName == undefined)
	{
		res.end('You must have a team name')
		return
	}
	if (teams.find(team => team.name == teamName) != undefined)
	{
		res.end("Team already exists. Please choose a different name")
		return
	}

	var members = [req.body.member1,req.body.member2,req.body.member3,req.body.member4,req.body.member5]
	if (!members.some(member => member != ''))
	{
		res.end("Your team must have at least one member")
		return	
	}

	//Don't ever delete teams! The id's will be super broken
	var team = {id:teams.length, name:req.body.teamName, members:members, points:0}
	teams.push(team)
	console.log("current id " + req.session.teamId)
	req.session.teamId = team.id
	res.end("Team " + team.name + " successfully created")
})

//Set team for this session
app.post('/team/:id', (req, res) => {
	var team = teams.find(team => team.id == req.session.teamId)
	if (team == undefined)
	{
		res.end("Team not found")
		return
	}

	req.session.teamId = req.params.id
	res.end()
})


app.listen(port, () => console.log("server started"))
