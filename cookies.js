// cookie filter field
const cookieFilterKeys = [ 'name', 'domain', 'value', 'path', 'secure', 'httpOnly', 'expirationDate' ];

//Use the api to obtain the cookies of the corresponding domain name
var getDomainCookies = function(url, callback) {
    return chrome.cookies.getAll({
        url: url
    }, function(cookies) {
        let cookiesRetArr = _.map(cookies, function (cookie) {
            return _.pick(cookie, cookieFilterKeys);
        });
        callback({url: url, cookies: cookiesRetArr});
    });
};

//Load cookies from text
var loadCookies = function(data) {
    _.each(data.cookies, function(cookie) {
        cookie.url = data.url;
        chrome.cookies.set(cookie);
    });
    return data.url;
};