import random
import pygame



class Cell:
    def __init__(self, space, size, color, position):
        self.rect = pygame.Rect(space, (size, size))
        self.color = color
        self.position = position
        
    def draw(self, surface):
        pygame.draw.rect(surface, self.color, self.rect)

    def change_color(self, new_color):
        self.color = new_color
