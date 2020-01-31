exports.handler = async (event) => {

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

    var result = {totalCount:totalCount, totalDollars:totalDollars}

    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
};
