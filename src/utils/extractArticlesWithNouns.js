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
    const returnResult = []
    articles.map(article => {
        result.map(phrase => {
            const combined = article + ' ' + phrase.phrase
            // if (original.includes(combined)) {
                const nounString = original.substr(original.indexOf(combined), combined.length)
                if (nounString.match(/\b[A-Z]\S+/g)) {
                    returnResult.push({
                        phrase: combined,
                        score: phrase.score
                    })
                }
            // }
        })
    })
    phrases.result = returnResult.map(phrase => toPhrase(phrase.phrase, phrase.score))
    return phrases
}

export default extractArticlesWithNouns
