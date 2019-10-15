import defaultOptions from './options'
import splitSentences from './utils/splitSentences'
import { findCandidateKeywords } from './lib/keywords'
import { calculateWordScores, calculatePhraseScores } from './lib/scores'

/**
 * @param {String}   text
 *                   The text you want to analyse.
 * @param {String[]} stopWords
 *                   Stop words used to split and score the text.
 * @param {Object}   overrideOptions
 *                   Override default filtering and scoring options.
 *
 * @returns  {{score: Number, phrase: String}[]}
 */
const rake = (text, stopWords = [], overrideOptions = {}) => {
    const options = Object.assign(defaultOptions, overrideOptions)

    const sentences = splitSentences(text)

    const candidatePhrases = findCandidateKeywords(sentences, stopWords, options)

    const wordScores = calculateWordScores(candidatePhrases)

    return calculatePhraseScores(candidatePhrases, wordScores, options)
    .sort((a, b) => (a.score > b.score) ? -1 : 1)
}

export default rake
