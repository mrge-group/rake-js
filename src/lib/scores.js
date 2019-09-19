/**
 * Returns an object, whom keys are words and values are the words score. The score is calculated based on the
 * appearance frequency and length of the single phrases we word resides in.
 *
 * @param {String[]} phrases
 *
 * @returns {{score: number, word: String}[]}
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

export { calculateWordScores }
