import splitByStopWords from '../../src/keywords'

describe('split by stop words', () => {
    const stopWords = 'eins fünf neun'
    const sentences = 'eins zwei drei vier fünf sechs sieben acht neun zehn'
    const splitWords = splitByStopWords(sentences, stopWords)
    it('should return phrases that were split by a list of stop words', () => {
        expect(splitWords).toEqual('zwei drei vier sechs sieben acht zehn')
    })
})
