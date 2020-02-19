import splitWords from '../lib/splitWords'
import options from '../lib/options'

/**
 * Calculate word scoring based on word appearance frequency.
 *
 * @param {Phrases} phrases
 *
 * @returns {Phrases}
 */
const scoreWordFrequency = (phrases) => {
    const { result, original, toPhrase, options: overrides } = phrases

    // Retrieve config.
    const stopWords = options(overrides).get('stopWords', [])

    const wordsFrequency = {}

    // Calculate words frequency.
    result.forEach(({ phrase }) => {
        splitWords(phrase)
        .forEach(word => {
            if (stopWords.includes(word.toLowerCase())) {
                return
            }

            wordsFrequency[word] = splitWords(original)
            .filter(origWord => origWord.toLowerCase() === word.toLowerCase())
            .length
        })
    })

    phrases.result = result.map(({ phrase, score}) => toPhrase(
        phrase,
        score + splitWords(phrase)
            .reduce((phraseAccumulator, word) => phraseAccumulator + (wordsFrequency[word] || 0), 0)
    ))

    return phrases
}

export default scoreWordFrequency
