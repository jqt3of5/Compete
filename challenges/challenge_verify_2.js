exports.handler = async (event) => {

    var n = collatz(value.X)
    var result =  n == parseInt(answer)

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
