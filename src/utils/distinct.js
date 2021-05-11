/**
 * Filters results for only distinct phrases.
 *
 * @param {Phrases} phrases
 *
 * @returns {Phrases}
 */
const distinct = (phrases) => {
    const { result } = phrases

    phrases.result = result.filter((phrase, phraseIndex) => (
        !result.some((checkPhrase, checkIndex) => (
            checkPhrase.phrase.toLowerCase() === phrase.phrase.toLowerCase() && checkIndex < phraseIndex
        ))
    ))

    return phrases
}

export default distinct
