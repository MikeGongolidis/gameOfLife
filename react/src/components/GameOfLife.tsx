import React, { useRef, useEffect, useState } from "react";

import { generateInitialCells, renderCells, cellIteration } from "../utils";
import Slider from "./Slider";

type Coordinate = [number, number];

type Cell = {
    x: number;
    y: number;
    alive: boolean;
  };

type GameOfLifeProps = {
    gridSize: number;
    cellSize: number;
    colors: {
        alive: string;
        dead: string;
    };
};

const GameOfLife: React.FC<GameOfLifeProps> = ({
    gridSize,
    cellSize,
    colors,
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);
    const [cells, setCells] = useState<Cell[]>([]);
    const [aliveCells, setAliveCells] = useState<Coordinate[]>([]);
    const [start, setStart] = useState<boolean>(false)
    const [randomizeStart, setRandomizeStart] = useState<boolean>(false)

    const [updateFrequency, setUpdateFrequency] = useState(100);

    // Calculate the canvas dimensions based on the grid and cell sizes
    const canvasWidth = gridSize * cellSize;
    const canvasHeight = gridSize * cellSize;


    useEffect(() => {
        if (canvasRef.current && bgCanvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          const bgCanvas = bgCanvasRef.current;
          const bgCtx = bgCanvas.getContext("2d");

          // Resize the canvas to match the calculated dimensions
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;

          // Resize the canvas to match the calculated dimensions
          bgCanvas.width = canvasWidth;
          bgCanvas.height = canvasHeight;          

          // Generate an initial grid of cells
          const { initialCells, aCells }: { initialCells: Cell[]; aCells: Coordinate[]; } = generateInitialCells(gridSize,randomizeStart);
          setCells(initialCells);
          setAliveCells(aCells);

          // Render the initial grid of cells
          renderCells(ctx, initialCells, cellSize, colors);
          if (!bgCtx) {
            return;
          }
          initialCells.forEach((cell) => {
            bgCtx.strokeStyle = "#000";
            bgCtx.strokeRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);

          })

        }
    }, [canvasRef, gridSize, cellSize, colors, randomizeStart, canvasWidth, canvasHeight]);

    useEffect( () => {

        const updateCanvas = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                const { cellCopy, aCells }: { cellCopy: Cell[]; aCells: Coordinate[]; } = cellIteration(cells, gridSize, aliveCells);
                setCells(cellCopy)
                setAliveCells(aCells)

                renderCells(ctx, cellCopy, cellSize, colors);
                
            }
        }
        
        if(start){
            const intervalId = setInterval(() => {
                updateCanvas();
            }, updateFrequency);
              
              // clean up the timer when the component is unmounted
            return () => clearInterval(intervalId);
        }
    } ,[cells, aliveCells, start, updateFrequency])


    return (
        <>
        <div className="flex flex-col ">
        <button onClick={() => start ? setStart(false) : setStart(true)}>
          {start ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => randomizeStart ? setRandomizeStart(false) : setRandomizeStart(true)}>
          {randomizeStart ?  'Reset': 'Randomize Initial Alive Cells'}
        </button>
        <Slider
            min={10}
            max={1000}
            value={updateFrequency}
            onChange={setUpdateFrequency}
        />
        </div>
        <div className="relative top-0 left-1/4 mx-auto">
            <canvas
            ref={bgCanvasRef}
            className="absolute z-10 border-zinc-900 opacity-20"
            width={canvasWidth}
            height={canvasHeight}
            ></canvas>
            <canvas
            ref={canvasRef}
            className="absolute z-0 border-zinc-900"
            width={canvasWidth}
            height={canvasHeight}
            ></canvas>

        </div>
        
        </>

    );
};

export default GameOfLife;





