import XRegExp from 'xregexp/src'

/**
 * Split sentences into phrases separated by stop words.
 *
 * @param {String[]} sentences
 * @param {String[]} stopWords
 *
 * @returns {String[]}
 */
export default (sentences, stopWords) => sentences.flatMap(sentence => sentence.split(
    XRegExp(`(?<=^|[\\p{Z}\\p{P}\\p{S}\\r\\n\\t]+)(?:${stopWords.join('|')})(?=[\\p{Z}\\p{P}\\p{S}\\r\\n\\t]+|$)`, 'i')
))
