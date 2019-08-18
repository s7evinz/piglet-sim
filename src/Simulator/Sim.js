import { getRandomIntInclusive, sum } from '../common';

class PigletGame {
  constructor() {
    this.money_bag = 0;
    this.round = 0;
    this.winningStreak = 0;
    this.over = false;
  }

  roll() {
    if (this.over) {
      throw new Error('Cannot roll when the game is already over.');
    }
    this.round++;
    const diceValue = getRandomIntInclusive(1, 6);
    if (diceValue > 1) {
      this.winningStreak++;
      this.money_bag += diceValue;
    } else {
      this.money_bag = 0;
      this.over = true;
    }
  }

  takeHome() {
    if (this.over) {
      throw new Error('Cannot takeHome when the game is already over.');
    }
    this.over = true;
  }

  get result() {
    return {
      streak: this.winningStreak,
      winnings: this.money_bag,
    }
  }
}

class StratOnRollCount {
  constructor(count) {
    this.count = count;
  }

  play() {
    const game = new PigletGame();
    while (!game.over) {
      if (game.round >= this.count) {
        game.takeHome();
        break;
      } else {
        game.roll();
      }
    }
    this.result = game.result;
    return this;
  }
}

class StratOnWinnings {
  constructor(amount) {
    this.amount = amount;
  }

  play() {
    const game = new PigletGame();
    while (!game.over) {
      if (game.money_bag > this.amount) {
        game.takeHome();
        break;
      } else {
        game.roll();
      }
    }
    this.result = game.result;
    return this;
  }
}

class Sim {
  constructor(simAmount, strategy) {
    this.simAmount = simAmount;
    this.strategy = strategy;
    this.reset();
  }

  run() {
    this.timer = setInterval(() => {
      if (++this.counter <= this.simAmount) {
        // run the sim
        const result = this.strategy.play().result;
        const { winnings, streak } = result;
        this.totalWinnings += winnings;
        this.totalStreaks += streak;
        this._setBestResults(winnings, streak);
        console.log('xx this.result.best.winnings:', this.result.best.winnings);
      } else {
        clearInterval(this.timer);
        const avgWinnings = this.totalWinnings / this.counter;
        const avgStreaks = this.totalStreaks / this.counter;
        this._setAvgResults(avgWinnings, avgStreaks);
        this.completed = true;
        console.log('xx this.result.avg.winnings:', this.result.avg.winnings);
      }
    }, 10);
  }

  pause() {
    clearInterval(this.timer);
  }

  stop() {
    clearInterval(this.timer);
    this.reset();
  }

  _setAvgResults(avgWinnings, avgStreaks) {
    this.result.avg = {
      streak: avgStreaks,
      winnings: avgWinnings,
    };
  }

  _setBestResults(winnings, streak) {
    const { best } = this.result;
    best.winnings = Math.max(best.winnings, winnings);
    best.streak = Math.max(best.streak, streak);
    // const currentBestWinnings = best.winnings;
    // const currentBestStreak = best.streak;
    // this.result.best.winnings = Math.max(currentBestWinnings, winnings);
    // this.result.best.streak = Math.max(currentBestStreak, streak);
  }

  reset() {
    this.counter = 0;
    this.completed = false;
    this.totalWinnings = 0;
    this.totalStreaks = 0;
    this.result = {
      avg: { 
        streak: null,
        winnings: null,
      },
      best: {
        streak: null,
        winnings: null,
      },
    };
  }
}

export default Sim;

export {
  StratOnRollCount,
  StratOnWinnings,
}