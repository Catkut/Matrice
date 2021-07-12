import pyglet
import sys

from minesweeper_controller import make_empty_ms_grid
from minesweeper_controller import place_bombs
from minesweeper_controller import place_numbers


# 1 Recuper la valeur du parametre
# 2 Configurer le dictionnaire 
#   - Ajouter les bombes
#   - Ajouter les nombres autours
# 3 Afficher 


# Variables globale
space = 5
cell ="◻️"


# Todo: Recuperer la size depuis la ligne de commande
# Premier paramètre de sys.argv
try:
    # arguments = sys.argv[1:]
    # if(arguments[0] == fly_key):
    #     fly(arguments[1])
    # if(arguments[0] == navigate_key):
    #     navigate(arguments[1])

    if sys.argv[1]:
        size = int(sys.argv[1])
except Exception:
    print("You must add command line argument: size of the grid!")
    size = 3
finally:
    print("finally-size:", size)

# Todo: Calculer la largeur e hauteur de la vue
largeur = (size * len(cell)) + (size * space)


display = pyglet.canvas.get_display()
screen = display.get_default_screen()
config = screen.get_best_config()


# Todo: Creer la windows en fonction de la largeur dynamique
window = pyglet.window.Window(config=config)


# Todo: Configurer la grille avec les bombes et nombres
def configure_cells(size):
    grid = make_empty_ms_grid(size)
    place_bombs(grid)
    place_numbers(grid)
    return grid


# Todo: Afficher la grille dans un premiers temps avec les chiffres et bombes
# Todo: Dans un deuxième temps avec les caractères carrée gris(equivalent state hidden) 
def display_grid(cells):
    print()




cells = configure_cells(size)



@window.event
def on_draw():
    display_grid(cells)
   
pyglet.app.run()