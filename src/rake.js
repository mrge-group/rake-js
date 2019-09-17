import defaultOptions from './options'
import splitSentences from './sentences'
import findCandidateKeywords from './keywords'

const rake = (text, stopWords = [], overrideOptions = {}) => {
    const options = Object.assign(defaultOptions, overrideOptions)

    const sentences = splitSentences(text)

    const candidateKeywords = findCandidateKeywords(sentences, stopWords, options)

    const wordScores = calculateWordScores(candidateKeywords)
}

export default rake
