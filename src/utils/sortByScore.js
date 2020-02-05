const sortByScore = (phrases) => {
    const { result } = phrases

    phrases.result = result.slice().sort(({ score: scoreA }, { score: scoreB }) => (scoreA > scoreB) ? -1 : 1)

    return phrases
}

export default sortByScore
