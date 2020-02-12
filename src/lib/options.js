import defaults from '../options'

/**
 * Use and override default and user submitted options.
 *
 * @param {Object} overrides
 *
 * @returns {Object}
 */
export default (overrides) => ({
    options: Object.assign(defaults, overrides),

    /**
     * Get value for key.
     *
     * @param {String} key
     * @param {*}      defaultValue
     * @returns {*}
     */
    get(key, defaultValue = null) {
        if (Object.hasOwnProperty.call(this.options, key)) {
            return this.options[key]
        }

        return defaultValue
    }
})
