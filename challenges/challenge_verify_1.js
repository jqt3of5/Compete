exports.handler = async (event) => {
        
    var coins = event.payload.answer.split(",").map(coin => parseInt(coin))
    
    var pennies = coins.filter(c => c == 1).length
    var nickles = coins.filter(c => c == 5).length
    var dimes = coins.filter(c => c == 10).length
    var quarters = coins.filter(c => c == 25).length

    var totalCount = pennies + nickles + dimes + quarters
    var totalDollars = pennies + 5*nickles + 10*dimes + 25*quarters

    var verify = event.payload.totalCount == totalCount && event.payload.totalDollars == totalDollars

    const response = {
	statusCode: 200,
	body: JSON.stringify(verify)
    }
    
    return response;
}

