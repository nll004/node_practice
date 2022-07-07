const files = require('fs');
const axios = require('axios')
const args = process.argv;

// take a file name("string" format) and print/returns the contents of the file
function cat(path) {
    files.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(err)
            process.exit(1)
        }
        console.log(`${path} readout =>`, data)
        return data
    })
}

// takes a url(string format), retrieves(GET) the url and prints the html contents of the webpage to the console
async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response)
        return response
    }
    catch (err) {
        console.error(err);
        process.exit(2)
    }
}

function copy_contents(writeDestination, text) {
    console.log('copy_contents-- step3.js', "args:", writeDestination, text,)
    if (writeDestination) {
        files.writeFile(writeDestination, text, 'utf-8', (err) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
        })
    } else {
        console.log(`Text contents written to ${writeDestination}`)
    }
}

// sets up a command line option to write text to a file via command line or read files/website html to console using process.argv
// Command for writing contents to an existing file:     node step3.js "<arg1= write_file_name>" "<arg2= text>"
// Structure for reading files/website html:             node step3.js "<arg1=file_name or url>" "<arg2=file_name or url>" "<additional args>"

let writeDestination = null
let text = null

// start at index 2 to avoid the first two arguments passed automatically by node
for(let i = 2; i < args.length; i ++){
    // if --out argument is passed then the command is for writing files
    // Ex: node step3.js "one.txt" "I want this text in my file"
    if(args[2] === "--out"){
        writeDestination = args[3]
        text = args[4]

        copy_contents(writeDestination, text)
        break
    }
    // if arg is a website, use webCat function else use the cat() function to read a txt file
    else if(args[i].slice(0,4) == "http") {
            webCat(args[i])
    }
    else {
        cat(args[i])
    }
}
