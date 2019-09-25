import splitWords from '../utils/splitWords'

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
        const words = splitWords(phrase)
        const phraseDegree = words.length - 1

        words.forEach(word => {
            wordsFrequency[word] = ++wordsFrequency[word] || 1
            wordsDegree[word] = (wordsDegree[word] || 0) + phraseDegree
        })
    })

    return Object.keys(wordsFrequency).map(word => ({
        score: (wordsDegree[word] + wordsFrequency[word]) / (wordsFrequency[word] || 1),
        word
    }))
}

/**
 * Returns objects within an array including phrases and their score, accumulated by words and their score.
 *
 * @param {String[]}                        phrases
 * @param {{score: Number, word: String}[]} wordsScore
 * @param {Number}                          minKeywordFrequency
 *
 * @returns {{score: Number, phrase: String}[]}
 */
const calculatePhraseScores = (phrases, wordsScore, { minKeywordFrequency }) => {
    const distinctPhrases = [...new Set(phrases)]
    .filter(phrase => phrase.length > minKeywordFrequency)

    return distinctPhrases.map(phrase => {
        const phraseScore = splitWords(phrase)
        .reduce((phraseAccumulator, word) => {
            const accumulatedWordScore = wordsScore.filter(wordScore => wordScore.word === word)
            .reduce((wordAccumulator, wordScore) => wordAccumulator + wordScore.score, 0)

            return phraseAccumulator + accumulatedWordScore
        }, 0)

        return { score: phraseScore, phrase }
    })
}

export { calculateWordScores, calculatePhraseScores }
