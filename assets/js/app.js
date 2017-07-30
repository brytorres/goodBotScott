globals = {};

// Listen for button clicks
document.getElementById("bitcoin").addEventListener("click", function() {runAll('bitcoin');});
document.getElementById("ethereum").addEventListener("click", function() {runAll('ethereum');});
document.getElementById("litecoin").addEventListener("click", function() {runAll('litecoin');});


// FUNCTION : fetches the current data from whichever coin string is passed in.
function getPrices(coin){
    axios.get('https://api.coinmarketcap.com/v1/ticker/'+coin+'/',)
    .then(function(response){
    // Log response
    // console.log(response);
    var percentageChanges = [];

    // Get coin components
    var name = response.data[0].name;
    var symbol = response.data[0].symbol;
    var currentPrice = parseFloat(response.data[0].price_usd).toFixed(2);
    var percentageChange1h = parseFloat(response.data[0].percent_change_1h);
    percentageChanges.push(percentageChange1h);
    globals['change1h'] = percentageChange1h;
    var percentageChange24h = parseFloat(response.data[0].percent_change_24h);
    percentageChanges.push(percentageChange24h);
    globals['change24h'] = percentageChange24h;
    var percentageChange7d = parseFloat(response.data[0].percent_change_7d);
    percentageChanges.push(percentageChange7d);
    globals['change7d'] = percentageChange7d;
    // var percentageChanges = [percentageChange1h, percentageChange24h, percentageChange7d]

    // Get percentage change average
    function getAverage(){
        var percentagesSum = percentageChange1h + percentageChange24h + percentageChange7d;
        return percentagesSum / (percentageChanges.length);
    }
    var percentageAverage = parseFloat(getAverage().toFixed(2));
    percentageChanges.push(percentageAverage);
    globals['changeAverage'] = percentageAverage;
    // console.log(percentageChanges);

    // Generate current market data output
    var coinComponentsOutput = `
        <h3 class="center-align">${name}</h3>
        ${symbol}
        <div class="box price valign-wrapper">
            <h3 class="box">Current Price:</h3> 
            <h4 class="box">$${currentPrice}</h4>
        </div>
        <br>
        <div class="box percentage">
            <div class="col l12">
                <h5 class="center">Percentage Change</h5>
            </div>
            <div class="col l3">
                <p class="percentage-time">1 Hour:</p><br>
                <p class="percentage-data">${percentageChange1h} %</p>
            </div>

            <div class="col l3">
                <p class="percentage-time">24 hour:</p><br>
                <p class="percentage-data">${percentageChange24h} %</p>
            </div>

            <div class="col l3">
                <p class="percentage-time">7 day:</p><br>
                <p class="percentage-data">${percentageChange7d} %</p>
            </div>

            <div class="col l3">
                <p class="percentage-time">Average:</p><br>
                <p class="percentage-data">${percentageAverage} %</p>
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

// Get current ticker data
function currentTicker(coin){
    if(coin === 'bitcoin'){
        coinShort = 'btc';
        var pair = coinShort+'_usdt'

        // Get BTC Data
        axios.get('https://api.liqui.io/api/3/ticker/'+pair+'/')
        .then(function(response){
            var priceHigh = response.data.btc_usdt.high.toFixed(2);
            globals['high'] = parseFloat(priceHigh);
            var priceLow = response.data.btc_usdt.low.toFixed(2);
            globals['low'] = parseFloat(priceLow);
            var priceBuy = response.data.btc_usdt.buy.toFixed(2);
            globals['buy'] = parseFloat(priceBuy);
            var priceSell = response.data.btc_usdt.sell.toFixed(2);
            globals['sell'] = parseFloat(priceSell);
            var priceLast = response.data.btc_usdt.last.toFixed(2);
            globals['last'] = parseFloat(priceLast);
            var spread = parseFloat(priceHigh - priceLow).toFixed(2);

            // Generate BTC HTML Ouput
            var tickerOutput = `
            <div class="box price">
                <div class="col l12">
                    <h5 class="center">Market Ticker</h5>
                </div>  
                <div class="col l4">
                    <p class="percentage-time">High:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceHigh}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Low:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceLow}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Spread:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${spread}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Buy:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceBuy}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Sell:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceSell}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Last:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceLast}</p>
                </div>
            </div>
            `;

            // Output to app
            document.getElementById('tickerInfo').innerHTML = tickerOutput;
        })
        .catch(function(error){
            console.log(error);
        })
    } else if(coin === 'ethereum'){
        coinShort = 'eth';
        var pair = coinShort+'_usdt'

        // Get ETH Data
        axios.get('https://api.liqui.io/api/3/ticker/'+pair+'/')
        .then(function(response){
            var priceHigh = response.data.eth_usdt.high.toFixed(2);
            globals['high'] = parseFloat(priceHigh);
            var priceLow = response.data.eth_usdt.low.toFixed(2);
            globals['low'] = parseFloat(priceLow);
            var priceBuy = response.data.eth_usdt.buy.toFixed(2);
            globals['buy'] = parseFloat(priceBuy);
            var priceSell = response.data.eth_usdt.sell.toFixed(2);
            globals['sell'] = parseFloat(priceSell);
            var priceLast = response.data.eth_usdt.last.toFixed(2);
            globals['last'] = parseFloat(priceLast);
            var spread = parseFloat(priceHigh - priceLow).toFixed(2);

            // Generate ETH HTML Output
            var tickerOutput = `
            <div class="box price">
                <div class="col l12">
                    <h5 class="center">Market Ticker</h5>
                </div>  
                <div class="col l4">
                    <p class="percentage-time">High:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceHigh}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Low:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceLow}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Spread:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${spread}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Buy:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceBuy}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Sell:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceSell}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Last:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceLast}</p>
                </div>
            </div>
            `;

            // Output to app
            document.getElementById('tickerInfo').innerHTML = tickerOutput;
        })
    } else {
        coinShort = 'ltc';
        var pair = coinShort+'_usdt'

        // Get LTC Data
        axios.get('https://api.liqui.io/api/3/ticker/'+pair+'/')
        .then(function(response){
            var priceHigh = response.data.ltc_usdt.high.toFixed(2);
            globals['high'] = parseFloat(priceHigh);
            var priceLow = response.data.ltc_usdt.low.toFixed(2);
            globals['low'] = parseFloat(priceLow);
            var priceBuy = response.data.ltc_usdt.buy.toFixed(2);
            globals['buy'] = parseFloat(priceBuy);
            var priceSell = response.data.ltc_usdt.sell.toFixed(2);
            globals['sell'] = parseFloat(priceSell);
            var priceLast = response.data.ltc_usdt.last.toFixed(2);
            globals['last'] = parseFloat(priceLast);
            var spread = parseFloat(priceHigh - priceLow).toFixed(2);

            // Generate LTC HTML Output
            var tickerOutput = `
            <div class="box price">
                <div class="col l12">
                    <h5 class="center">Market Ticker</h5>
                </div>  
                <div class="col l4">
                    <p class="percentage-time">High:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceHigh}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Low:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceLow}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Spread:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${spread}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Buy:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceBuy}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Sell:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceSell}</p>
                </div>
                <div class="col l4">
                    <p class="percentage-time">Last:</p>
                    <p class="percentage-data" style="padding-top: 10px">$${priceLast}</p>
                </div>
            </div>
            `;

            // Output to app
            document.getElementById('tickerInfo').innerHTML = tickerOutput;
        })
    }

    
}


function runAll(coin){
    getPrices(coin);
    currentTicker(coin);
}


