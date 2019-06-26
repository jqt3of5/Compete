
module.exports = [
    {
        //static
        id:0,
        title:"Make Change", 
        shortDescription: "Find exactly N coins that make $X", 
        description:
        `<div>Find exactly N coins that make $X, and give the answer as a comma delineated list of coin values (1,5,10,25). Example:</div>
        <br> 
        <div style='text-align:center'>
        <div>Find 8 coins that make $0.58</div>
        <div>Answer: <b> 1,1,1,5,5,10,10,25 </b></div></div>`, 
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
        description:
        `<div>
            The Collatz conjecture is a yet unproven mathematical conjecture that states for all positive integers, if you apply the below function repeatedly, it will eventually converge to 1.<br>
            <br>
            <div style='text-align:center'>
                f(x) =<br>
                If x is even -> x/2<br>
                If x is odd -> x*3+1<br>
            </div>
           
            For the given N, count the number of times f(x) is applied to get to 1<br>
            <br>
            Example:<br>
            <div style='text-align:center'>
                Where N = 17<br>
                f(17) = 52<br>
                f(52) = 26<br>
                f(26) = 13<br>
                f(13) = 40<br>
                f(40) = 20<br>
                f(20) = 10<br>
                f(10) = 5<br>
                f(5) = 16<br>
                f(16) = 8<br>
                f(8) = 4<br>
                f(4) = 2<br>
                f(2) = 1<br>
                <br>
                Answer: <b>12</b>
            </div>
        </div>`, 
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
    var pennies = Math.floor(Math.random() * 10) + 1
    var nickles = Math.floor(Math.random() * 10) + 2
    var dimes = Math.floor(Math.random() * 10) + 2
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

function challenge_two_verify(value, answer)
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