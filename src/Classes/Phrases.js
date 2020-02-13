import Phrase from './Phrase'

/**
 * Represents multiple phrases as a result set
 * and provides methods for piping phrases through processing methods.
 */
class Phrases {

    constructor({ result = [], original = '', options = {} }) {
        this._result = result
        this._original = original
        this._options = options
    }

    /**
     * Pipe phrases result set into given method.
     *
     * @param {CallableFunction} method
     * @returns {Phrases}
     */
    pipe(method) {
        const pipelined = method(this.fresh())

        if (!(pipelined instanceof Phrases)) {
            throw 'Pipeline Methods must return an instance of Phrases.'
        }

        return pipelined
    }

    /**
     * Creates phrase object from given arguments.
     *
     * @param {String} phrase
     * @param {Number} score
     * @returns {Phrase}
     */
    toPhrase(phrase, score = 0) {
        return new Phrase(phrase, score)
    }

    /**
     * Get results generated previously.
     *
     * @returns {Phrase[]}
     */
    get result() {
        return this._result
    }

    /**
     * Store result set of phrases. Object will be created anew.
     *
     * @param {Phrase[]} result
     * @returns {Phrases}
     */
    set result(result) {
        if (!(result instanceof Array) || !result.every(phrase => (phrase instanceof Phrase))) {
            throw 'Results must be instances of Phrase.'
        }

        this._result = result
    }

    /**
     * Get text originally created before processing pipelines.
     *
     * @returns {string}
     */
    get original() {
        return this._original
    }

    /**
     * Prevent changing original property.
     *
     * @param _
     */
    set original(_) {
        throw 'You shall not change the original content.'
    }

    /**
     * Set options between pipelines. Object will be created anew.
     *
     * @param {Object} options
     * @returns {Phrases}
     */
    setOptions(options= {}) {
        return this.fresh({ options: Object.assign(this._options, options) })
    }

    /**
     * Get options.
     *
     * @returns {Object}
     */
    get options() {
        return this._options
    }

    /**
     * Prevent changing options property.
     *
     * @param _
     */
    set options(_) {
        throw 'You shall not change the options inline.'
    }

    /**
     * Create new object to ensure immutability.
     *
     * @param {{result: <Phrase[]>, original: <String>, options: <Object>}} args
     * @returns {Phrases}
     */
    fresh(args) {
        return new Phrases(Object.assign({
            result: this._result,
            original: this._original,
            options: this._options
        }, args))
    }
}

export default Phrases
