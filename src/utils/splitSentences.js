import XRegExp from 'xregexp/src'

/**
 * Split text into sentences.
 *
 * @param {String} text
 *
 * @returns {String[]}
 */
export default (text) => text.split(XRegExp(
    /* eslint-disable-next-line */
    '[\\r\\n\\t.,:;!?"\'\\p{Zl}\\p{Zp}\\p{Dash_Punctuation}\\p{Open_Punctuation}\\p{Close_Punctuation}\\p{Initial_Punctuation}\\p{Final_Punctuation}]+',
    'gmi'
))
