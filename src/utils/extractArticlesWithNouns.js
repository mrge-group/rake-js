import options from '../lib/options'

/**
 * Retrieve article noun combinations.
 *
 * @param {Phrases} phrases
 *
 * @returns {Phrases}
 */
const extractArticlesWithNouns = (phrases) => {
    const { result, original, toPhrase, options: overrides } = phrases
    const articles = options(overrides).get('articles', [])

    const originalLowerCase = original.toLowerCase()
    const returnResult = []

    articles.map(article => {
        result.map(phrase => {
            const combined = `${article} ${phrase.phrase.toLowerCase()}`
            if (originalLowerCase.includes(combined)) {
                const nounString = original.substr(originalLowerCase.indexOf(combined), combined.length)
                if (nounString.match(/\b[A-Z]\S+/g)) {
                    returnResult.push({
                        phrase: phrase.phrase,
                        score: phrase.score
                    })
                }
            }
        })
    })
    phrases.result = boostScore(returnResult).map(phrase => toPhrase(phrase.phrase, phrase.score))
    return phrases
}

/** Boosts article noun combinations and removes duplicates
 *
 * @param phrases
 * @returns {[]}
 */

const boostScore = (phrases) => {
    const phraseArr = phrases.map(phrase => phrase.phrase).sort()
    const resultArr = []
    let current = phraseArr[0]
    let count = 0
    phraseArr.forEach(term => {
        if (term === current) {
            count++
        } else {
            resultArr.push({
                phrase: current,
                score: count,
            })
            current = term
            count = 1
        }
    })

    for (let i = 0; i < resultArr.length; i++) {
        const multiplierPhrase = resultArr[i]
        for (let j = 0; j < phrases.length; j++) {
            if (multiplierPhrase.phrase === phrases[j].phrase) {
                multiplierPhrase.score *= phrases[j].score
                break
            }
        }
        phrases.shift()
    }

    return resultArr
}


export default extractArticlesWithNouns
