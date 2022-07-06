const files = require('fs');
const args = process.argv;


function cat(path) {
    files.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(err)
            process.exit(1)
        }
        console.log(data)
        return data
    })
}

for(let i = 2; i < args.length; i ++){
    cat(args[i])
}
