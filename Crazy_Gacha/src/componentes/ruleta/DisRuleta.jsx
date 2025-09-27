import React from 'react'
import { RouletteTable, useRoulette } from 'react-casino-roulette';

const DisRuleta = () => {
    const chips = {
        '1': 'https://github.com/dozsolti/react-casino-roulette/blob/main/example/public/images/blank-chips/white-chip.png?raw=true',
        '10': 'https://github.com/dozsolti/react-casino-roulette/blob/main/example/public/images/blank-chips/blue-chip.png?raw=true',
    }
    const { bets, onBet } = useRoulette();

    return (
        <RouletteTable chips={chips} bets={bets} onBet={onBet(5)} />
    )
}

export default DisRuleta