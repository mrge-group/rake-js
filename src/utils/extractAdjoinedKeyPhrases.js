import splitWords from '../lib/splitWords'
import options from '../lib/options'

/**
 * Retrieve keywords joined together by by stop words.
 *
 * @param {Phrases} phrases
 *
 * @returns {Phrases}
 */
const extractAdjoinedKeyPhrases = (phrases) => {
    const { result, original, toPhrase, options: overrides } = phrases

    // Retrieve config.
    const stopWords = options(overrides).get('stopWords', [])
    const minKeyWordsPerPhrase = options(overrides).get('minKeyWordsPerPhrase')
    const maxKeyWordsPerPhrase = options(overrides).get('maxKeyWordsPerPhrase')

    // Split original text into separate words.
    const words = splitWords(original)
    const validCandidates = []

    // Step by step through desired word limit per phrase.
    for (let keywordsLimit = minKeyWordsPerPhrase; keywordsLimit <= maxKeyWordsPerPhrase; keywordsLimit++) {
        // Going through list of words.
        for (let candidatePosition = 0; candidatePosition < words.length - keywordsLimit; candidatePosition++) {
            // The beginning word of the possibly valid candidate phrase.
            const candidateWord = words[candidatePosition]

            // Stop if the first word for the possible key phrase is a stop word. Key phrases should not start with
            // a stop word.
            if (stopWords.includes(candidateWord.toLowerCase()) || candidateWord === '') {
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

                    if (stopWords.includes(nextWordForCandidate.toLowerCase())) {
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

    phrases.result = result.concat(validCandidates.map(phrase => toPhrase(phrase.trim())))
    return phrases
}

export default extractAdjoinedKeyPhrases
