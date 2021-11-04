const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const url = args[0];
const path = args[1];

request(url, function (error, response, body) {
  if (error) {
    console.error('Invalid url given'); // Print the error if one occurred
    process.exit(1);
  }
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  fs.exists(path, (fileExists) => {
    if (fileExists) {
      console.log('File already exists.')
      process.exit(1);
    } 
    fs.writeFile(path, body, err => {
      if (err) {
        console.log("Invalid Path given");
        process.exit(1);
      }
      //file written successfully
      console.log(`Download and saved ${body.length} bytes to ${args[1]}`)
    })

  })
});