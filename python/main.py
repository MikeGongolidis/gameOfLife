import pygame

from cell import Cell
from grid import Grid


# Initialize Pygame
pygame.init()

# Define panel size and gap size
panel_size = (1040, 1480)
gap_size = 2

# Calculate square size based on panel size and number of squares
num_squares = 40
square_size = (panel_size[0] - (num_squares + 1) * gap_size) // num_squares

# Define colors
black = (0, 0, 0)
white = (255, 255, 255)

# Create panel
panel = pygame.display.set_mode(panel_size)
pygame.display.set_caption("Grid Panel")

# Create grid of squares and get the list of Rect objects
grid = Grid(40, 20, 2, panel)

color_change_timer_event = pygame.USEREVENT + 1
pygame.time.set_timer(color_change_timer_event, 500)


# Main game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == color_change_timer_event:
            grid.update_cells()

    # Update the panel
    panel.fill(white)
    grid.draw(panel)
    pygame.display.flip()


# Quit Pygame
pygame.quit()
