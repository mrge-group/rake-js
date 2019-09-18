import { splitByStopWords } from '../../src/keywords'


describe('split by stop words', () => {
    const stopWords = ['eins', 'fünf', 'neun']
    const sentences = ['eins zwei drei vier fünf sechs sieben acht neun zehn', 'eins eins eins vier']
    const splitWords = splitByStopWords(sentences, stopWords)

    it('should return phrases including whitespaces and removed places', () => {
        expect(splitWords).toEqual(['', ' zwei drei vier ', ' sechs sieben acht ', ' zehn', '', ' ', ' ', ' vier'])
    })
})
