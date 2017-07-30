document.getElementById("bitcoin").addEventListener("click", function() {getPrices('bitcoin');});
document.getElementById("ethereum").addEventListener("click", function() {getPrices('ethereum');});
document.getElementById("litecoin").addEventListener("click", function() {getPrices('litecoin');});

function getPrices(coin){
    axios.get('https://api.coinmarketcap.com/v1/ticker/'+coin+'/',)
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

    // Get percentage change average
    function getAverage(){
        var percentagesSum = percentageChange1h + percentageChange24h + percentageChange7d;
        return percentagesSum / (percentageChanges.length);
    }
    var percentageAverage = getAverage().toFixed(2);

    var coinComponentsOutput = `
        <h3 class="center-align">${name}</h3>
        ${symbol}
        <div class="box price">
            <h3 class="box">Current Price:</h3> 
            <h4 class="box">$${currentPrice}</h4>
        </div>
        <br>
        <div class="box price">
            <div class="col l12">
                <h5 class="center">Percentage Change</h5>
            </div>
            <div class="col l3">
                <p class="percentage-time">1 Hour:</p><br>
                <p class="percentage-data">${percentageChange1h}</p>
            </div>

            <div class="col l3">
                <p class="percentage-time">24 hour:</p><br>
                <p class="percentage-data">${percentageChange24h}</p>
            </div>

            <div class="col l3">
                <p class="percentage-time">7 day:</p><br>
                <p class="percentage-data">${percentageChange7d}</p>
            </div>

            <div class="col l3">
                <p class="percentage-time">Average:</p><br>
                <p class="percentage-data">${percentageAverage}</p>
            </div>
        </div>
    `;

    // Output to app
    document.getElementById('coinInfo').innerHTML = coinComponentsOutput;

    })
    .catch(function(error){
        console.log(error);
    })
}