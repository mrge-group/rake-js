import articles from '../stopwords/articles'

/**
 * Retrieve key phrases splitted by stop words.
 *
 * @param {Phrases} phrases
 *
 * @returns {Phrases}
 */

const extractArticlesWithNouns = (phrases) => {
    const { result, original, toPhrase, options: overrides } = phrases
    const srcLowerCase = original.toLowerCase()
    const returnResult = []

    articles.map(article => {
        result.map(noun => {
            const combined = article + ' ' + noun.phrase
            if (srcLowerCase.includes(combined)) {
                const nounString = original.substr(srcLowerCase.indexOf(combined), combined.length)
                if (nounString.match(/\b[A-Z]\S+/g)) {
                    returnResult.push({
                        phrase: combined,
                        score: noun.score
                    })
                }
            }
        })
        return returnResult
    })
    return phrases
}

export default extractArticlesWithNouns
