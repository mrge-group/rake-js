import options from '../lib/options'
import splitWords from '../lib/splitWords'

/**
 * Filter results by keyword length.
 *
 * @param {Phrases} phrases
 *
 * @returns {Phrases}
 */
const keywordLengthFilter = (phrases) => {
    const { result, toPhrase, options: overrides } = phrases

    // Retrieve options.
    const minWordLength = options(overrides).get('minWordLength')
    const maxWordLength = options(overrides).get('maxWordLength')
    const minKeyWordsPerPhrase = options(overrides).get('minKeyWordsPerPhrase')
    const maxKeyWordsPerPhrase = options(overrides).get('maxKeyWordsPerPhrase')

    phrases.result = result
    .map(({ phrase, score }) => toPhrase(
        // Filter words outside of characters length range.
        splitWords(phrase)
        .filter(word => word.length >= minWordLength && word.length <= maxWordLength)
        .join(' '),
        score
    ))
    .filter(({ phrase }) => {

        const words = splitWords(phrase)

        // Filter phrases outside of word count range.
        if (!(words.length >= minKeyWordsPerPhrase && words.length <= maxKeyWordsPerPhrase)) {
            return false
        }

        // Count word characters and numbers.
        const alpha = (phrase.match(/\D/g) || []).length
        const digits = (phrase.match(/\d/g) || []).length

        // Ensure there is at least one word character.
        if (alpha === 0) {
            return false
        }

        // Ensure phrase has more word characters than numbers.
        return alpha > digits
    })

    return phrases
}

export default keywordLengthFilter
