module.exports = [
    {
        //static
        id:0,
        title:"Make Change", 
        shortDescription: "Find exactly N coins that make $X", 
        points: 1, 
        pug:'question1.pug',
    },
    {
        //static
        id:1,
        title:"Collatz Conjecture", 
        shortDescription: "Find the number of steps required to get to 1", 
        points: 1, 
        pug:'question2.pug',
    },
    {
        //static
        id:2,
        title:"Mod Mod", 
        shortDescription: "Given A and B, count the number of values for x where A % x = B", 
        points: 1, 
        pug:'question3.pug',
        verify: challenge_three_verify,
	solver: challenge_three_solver,
        generate:challenge_three_generator,
    },
    {
        //static
        id:3,
        title:"Shortest Hamiltonian Cycle", 
        shortDescription: "Given an adjacency matrix, find the shortest Hamiltonian cycle", 
        points: 1, 
        pug:'question4.pug',
        verify: challenge_four_verify,
	solver: challenge_four_solver,
        generate:challenge_four_generator,
    },
    {
        //static
        id:4,
        title:"Base 8 Encoding", 
        shortDescription: "Given a string that has been base 8 encoded, decode the string", 
        points: 1, 
        pug:'question5.pug',
        verify: challenge_five_verify,
	decode: base8Decode,
	encode: base8Encode,
	solver: challenge_five_solver,
        generate:challenge_five_generator,
    }
]

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
    return answerCount == challenge_three_solver(value.A, value.B)
}

function challenge_three_solver(A, B)
{
    var count = 0
    for (i = 1; i < A; ++i)
    {
	if (A % i == B)
	{
	    count += 1
	}
    }

    return count
}

//Find the shortest hamiltonian path
function challenge_four_generator()
{
    var nodes = 10
    var matrix = []

    for (var i = 0; i < nodes; ++i)
    {
	var edges = []
	for (var j = 0; j < nodes; ++j)
	{
	    edges.push(-2)
	}
	matrix.push(edges)
    }
    //May construct a graph with no hamiltonian path
    for (var i = 0; i < nodes; ++i)
    {
	for (var j = 0; j < nodes; ++j)
	{
	    if (j == i)
	    {
		matrix[j][i] = -1
	    }
	    else if (j < i)
	    {
		matrix[j][i] = matrix[i][j]
	    }
	    else if (j > i)
	    {
		matrix[j][i] = Math.floor(Math.random()*20) - 1
	    }
	}
    }

    return {matrix: matrix}
}

function challenge_four_verify(value, answer)
{
    var answerLength = parseInt(answer)

    var shortestLen = challenge_four_solver(value.matrix)
    
    if (shortestLen == undefined && answerLength == -1)
	return true
    
    return shortestLen == answerLength
}

function challenge_four_solver(matrix)
{
    var shortestLen = undefined
    for (var i = 0; i < matrix.length; ++i)
    {
	var len = shortestPathLength(i, matrix, [i])
	if (len == undefined)
	    continue

	if (shortestLen == undefined || len < shortestLen)
	{
	    shortestLen = len
	}
    }
    
    return shortestLen
}

//Find the shortest path starting at node
function shortestPathLength(node, matrix, path)
{
    var line = matrix[node]

    //This is the last node in the path
    if (path.length == line.length)
	return 0

    var shortestLen = undefined
    for (var j = 0; j < line.length;  ++j)
    {
	//Don't traverse to ourselves
	if (j == node)
	    continue
	//If the node has been visited, don't traverse
	if (path.includes(j))
	    continue
	//If there is no edge, don't traverse
	if (line[j] == -1)
	    continue

	var newLen = shortestPathLength(j, matrix, path.concat(j))
	if (newLen == undefined)
	    continue


	newLen = newLen + line[j]

	if (shortestLen == undefined || newLen < shortestLen)
	{
	    shortestLen = newLen
	}
    }

    return shortestLen
}

function challenge_five_generator()
{
    var values = ["JT is the coolest Engineering Manager Ever", "asdfasdf", "asdfasdf", "qeefszasef"]

    var index = Math.floor(Math.random() *  values.length)

return {encodedText: base8Encode(values[index])}
}

function challenge_five_verify(value, answer)
{
    return value == base8Decode(answer)
}
function challenge_five_solver(str)
{
    return base8Encode(str)
}
function  base8Encode(str)
{
    var base8Chars = ['a','b','c','d','e','f','g','h']
    var padding = str.length % 3

    str = str + '\0'.repeat(padding)

    var codedString = ""
        
    for (var i = 0; i < str.length; i += 3)
    {
	var threeChars = (str.charCodeAt(i) << 16) | (str.charCodeAt(i+1) << 8) | (str.charCodeAt(i+2))
	var mask = 0x7
	var shift = 21
	for (var j = 0; j < 8; ++j)
	{
	    var unshiftedBits = threeChars & (mask << shift)
	    var base8Char = unshiftedBits >>> shift
 	    codedString += base8Chars[base8Char]
	    //logical shift
	    shift -= 3
	}
    }
    return codedString
}

function base8Decode(code)
{
    var base8Chars = ['a','b','c','d','e','f','g','h']


    var str  = ""
    for (var i = 0; i < code.length;)
    {
        var threeChars = 0
	var shift = 21
	for (; shift >= 0; shift -= 3, ++i)
	{
	    var index = base8Chars.indexOf(code[i])
	    threeChars |= index << shift
	}

	for (shift = 16; shift >= 0; shift -= 8)
	{
	    var char = (threeChars >>> shift) & 0xff
            if (char == 0)
                continue
	    str += String.fromCharCode(char)
	}
    }
    return str
}

