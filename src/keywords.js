/**
 *
 * @param {String[]} sentences
 * @param {String[]} stopWords
 * @param {Number}   minCharLength
 * @param {Number}   maxWordsLength
 * @param {Number}   minKeywordFrequency
 * @param {Number}   minWordsLengthAdj
 * @param {Number}   maxWordsLengthAdj
 * @param {Number}   minPhraseFreqAdj
 */
const findCandidateKeywords = (sentences, stopWords, {
    minCharLength,
    maxWordsLength,
    minKeywordFrequency,
    minWordsLengthAdj,
    maxWordsLengthAdj,
    minPhraseFreqAdj
}) => {
    const phrases = splitByStopWords(sentences, stopWords)
    const filteredPhrases = phrases.filter(phrase => isAcceptable(phrase))
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

const isAcceptable = () => {

}

const extractAdjoinedCandidates = (sentences, stopWords, ) => {

}

export default findCandidateKeywords
export { findCandidateKeywords, splitByStopWords, isAcceptable }
