import XRegExp from 'xregexp/src'

/**
 * Split words by characters that are not word characters, digits, underscore, plus, minus and slash.
 *
 * @param {String} words
 *
 * @returns {String[]}
 */
export default (words) => words.split(XRegExp('[^\\p{L}\\p{M}\\-_]+', 'i'))
