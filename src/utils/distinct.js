/**
 * Filters results for only distinct phrases.
 *
 * @param {Phrases} phrases
 *
 * @returns {Phrases}
 */
const distinct = (phrases) => {
    const { result } = phrases

    phrases.result = result.filter((phrase, phraseIndex) => {
        return !result.some((checkPhrase, checkIndex) => {
            return checkPhrase.phrase.toLowerCase() === phrase.phrase.toLowerCase()
                && checkIndex < phraseIndex
    })})

    return phrases
}

export default distinct
