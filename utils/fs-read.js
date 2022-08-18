const fs = require("fs");

const readJSONFromFile = (filePath) => {
    let promise = new Promise((res, rej) => {
        fs.readFile(filePath, function (err, buf) {
            if (err) rej(err)
            else res(JSON.parse(buf.toString()))
        });
    })

    return promise
}

exports.readJSONFromFile = readJSONFromFile