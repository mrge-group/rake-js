import rake from './rake'

/**
 * Standalone distribution of rake method.
 *
 * @param {String}   text
 *                   The text you want to analyse.
 * @param {String[]} stopWordsAttribute
 *                   Stop words used to split and score the text.
 * @param {Object}   overrideOptions
 *                   Override default filtering and scoring options.
 *
 * @returns  {{score: Number, phrase: String}[]}
 */
window.Rake = (text, stopWordsAttribute = [], overrideOptions = {}) => {
    let relevantStopWords = []

    if (stopWordsAttribute.length > 0) {
        relevantStopWords = stopWordsAttribute
    } else if (window.RakeStopWords instanceof Array) {
        relevantStopWords = RakeStopWords
    }

    return rake(text, relevantStopWords, overrideOptions)
}
