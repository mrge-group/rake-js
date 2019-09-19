import splitSentences from '../../src/lib/sentences'
import mockData from '../__mocks__/mockData'

describe('splitSentences', () => {
    const standard = mockData.defaultText
    it('should return an array of strings', () => {
        expect(splitSentences(standard)).toBeInstanceOf(Array)
    })
})
