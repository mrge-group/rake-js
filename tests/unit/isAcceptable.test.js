import { isAcceptable } from '../../src/utils/keywords'

describe('isAcceptable', () => {
    const phraseOne = 'lirum larum löffelstiel lol rofl frodo baggins'
    const phraseTwo = '1233 38287 2228 abc'

    it('should have correct length', () => {
        const phraseTooLong = isAcceptable(phraseOne, 2, 4)
        const justRightLength = isAcceptable(phraseOne, 2, 7)
        expect(phraseTooLong).toBeFalsy()
        expect(justRightLength).toBeTruthy()
    })

    it('should not have more digits than chars', () => {
        const tooManyDigits = isAcceptable(phraseTwo, 1, 10)
        expect(tooManyDigits).toBeFalsy()
    })
})
