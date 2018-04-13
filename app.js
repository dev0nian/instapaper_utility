const request = require("request");
const username = "";
const password = "";
const auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
const addUrl = "https://www.instapaper.com/api/add";

//For testing
const authenticateUrl = "https://www.instapaper.com/api/authenticate";

//Articles will be added in the reverse order since InstaPaper
//shows most recently added articles first by default
let articleUrls = [
  "https://example1.com",
  "https://example2.com"
];

function addUrlsToInsta(urls, index) {
  if(index < 0 || index >= urls.length) {
    return;
  }

  let url = urls[index];
  console.log("Adding URL: " + url);
  let requestObj = {
    method: "POST",
    url: addUrl + "?url=" + url,
    headers: {
      "Authorization": auth
    }
  }

  request(
    requestObj, 
    (error, response, body) => {
    if(error) {
      console.log("Error: " + error);
      return;
    }
    console.log("Status code: " + response.statusCode);
    if(response.statusCode == 201) {
      console.log("Successfully added " + response.headers["content-location"] + ".");
      index--;
      addUrlsToInsta(urls, index);
    }
  });
}

addUrlsToInsta(articleUrls, articleUrls.length - 1);

