import splitSentences from '../../src/lib/splitSentences'
import mockData from '../__mocks__/mockData'

describe('splitSentences', () => {
    const standard = mockData.defaultText
    const specialChars = mockData.specialChars
    it('should return an array of strings', () => {
        expect(splitSentences(standard)).toBeInstanceOf(Array)
    })

    it('should split at the delimiters and remove them', () => {
        console.log(specialChars)
        expect(splitSentences(specialChars)).not.toBe(mockData.specialChars)
    })
})
