const files = require('fs');
const axios = require('axios')
const args = process.argv;

// take a file name("string" format) and prints the contents of the file to the console
function cat(path) {
    files.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(err)
            process.exit(1)
        }
        console.log(data)
    })
}

// takes a url(string format), retrieves(GET) the url and prints the html contents of the webpage to the console
async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response)
    }
    catch (err) {
        console.error(err);
        process.exit(2)
    }
}

// sets up a command line option to use these functions using process.argv
// Structure: node <script_file_name> "<arg1=file_name or url>" "<arg2=file_name or url>" "<additional args>"
// Ex: node step3.js "https://google.com" "one.txt"

// start at index 2 to avoid the first two arguments passed automatically by node
for(let i = 2; i < args.length; i ++){
    // if arg is a website, use webCat function else use the cat() function
    if(args[i].slice(0,4) == "http") {
        webCat(args[i])
    }
    else {
        cat(args[i])
    }
}
