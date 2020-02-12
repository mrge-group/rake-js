import options from '../lib/options'

/**
 * Retrieve article noun combinations.
 *
 * @param {Phrases} phrases
 *
 * @returns {Phrases}
 */
const extractArticlesWithNouns = (phrases) => {
    const { result, original, toPhrase, options: overrides } = phrases
    const articles = options(overrides).get('articles', [])

    const originalLowerCase = original.toLowerCase()
    const returnResult = []

    articles.map(article => {
        result.map(phrase => {
            const combined = article + ' ' + phrase.phrase.toLowerCase()
            if (originalLowerCase.includes(combined)) {
                const nounString = original.substr(originalLowerCase.indexOf(combined), combined.length)
                if (nounString.match(/\b[A-Z]\S+/g)) {
                    returnResult.push({
                        phrase: combined,
                        score: phrase.score
                    })
                }
            }
        })
    })
    phrases.result = returnResult.map(phrase => toPhrase(phrase.phrase, phrase.score))
    return phrases
}

export default extractArticlesWithNouns
