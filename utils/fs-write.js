const fs = require("fs");

const writeJSONToFile = (filePath, data) => {
    let promise = new Promise((res, rej) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) rej(err)
            else res()
        })
    })
    return promise
}

exports.writeJSONToFile = writeJSONToFile