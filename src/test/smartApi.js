const { SmartAPI } = require("smartapi-javascript")

let smart_api = new SmartAPI({
    api_key: 'lVoYyi7R', // PROVIDE YOUR API KEY HERE
    // OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor.
    // access_token: "YOUR_ACCESS_TOKEN",
    // refresh_token: "YOUR_REFRESH_TOKEN"
});

// If user does not have valid access token and refresh token then use generateSession method
smart_api
    .generateSession('CLIENT_CODE', 'PASSWORD', 'TOTP')
    .then((data) => {
        //return smart_api.getProfile();
        //Historical Methods
        return smart_api.getCandleData({
            "exchange": "NSE",
            "symboltoken": "25516",
            "interval": "ONE_MINUTE",
            "fromdate": "2021-02-10 09:00",
            "todate": "2021-02-10 09:20"
        })
    })
    .then((data) => {
        console.log(data);
    })
    .catch((ex) => {
        console.log(ex)
    });

// TO HANDLE SESSION EXPIRY, USERS CAN PROVIDE A CUSTOM FUNCTION AS PARAMETER TO setSessionExpiryHook METHOD
//smart_api.setSessionExpiryHook(customSessionHook);

// function customSessionHook() {
//     console.log('User loggedout');
//
//     // NEW AUTHENTICATION CAN TAKE PLACE HERE
// }
