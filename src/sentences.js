/**
 * Split text into sentences.
 *
 * @param {String} text
 *
 * @returns {String[]}
 */
const splitSentences = (text) => {
    const delimiters = /[\r\n\t.,:;!?"'\-\u2019\u2013()\[\]]/ig
    return text.split(delimiters)
}

export default splitSentences
export { splitSentences }
