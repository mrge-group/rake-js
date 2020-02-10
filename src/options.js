/**
 * This file includes all overridable rake filtering and scoring options.
 */
export default {
    /** Any keyword or phrase must have this length. Non-compliant will be removed. */
    minWordLength: 1,
    /** Any keyword or phrase must must not be longer in length. Non-compliant will be removed. */
    maxWordLength: 20,
    /** Minimal number of individual words (including stop words) per phrase. */
    minKeyWordsPerPhrase: 1,
    /** Maximum number of individual words (including stop words) per phrase. */
    maxKeyWordsPerPhrase: 4,
    /** Minimal number of individual words per phrase. */
    minStopWordsPerPhrase: 0,
    /** Maximum number of individual words per phrase. */
    maxStopWordsPerPhrase: 2
}
