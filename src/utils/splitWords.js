/**
 * Split words by characters that are not word characters, digits, underscore, plus, minus and slash.
 *
 * @param {String} words
 *
 * @returns {string[]}
 */
export default (words) => {
    return words.split(new RegExp('[^\\w\\däöüß+\\-]', 'i'))
}
