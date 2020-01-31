import splitWords from '../utils/splitWords'
import splitByStopWords from '../utils/splitByStopWords'
import defaultOptions from "../options";

/**
 * Extract combined list of keywords and phrases with related keywords. This list is not ranked and will contain
 * irrelevant data.
 *
 * @param {String[]} sentences
 * @param {String[]} stopWords
 * @param {Number}   minCharLength
 * @param {Number}   maxWordsPerPhrase
 * @param {Number}   minAdjWordsPerPhrase
 * @param {Number}   maxAdjWordsPerPhrase
 * @param {Number}   minAdjPhraseFreq
 *
 * @returns {String[]}
 */
const findCandidateKeywords = (sentences, stopWords, {
    minCharLength,
    maxWordsPerPhrase,
    minAdjWordsPerPhrase,
    maxAdjWordsPerPhrase,
    minAdjPhraseFreq
}) => {
    // Build filtered phrases from stop words
    const looseKeywords = sentences.flatMap(sentence => splitByStopWords(sentence, stopWords))
        .map(phrase => phrase.trim())
        .filter(phrase => isAcceptable(phrase, minCharLength, maxWordsPerPhrase))
    // Extract additional candidates
    const keyPhrases = extractRelatedKeyPhrases(
        sentences,
        stopWords,
        minAdjWordsPerPhrase,
        maxAdjWordsPerPhrase,
        minAdjPhraseFreq
    )
    return looseKeywords.concat(keyPhrases)
}

/**
 * Returns true if a phrase is acceptable, otherwise false.
 * A phrase is acceptable if the phrase has at least minCharLength of characters, not more than maxWordsPerPhrase of
 * words and the phrase has more non-numeric characters than numeric.
 *
 * @param {String} phrase
 * @param {Number} minCharLength
 * @param {Number} maxWordsPerPhrase
 *
 * @returns {boolean}
 */
const isAcceptable = (phrase, minCharLength, maxWordsPerPhrase) => {
    if (phrase.length < minCharLength) {
        return false
    }
    const words = splitWords(phrase)
    if ((maxWordsPerPhrase > 1 && words.length > maxWordsPerPhrase) || (maxWordsPerPhrase === 1 && words.length > maxWordsPerPhrase)) {
        return false
    }
    const alpha = (phrase.match(/\D/g) || []).length
    const digits = (phrase.match(/\d/g) || []).length

    if (alpha === 0) {
        return false
    }

    return alpha > digits
}

/**
 * Extracts key phrases from sentences.
 *
 * @param {String[]} sentences
 * @param {String[]} stopWords
 * @param {Number}   minAdjWordsPerPhrase
 * @param {Number}   maxAdjWordsPerPhrase
 * @param {Number}   minAdjPhraseFreq
 *
 * @returns {String[]}
 */
const extractRelatedKeyPhrases = (
    sentences,
    stopWords,
    minAdjWordsPerPhrase,
    maxAdjWordsPerPhrase,
    minAdjPhraseFreq
) => {
    const candidatePhrases = sentences.flatMap(sentence => extractRelatedKeyPhrasesFromSentence(
        sentence,
        stopWords,
        minAdjWordsPerPhrase,
        maxAdjWordsPerPhrase
    ))

    return filterKeyPhrases(candidatePhrases, minAdjPhraseFreq)
}

/**
 * Returns array of phrases and related parts of supplied sentence. Candidate key phrases must be separated by at least
 * one stop word. Depending on the min and max adjoined words per sentence similar keywords in different flavors will
 * be included.
 *
 * @param {String}   sentence
 * @param {String[]} stopWords
 * @param {Number}   minAdjWordsPerPhrase
 * @param {Number}   maxAdjWordsPerPhrase
 *
 * @returns {String[]}
 */
const extractRelatedKeyPhrasesFromSentence = (sentence, stopWords, minAdjWordsPerPhrase, maxAdjWordsPerPhrase) => {
    const words = splitWords(sentence)
    const validCandidates = []

    // Step by step through desired word limit per phrase.
    for (let keywordsLimit = minAdjWordsPerPhrase; keywordsLimit <= maxAdjWordsPerPhrase; keywordsLimit++) {
        // Going through list of words.
        for (let candidatePosition = 0; candidatePosition < words.length - keywordsLimit; candidatePosition++) {
            // The beginning word of the possibly valid candidate phrase.
            const candidateWord = words[candidatePosition]

            // Stop if the first word for the possible key phrase is a stop word. Key phrases should not start with
            // a stop word.
            if (stopWords.includes(candidateWord) || candidateWord === '') {
                continue
            }

            // `candidate` will hold the key phrase, beginning with the first key word.
            const candidate = [candidateWord]
            // `adjoinedPosition` is the current word position for the next loop going through words
            // for the current key phrase.
            let adjoinedPosition = 1
            // `foundKeyWords` is the count of found key words without stop words.
            let foundKeyWords = 1
            // `containsStopWord` indicates if stop words were found in the phrase.
            let containsStopWord = false

            // Get follow up words after candidate phrase beginning until we found enough keywords or we are at the end
            // of the sentence.
            while (foundKeyWords < keywordsLimit && candidatePosition + adjoinedPosition < words.length) {
                const nextWordForCandidate = words[candidatePosition + adjoinedPosition++]

                if (nextWordForCandidate !== '') {
                    candidate.push(nextWordForCandidate)

                    if (stopWords.includes(nextWordForCandidate)) {
                        containsStopWord = true
                    } else {
                        foundKeyWords++
                    }
                }
            }

            // Summary: We have a valid candidate phrase if we have at least one stop word in our phrase, the phrase is
            // not starting or ending with a stop word and we have `keywordsLimit` keywords.
            if (containsStopWord
                && !stopWords.includes(candidate[candidate.length - 1])
                && foundKeyWords === keywordsLimit
            ) {
                validCandidates.push(candidate.join(' '))
            }
        }
    }

    return validCandidates
}

/**
 * Returns array with distinct phrases. Must be larger than minKeywordFrequency
 *
 * @param candidatePhrases
 * @param minKeywordFrequency
 * @returns {String[]}
 */
const filterDistinctPhrases = (candidatePhrases, {minKeywordFrequency}) => [...new Set(candidatePhrases)]
    .filter(distinctPhrase => candidatePhrases.find(phrase => phrase === distinctPhrase).length > minKeywordFrequency)

/**
 * Returns array with distinct phrases. Phrases must occur more or equal times than `minAdjPhraseFreq` to be valid.
 *
 * @param {String[]} phrases
 * @param {Number}   minAdjPhraseFreq
 *
 * @returns {String[]}
 */
const filterKeyPhrases = (phrases, minAdjPhraseFreq) => [...new Set(phrases)]
    .filter(distinctPhrase => phrases.filter(phrase => phrase === distinctPhrase).length >= minAdjPhraseFreq)

export default findCandidateKeywords
export {
    findCandidateKeywords,
    isAcceptable,
    extractRelatedKeyPhrases,
    extractRelatedKeyPhrasesFromSentence,
    filterKeyPhrases,
    filterDistinctPhrases
}
