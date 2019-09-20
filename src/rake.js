import defaultOptions from './options'
import { splitSentences } from './lib/sentences'
import { findCandidateKeywords } from './lib/keywords'
import { calculateWordScores, calculatePhraseScores } from './lib/scores'

const rake = (text, stopWords = [], overrideOptions = {}) => {
    const options = Object.assign(defaultOptions, overrideOptions)

    const sentences = splitSentences(text)

    const candidatePhrases = findCandidateKeywords(sentences, stopWords, options)

    const wordScores = calculateWordScores(candidatePhrases)

    return calculatePhraseScores(candidatePhrases, wordScores, options)
    .sort((a, b) => (a.score > b.score) ? -1 : 1)
}

export default rake
