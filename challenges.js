
module.exports = [
    {
        //static
        id:0,
        title:"Multiply two numbers", 
        shortDescription: "Given two integers, a and b, find their product.", 
        description:"Given two integers, a and b, find their product.<br><br> Example: <br><br> a = 5, b = 3;<br> 5 * 3 = 15", 
        points: 0, 
        pug:'question1.pug',
        verify: challenge_one_verify, 
        generate:challenge_one_generator,
    }
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