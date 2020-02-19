const fs = require('fs')

const directory = './dictionary/'
let fileString = ''
let stopWords = []
let returnObj = {}

fs.readdirSync(directory).forEach(dir => {
    fs.readdirSync(directory + dir).forEach(file => {
        fileString = fs.readFileSync(`${directory + dir}/${file}`, 'utf8')

        stopWords = fileString.split(/\n/)
        const output = []
        for (let i = 0; i < stopWords.length; i++) {
            if (/\S/.test(stopWords[i])) {
                output.push((stopWords[i]).trim())
            }
        }
        const fileOutputString = file.replace('.txt', '')
        returnObj[fileOutputString] = output
    })

    fs.writeFile(`src/dictionary/${dir}.js`,
    `export default ${JSON.stringify(returnObj)}`, (err) => {
        if (err) throw err
    })

    fs.writeFile(`dist/${dir}.js`,
    `module.exports = ${JSON.stringify(returnObj)}`, (err) => {
        if (err) throw err
    })
})
