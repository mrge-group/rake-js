/**
 * Returns objects within an array including words with their calculated score.
 *
 * @param {String[]} phrases
 *
 * @returns {{score: Number, word: String}[]}
 */
const calculateWordScores = (phrases) => {
    const wordsFrequency = {}
    const wordsDegree = {}

    phrases.forEach(phrase => {
        const words = phrase.split(' ')
        const phraseDegree = words.length - 1

        words.forEach(word => {
            wordsFrequency[word] = ++wordsFrequency[word] || 1
            wordsDegree[word] = (wordsDegree[word] || 0) + phraseDegree
        })
    })

    return Object.keys(wordsFrequency).map(word => ({
        score: (wordsDegree[word] + wordsFrequency[word] || 0) / (wordsFrequency[word] * 1.0),
        word: word
    }))
}

/**
 * Returns objects within an array including phrases and their score, accumulated by words and their score.
 *
 * @param {String[]}                        phrases
 * @param {{score: number, word: String}[]} wordsScore
 * @param {Number}                          minKeywordFrequency
 *
 * @returns {{score: Number, phrase: String}[]}
 */
const calculatePhraseScores = (phrases, wordsScore, { minKeywordFrequency }) => {
    let distinctPhrases = [...new Set(phrases)]

    if (minKeywordFrequency > 1) {
        distinctPhrases = distinctPhrases
        .filter(distinctPhrase => (phrases.filter(phrase => phrase === distinctPhrase)).length > minKeywordFrequency)
    }

    return distinctPhrases.map(phrase => {
        const phraseScore = phrase.split(' ').reduce((accumulator, word) => {
            const wordScore = wordsScore.filter(wordScore => wordScore.word === word)
            .reduce((accumulator, wordScore) => accumulator + wordScore.score, 0)


            return accumulator + wordScore
        }, 0)

        return { score: phraseScore, phrase: phrase }
    })
}

export { calculateWordScores, calculatePhraseScores }
