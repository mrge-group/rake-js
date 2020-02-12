import { splitByStopWords } from '../../src/utils/keywords'
import mockData from '../__mocks__/mockData'


describe('split by stop words', () => {
    const stopWords = mockData.stopwords
    let sentences = ['eins zwei drei vier fünf sechs sieben acht neun zehn', 'eins eins eins vier']
    const splitWords = splitByStopWords(sentences, stopWords)

    it('should return phrases including whitespaces and removed places', () => {
        expect(splitWords).toEqual(['', ' zwei drei vier ', ' sechs sieben acht ', ' zehn', '', ' ', ' ', ' vier'])
    })

    sentences = ['zwei drei drei', 'sieben sieben sechs sechs zwei', 'vier vier']
    const newWords = splitByStopWords(sentences, stopWords)

    it('should not split when no split word ist present and return no white space', () => {
        expect(newWords).toEqual(['zwei drei drei', 'sieben sieben sechs sechs zwei', 'vier vier'])
    })
})
