/**
 *
 * @param {String[]} sentences
 * @param {String[]} stopWords
 * @param {Number}   minCharLength
 * @param {Number}   maxWordsLength
 * @param {Number}   minWordsLengthAdj
 * @param {Number}   maxWordsLengthAdj
 * @param {Number}   minPhraseFreqAdj
 */
const findCandidateKeywords = (sentences, stopWords, {
    minCharLength,
    maxWordsLength,
    minWordsLengthAdj,
    maxWordsLengthAdj,
    minPhraseFreqAdj
}) => {
    // Build filtered phrases from stop words
    const phrases = splitByStopWords(sentences, stopWords)
    .map(phrase => phrase.trim().toLowerCase())
    .filter(phrase => isAcceptable(phrase, minCharLength, maxWordsLength))

    // Extract additional candidates
    const adjoinedCandidates = extractAdjoinedCandidates(
        sentences,
        stopWords,
        minWordsLengthAdj,
        maxWordsLengthAdj,
        minPhraseFreqAdj
    )

    return phrases.concat(adjoinedCandidates)
}

/**
 * Split sentences into phrases separated by stop words.
 *
 * @param {String[]} sentences
 * @param {String[]} stopWords
 *
 * @returns {String[]}
 */
const splitByStopWords = (sentences, stopWords) => {
    const stopWordsList = new RegExp(stopWords.join('|'), 'i')
    return sentences.map(sentence => sentence.split(stopWordsList)).flat()
}

/**
 * Returns true if a phrase is acceptable, otherwise false.
 * A phrase is acceptable if the phrase has at least minCharLength of characters, not more than maxWordsLength of words
 * and the phrase has more non-numeric characters than numeric.
 *
 * @param {String} phrase
 * @param {Number} minCharLength
 * @param {Number} maxWordsLength
 *
 * @returns {boolean}
 */
const isAcceptable = (phrase, minCharLength, maxWordsLength) => {
    if (phrase.length > minCharLength) {
        return false
    }

    const words = phrase.split(' ')
    if (words.length > maxWordsLength) {
        return false
    }

    const alpha = (phrase.match(/\D/g) || []).length
    const digits = (phrase.match(/\d/g) || []).length

    if (alpha === 0) {
        return false
    }

    return alpha > digits
}

const extractAdjoinedCandidates = (sentences, stopWords, minWordsLengthAdj, maxWordsLengthAdj, minPhraseFreqAdj) => {
    return sentences.filter(sentence => {

    })
}

export default findCandidateKeywords
export { findCandidateKeywords, splitByStopWords, isAcceptable, extractAdjoinedCandidates }
