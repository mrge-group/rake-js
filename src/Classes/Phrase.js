/**
 * Represents a single phrase with score.
 */
class Phrase {
    /**
     * @param {String} phrase
     * @param {Number} score
     */
    constructor(phrase, score = 0) {
        this.phrase = phrase
        this.score = score
    }
}

export default Phrase
