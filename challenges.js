
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
