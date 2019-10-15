import XRegExp from 'xregexp/src'

/**
 * Split sentence into phrases separated by stop words.
 *
 * @param {String} sentence
 * @param {String[]} stopWords
 *
 * @returns {String[]}
 */
export default (sentence, stopWords) => sentence.split(
    XRegExp(`(?<=^|[\\p{Z}\\p{P}\\p{S}\\r\\n\\t]+)(?:${stopWords.join('|')})(?=[\\p{Z}\\p{P}\\p{S}\\r\\n\\t]+|$)`, 'i')
)
