/**
 * This file includes all overridable rake filtering and scoring options.
 */
export default {
    /** Any keyword or phrase must have this length. Non-compliant will be removed. */
    minCharLength: 1,
    /** Maximal count of words in a loose keyword phrase. Non-compliant will be removed. */
    maxWordsPerPhrase: 5,
    /** The frequency a keyword or phrase must be present at scoring. Non-compliant will be removed. */
    minKeywordFrequency: 1,
    /** Key phrases will have at least this number of keywords. */
    minAdjWordsPerPhrase: 1,
    /** Key phrases will have only this number of keywords at maximal. */
    maxAdjWordsPerPhrase: 3,
    /** Same as minKeywordFrequency, only applying for key phrases. */
    minAdjPhraseFreq: 1
}
