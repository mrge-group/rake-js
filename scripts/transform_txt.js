const fs = require('fs')

const directory = './stopwords/'
let fileString = ''
let stopWords = []

fs.readdirSync(directory).forEach(file => {
    fileString = fs.readFileSync(`stopwords/${file}`, 'utf8')
    stopWords = fileString.split(/\n/)
    const output = []
    for (let i = 0; i < stopWords.length; i++) {
        if (/\S/.test(stopWords[i])) {
            output.push((stopWords[i]).trim())
        }
    }
    fs.writeFile(`dist/${file}.js`, JSON.stringify(output), (err) => {
        if (err) throw err
    })
})
