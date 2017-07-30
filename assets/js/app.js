function getPrices(){
    axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/',)
    .then(function(response){
    // Log response
    // console.log(response);

    // Get coin components
    var name = response.data[0].name;
    var symbol = response.data[0].symbol;
    var currentPrice = parseFloat(response.data[0].price_usd).toFixed(2);
    var percentageChange1h = parseFloat(response.data[0].percent_change_1h);
    var percentageChange24h = parseFloat(response.data[0].percent_change_24h);
    var percentageChange7d = parseFloat(response.data[0].percent_change_7d);
    var percentageChanges = [percentageChange1h, percentageChange24h, percentageChange7d]
    console.log(percentageChanges);

    // Get percentage change average
    function getAverage(){
        var percentagesSum = percentageChange1h + percentageChange24h + percentageChange7d;
        return percentagesSum / (percentageChanges.length);
    }
    var percentageAverage = getAverage().toFixed(2);

    var coinComponentsOutput = `
        <ul class="collection">
            <h3 class="center-align">${name}</h3>
            <li class="collection-item">${symbol}</li>
            <li class="collection-item"><strong>Current Price:</strong> $${currentPrice}</li>
            <li class="collection-item"><strong>Percentage Change 1hr:</strong> ${percentageChange1h}%</li>
            <li class="collection-item"><strong>Percentage Change 24hr:</strong> ${percentageChange24h}%</li>
            <li class="collection-item"><strong>Percentage Change 7d:</strong> ${percentageChange7d}%</li>
            <li class="collection-item"><strong>Percentage Average:</strong> ${percentageAverage}%</li>
        </ul>
    `;

    // Output to app
    document.getElementById('btcInfo').innerHTML = coinComponentsOutput;

    })
    .catch(function(error){
        console.log(error);
    })
}