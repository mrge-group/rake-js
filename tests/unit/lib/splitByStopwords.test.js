import splitByStopWords from '../../../src/lib/splitByStopWords'
import mockData from '../../__mocks__/mockData'

describe('split by stop words', () => {
    const stopWords = mockData.stopwords
    let sentence = 'eins zwei drei vier fünf sechs sieben acht neun zehn'
    const splitWords = splitByStopWords(sentence, stopWords)

    it('should return phrases including whitespaces and removed places', () => {
        expect(splitWords).toEqual([ '', ' zwei drei vier ', ' sechs sieben acht ', ' zehn' ])
    })
})
