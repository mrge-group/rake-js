const fs = require('fs')

const directory = './stopwords/'

fs.readdirSync(directory).forEach(file => {
    const fileString = fs.readFileSync(`stopwords/${file}`, 'utf8')
    const stopWords = fileString.split(/\n/)

    fs.writeFile(`dist/${file}.js`, JSON.stringify(stopWords), (err) => {
        if (err) throw err
    })
})

// var lines = $('#input').val().split(/\n/);
// var output = [];
// var outputText = [];
// for (var i = 0; i < lines.length; i++) {
//     // only push this line if it contains a non whitespace character.
//     if (/\S/.test(lines[i])) {
//         outputText.push('"' + $.trim(lines[i]) + '"');
//         output.push($.trim(lines[i]));
//     }
// }
// console.log(output);
// $('#input').val('[' + outputText + ']');
// $('.alert').removeClass('alert-info').addClass('alert-success').text('Done!')
