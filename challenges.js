module.exports = [
    {
        //static
        id:0,
        title:"Make Change", 
        shortDescription: "Find exactly N coins that make $X", 
        points: 5, 
        pug:'question1.pug',
        verify: challenge_one_verify, 
        generate:challenge_one_generator,
    },
    {
        //static
        id:1,
        title:"Collatz Conjecture", 
        shortDescription: "Find the number of steps required to get to 1", 
        points: 5, 
        pug:'question2.pug',
        verify: challenge_two_verify, 
        generate:challenge_two_generator,
    },
    {
        //static
        id:2,
        title:"Mod Mod", 
        shortDescription: "Given A and B, count the number of values for x where A % x = B", 
        points: 5, 
        pug:'question3.pug',
        verify: challenge_three_verify, 
        generate:challenge_three_generator,
    }
]

function challenge_one_generator()
{
    var pennies = Math.floor(Math.random() * 10) + 3
    var nickles = Math.floor(Math.random() * 10) + 3
    var dimes = Math.floor(Math.random() * 10) + 3
    var quarters = Math.floor(Math.random() * 10) + 3

    var totalDollars = pennies + 5*nickles + 10*dimes + 25*quarters
    var totalCount = pennies + nickles + dimes + quarters

    var temp = Array(pennies).fill(1)
    temp = temp.concat(Array(nickles).fill(5))
    temp = temp.concat(Array(dimes).fill(10))
    temp = temp.concat(Array(quarters).fill(25))
    console.log(temp)

    return {totalCount:totalCount, totalDollars:totalDollars}
}

function challenge_one_verify(value, answer)
{
    var coins = answer.split(",").map(coin => parseInt(coin))
    
    var pennies = coins.filter(c => c == 1).length
    var nickles = coins.filter(c => c == 5).length
    var dimes = coins.filter(c => c == 10).length
    var quarters = coins.filter(c => c == 25).length

    var totalCount = pennies + nickles + dimes + quarters
    var totalDollars = pennies + 5*nickles + 10*dimes + 25*quarters

    return value.totalCount == totalCount && value.totalDollars == totalDollars
}

function challenge_two_generator()
{
    var x = Math.floor(Math.random() * 100) + 10
    var n = collatz(x)
    console.log(n)
    return {X:x}
}

function challenge_two_verify(value, answer)
{
    var n = collatz(value.X)
    return n == parseInt(answer)
}

function collatz(x)
{
    if (x == 1)
    {
	return 0
    }
    
    if (x % 2 == 0)
    {
	return 1 + collatz(x/2)
    } else {
	return 1 + collatz(x * 3 + 1)
    }
}

//Untested ====================================================
//============================================================

function challenge_three_generator()
{
    var A = Math.floor(Math.random() * 1000) + 1000
    var B = Math.floor(Math.random() * A/100) + 2

    return {A: A, B: B}
}

function challenge_three_verify(value, answer)
{
    var answerCount = parseInt(answer)

    var count = 0
    
    for (int i = 1; i < value.A; ++i)
    {
	if (value.A % i == value.B)
	{
	    count += 1
	}
    }

    return count == answerCount
}

//Find the shortest hamiltonian path
function challenge_four_generator()
{
    var nodes = 10
    var matrix = []

    //May construct a graph with no hamiltonian path
    for (i = 0; i < nodes; ++i)
    {
	var edges = []
	for (j = 0; j < nodes; ++i)
	{
	    if (j == i)
	    {
		edges.add(0)
	    }
	    else if (j < i)
	    {
		matrix[i][j] = matrix[j][i]
	    }
	    else if (j > i)
	    {
		edges.add(Math.floor(Math.rand()*20) - 1)
	    }
	}
	matrix.add(edges)
    }

    return {matrix: matrix}
}

function challenge_four_verify(value, answer)
{
    var answerLength = parseInt(answer)

    var shortestLen = undefined
    for (i = 0; i < value.matrix.length; ++i)
    {
	var len = shortestPathLength(i, value.matrix, [])
	if (len == undefined)
	    continue

	if (len < shortestLen)
	{
	    shortestLen = len
	}
    }
    
    if (shortestLen == undefined && answerLength == -1)
	return true
    
    return shortestLen == answerLength
}

//Find the shortest path starting at node
function shortestPathLength(node, matrix, path)
{
    var line = matrix[node]

    //This is the last node in the path
    if (path.length == line.length)
	return 0
    
    var shortestLen = undefined
    for (i = 0; i < line.length;  ++i)
    {
	//Don't traverse to ourselves
	if (i == node)
	    continue
	//If the node has been visited, don't traverse
	if (path.contains(i))
	    continue
	//If there is no edge, don't traverse
	if (line[i] == -1)
	    continue
	
	var newLen = shortestPath(i, matrix, path + [i])
	if (newLen == undefined)
	    continue
	
	newLen = newLen + line[i]
	if (shortest == undefined || newLen < shortestLen)
	{
	    shortestLen = newLen
	}
    }

    if (shortestLen == undefined)
	return undefined
    
    return shortestLen
}
