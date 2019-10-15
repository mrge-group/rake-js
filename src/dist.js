import rake from './rake'

window.Rake = (text, stopWordsAttribute = [], overrideOptions = {}) => {
    let relevantStopWords = []

    if (stopWordsAttribute.length > 0) {
        relevantStopWords = stopWordsAttribute
    } else if (window.RakeStopWords instanceof Array) {
        relevantStopWords = RakeStopWords
    }

    return rake(text, relevantStopWords, overrideOptions)
}
