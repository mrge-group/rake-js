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

    const fileOutputString = file.replace('.txt', '')

    fs.writeFile(`dist/${fileOutputString}.js`, 'window.RakeStopWords = ' + JSON.stringify(output), (err) => {
        if (err) throw err
    })

    fs.writeFile(`src/stopwords/${fileOutputString}.js`, 'export default ' + JSON.stringify(output), (err) => {
        if (err) throw err
    })
})
