import splitByStopWords from '../lib/splitByStopWords'
import options from '../lib/options'

/**
 * Retrieve key phrases splitted by stop words.
 *
 * @param {Phrases} phrases
 *
 * @returns {Phrases}
 */
const extractKeyPhrases = (phrases) => {
    const { result, original, toPhrase, options: overrides } = phrases
    const stopWords = options(overrides).get('stopWords', [])
    const keyPhrases = splitByStopWords(original, stopWords)

    phrases.result = result.concat(keyPhrases.map(phrase => toPhrase(phrase)))

    return phrases
}

export default extractKeyPhrases
