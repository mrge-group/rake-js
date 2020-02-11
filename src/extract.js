import Phrases from './Classes/Phrases'
import keywordLengthFilter from './utils/keywordLengthFilter'
import distinct from './utils/distinct'
import extractAdjoinedKeyPhrases from './utils/extractAdjoinedKeyPhrases'
import extractKeyPhrases from './utils/extractKeyPhrases'
import sortByScore from './utils/sortByScore'
import scoreWordFrequency from './utils/scoreWordFrequency'
import extractArticlesWithNouns from './utils/extractArticlesWithNouns'

const extract = (text) => new Phrases({ original: text })

export {
    extract,
    keywordLengthFilter,
    distinct,
    extractAdjoinedKeyPhrases,
    extractArticlesWithNouns,
    extractKeyPhrases,
    sortByScore,
    scoreWordFrequency
}
