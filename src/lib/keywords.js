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
 * @param {Number}   minPhraseFreqAdj
 *
 * @returns {String[]}
 */
const findCandidateKeywords = (sentences, stopWords, {
    minCharLength,
    maxWordsPerPhrase,
    minAdjWordsPerPhrase,
    maxAdjWordsPerPhrase,
    minPhraseFreqAdj
}) => {
    // Build filtered phrases from stop words
    const keywords = splitByStopWords(sentences, stopWords)
    .map(phrase => phrase.trim().toLowerCase())
    .filter(phrase => isAcceptable(phrase, minCharLength, maxWordsPerPhrase))

    // Extract additional candidates
    const keyPhrases = extractRelatedKeyPhrases(
        sentences,
        stopWords,
        minAdjWordsPerPhrase,
        maxAdjWordsPerPhrase,
        minPhraseFreqAdj
    )

    return keywords.concat(keyPhrases)
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

    const words = phrase.split(' ')
    if (words.length > maxWordsPerPhrase) {
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
 * @param {Number}   minPhraseFreqAdj
 *
 * @returns {String[]}
 */
const extractRelatedKeyPhrases = (
    sentences,
    stopWords,
    minAdjWordsPerPhrase,
    maxAdjWordsPerPhrase,
    minPhraseFreqAdj
) => {
    const candidatePhrases = sentences.map(sentence => extractRelatedKeyPhrasesFromSentence(
        sentence,
        stopWords,
        minAdjWordsPerPhrase,
        maxAdjWordsPerPhrase
    )).flat().filter(candidate => candidate.length > 0)

    return filterKeyPhrases(candidatePhrases, minPhraseFreqAdj)
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
    const words = sentence.toLowerCase().split(' ')
    const validCandidates = []

    // Step by step through desired word limit per phrase.
    for (let keywordsLimit = minAdjWordsPerPhrase; keywordsLimit <= maxAdjWordsPerPhrase; keywordsLimit++) {
        // Going through list of words.
        for (let candidatePosition = 0; candidatePosition < words.length - keywordsLimit; candidatePosition++) {
            // Stop if the first word for the possible key phrase is a stop word. Key phrases should not start with
            // a stop word.
            if (stopWords.includes(words[candidatePosition])) {
                continue
            }

            // `candidate` will hold the key phrase, beginning with the first key word.
            const candidate = [words[candidatePosition]]
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
                const nextWordForCandidate = words[candidatePosition + adjoinedPosition]
                candidate.push(nextWordForCandidate)

                if (stopWords.includes(nextWordForCandidate)) {
                    containsStopWord = true
                } else {
                    foundKeyWords++
                }

                adjoinedPosition++
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
 * Returns array with distinct phrases. Phrases must occur more or equal times than `minPhraseFreqAdj` to be valid.
 *
 * @param {String[]} phrases
 * @param {Number}   minPhraseFreqAdj
 *
 * @returns {String[]}
 */
const filterKeyPhrases = (phrases, minPhraseFreqAdj) => [...new Set(phrases)]
.filter(distinctPhrase => phrases.filter(phrase => phrase === distinctPhrase).length >= minPhraseFreqAdj)

export default findCandidateKeywords
export {
    findCandidateKeywords,
    splitByStopWords,
    isAcceptable,
    extractRelatedKeyPhrases,
    extractRelatedKeyPhrasesFromSentence,
    filterKeyPhrases
}
