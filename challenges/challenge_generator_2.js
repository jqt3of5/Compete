exports.handler = async (event) => {

    var x = Math.floor(Math.random() * 100) + 10
    var n = collatz(x)
    console.log(n)
    var result = {X:x}
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
};

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
