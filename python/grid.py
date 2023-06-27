import pygame
import random 
from cell import Cell

class Grid:
    def __init__(self, num_squares, square_size, gap_size, panel):
        self.cells = []
        self.panel = panel
        self.gap_size = gap_size
        self.black_cells = set()
        # Create a Cell object for each square on the grid
        for x in range(num_squares):
            for y in range(num_squares):
                cell_x = (square_size + gap_size) * x + gap_size
                cell_y = (square_size + gap_size) * y + gap_size
                if random.random() < 0.05: # 10% chance of cell being black
                    cell_color = 'black'
                    self.black_cells.add((x, y)) # Add position to set of black cells
                else:
                    cell_color = 'white'
                cell = Cell((cell_x, cell_y), square_size, cell_color, (x,y))
                self.cells.append(cell)
        
    def draw(self, surface):
        # Draw each cell on the grid
        for cell in self.cells:
            cell.draw(surface)


    def update_cells(self):
        # Check each cell's neighbors and change its color if necessary
        for cell in self.cells:
            black_counter = self.black_neighbors(cell)
            #Rule1   
            if (black_counter == 2 or black_counter == 3 ) and cell.color == 'black':
                cell.change_color('black')
                cell.draw(self.panel)
                if (cell.position[0],cell.position[1]) not in self.black_cells:
                    self.black_cells.add((cell.position[0],cell.position[1])) # Add position to set of black cells

            #Rule2   
            elif black_counter == 3 and cell.color == 'white':
                cell.change_color('black')
                cell.draw(self.panel)
                if (cell.position[0],cell.position[1]) not in self.black_cells:
                    self.black_cells.add((cell.position[0],cell.position[1])) # Add position to set of black cells
            else:
                cell.change_color('white')
                cell.draw(self.panel)
                if (cell.position[0],cell.position[1]) in self.black_cells:
                    self.black_cells.remove((cell.position[0],cell.position[1])) # Add position to set of black cells                
            
    def black_neighbors(self, cell):
        # Get a list of all neighboring cells for a given cell
        black_neighbors = 0
        x, y = cell.rect.x, cell.rect.y

        neighbors = [(cell.position[0]-1, cell.position[1]-1), 
                     (cell.position[0], cell.position[1]-1), 
                     (cell.position[0]+1, cell.position[1]-1), 
                     (cell.position[0]-1, cell.position[1]), 
                     (cell.position[0]+1, cell.position[1]), 
                     (cell.position[0]-1, cell.position[1]+1), 
                     (cell.position[0], cell.position[1]+1), 
                     (cell.position[0]+1, cell.position[1]+1)]
        for neighbor in neighbors:
                if neighbor in self.black_cells:
                    black_neighbors+=1
        return black_neighbors
