import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const GRID_SIZE = 4;

const initialGrid = () => Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));

const addRandomTile = (grid: number[][]) => {
  const newGrid = grid.map(row => [...row]);
  const emptyTiles: { r: number, c: number }[] = [];
  newGrid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === 0) emptyTiles.push({ r, c });
    });
  });

  if (emptyTiles.length > 0) {
    const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
  return newGrid;
};

const slide = (row: number[]) => {
  const arr = row.filter(val => val);
  const missing = GRID_SIZE - arr.length;
  const zeros = Array(missing).fill(0);
  return arr.concat(zeros);
};

const combine = (row: number[]) => {
  let score = 0;
  for (let i = 0; i < GRID_SIZE - 1; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2;
      score += row[i];
      row[i + 1] = 0;
    }
  }
  return { newRow: row, score };
};

const rotateGrid = (grid: number[][]) => {
  const newGrid = initialGrid();
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      newGrid[r][c] = grid[c][r];
    }
  }
  return newGrid;
};

const flipGrid = (grid: number[][]) => grid.map(row => row.reverse());

const move = (grid: number[][], direction: 'left' | 'right' | 'up' | 'down') => {
  let newGrid = grid.map(row => [...row]);
  let totalScore = 0;
  let moved = false;

  const operate = (currentGrid: number[][]) => {
    let operatedGrid = currentGrid.map(row => {
      const newRow = slide(row);
      const { newRow: combinedRow, score } = combine(newRow);
      totalScore += score;
      return slide(combinedRow);
    });
    return operatedGrid;
  };

  switch (direction) {
    case 'left':
      newGrid = operate(newGrid);
      break;
    case 'right':
      newGrid = flipGrid(operate(flipGrid(newGrid)));
      break;
    case 'up':
      newGrid = rotateGrid(operate(rotateGrid(newGrid)));
      break;
    case 'down':
      newGrid = rotateGrid(flipGrid(operate(flipGrid(rotateGrid(newGrid)))));
      break;
  }

  moved = JSON.stringify(grid) !== JSON.stringify(newGrid);
  return { newGrid, score: totalScore, moved };
};

const isGameOver = (grid: number[][]) => {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === 0) return false;
      if (r < GRID_SIZE - 1 && grid[r][c] === grid[r + 1][c]) return false;
      if (c < GRID_SIZE - 1 && grid[r][c] === grid[r][c + 1]) return false;
    }
  }
  return true;
};

const tileColors: { [key: number]: string } = {
  0: 'bg-gray-300', 2: 'bg-gray-100 text-gray-800', 4: 'bg-yellow-100 text-yellow-900',
  8: 'bg-orange-300 text-white', 16: 'bg-orange-400 text-white', 32: 'bg-red-400 text-white',
  64: 'bg-red-500 text-white', 128: 'bg-yellow-400 text-white', 256: 'bg-yellow-500 text-white',
  512: 'bg-yellow-600 text-white', 1024: 'bg-indigo-500 text-white', 2048: 'bg-indigo-700 text-white',
};

const Game2048 = () => {
  const [grid, setGrid] = useState(initialGrid());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('2048HighScore') || '0'));

  const startGame = useCallback(() => {
    let newGrid = addRandomTile(initialGrid());
    newGrid = addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;
    let direction: 'left' | 'right' | 'up' | 'down' | null = null;
    switch (e.key) {
      case 'ArrowLeft': direction = 'left'; break;
      case 'ArrowRight': direction = 'right'; break;
      case 'ArrowUp': direction = 'up'; break;
      case 'ArrowDown': direction = 'down'; break;
    }
    if (direction) {
      e.preventDefault();
      const { newGrid, score: moveScore, moved } = move(grid, direction);
      if (moved) {
        const gridWithNewTile = addRandomTile(newGrid);
        setGrid(gridWithNewTile);
        const newTotalScore = score + moveScore;
        setScore(newTotalScore);
        if (newTotalScore > highScore) {
          setHighScore(newTotalScore);
          localStorage.setItem('2048HighScore', newTotalScore.toString());
        }
        if (isGameOver(gridWithNewTile)) {
          setGameOver(true);
        }
      }
    }
  }, [grid, score, gameOver, highScore]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <h1 className="text-5xl font-bold text-gray-800">2048</h1>
        <div className="flex gap-2">
          <div className="bg-gray-300 p-3 rounded-lg text-center">
            <div className="text-sm font-bold text-gray-600">SCORE</div>
            <div className="text-2xl font-bold text-gray-800">{score}</div>
          </div>
          <div className="bg-gray-300 p-3 rounded-lg text-center">
            <div className="text-sm font-bold text-gray-600 flex items-center gap-1"><Trophy size={14}/> BEST</div>
            <div className="text-2xl font-bold text-gray-800">{highScore}</div>
          </div>
        </div>
      </div>
      <div className="bg-gray-400 p-2 rounded-lg relative">
        {gameOver && (
          <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center rounded-lg">
            <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
            <Button onClick={startGame}><RotateCcw className="mr-2 h-4 w-4" /> Try Again</Button>
          </div>
        )}
        <div className="grid grid-cols-4 gap-2">
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div key={`${r}-${c}`} className={cn(
                "w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-md font-bold text-3xl md:text-4xl transition-all duration-300",
                tileColors[cell] || 'bg-gray-300'
              )}>
                {cell > 0 && cell}
              </div>
            ))
          )}
        </div>
      </div>
      <Button onClick={startGame} className="mt-4"><RotateCcw className="mr-2 h-4 w-4" /> New Game</Button>
    </div>
  );
};

export default Game2048;