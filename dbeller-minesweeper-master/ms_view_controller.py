import pyglet
from pyglet import shapes
import sys
import traceback
import os
import ms_view_model


# 1 Recuper la valeur du parametre
# 2 Configurer le dictionnaire 
#   - Ajouter les bombes
#   - Ajouter les nombres autours
# 3 Afficher 
def display_game_informations(size):
    game_play_text = "Grid size: " + str(size) + "*" + str(size)
    bombs_number = "Bombs number: " + ms_view_model.bombs_number()
    game_status = "Playing"
    pyglet.text.Label(game_play_text + bombs_number + game_status, x=xlabel, y=ylabel).draw()


# Todo: Afficher la grille dans un premiers temps avec les chiffres et bombes
# Todo: Dans un deuxième temps avec les caractères carrée gris(equivalent state hidden) 
def display_cells(grid):
    xlabel = 0
    ylabel = height - ms_view_model.rect_height
    for cells in grid:
        xlabel = 0
        for cell in cells:
            content = ms_view_model.cell_for_row(cell.get("content"), cell.get("state"))
            if(cell.get("state") == "visible"):
                label = pyglet.text.Label(str(content), x=xlabel, y=ylabel, anchor_x="left", anchor_y="bottom")
                label.draw()
            else:
                rect = shapes.Rectangle(xlabel, 
                                        ylabel, 
                                        ms_view_model.rect_width, 
                                        ms_view_model.rect_height, 
                                        color = color, 
                                        batch = batch).draw()
            xlabel += ms_view_model.cell_space + ms_view_model.rect_width
        ylabel -= ms_view_model.cell_space + ms_view_model.rect_height


def display_cells_for_mac(grid):
    xlabel = (width - width_height) / 2
    ylabel = (height - width_height) / 2
    for cells in grid:
        xlabel = (width - width_height) / 2
        for cell in cells:
            content = ms_view_model.cell_content(cell.get("content"), cell.get("state"))
            label = pyglet.text.Label(str(content), x=xlabel, y=ylabel).draw()
            xlabel += ms_view_model.cell_space
        ylabel += ms_view_model.cell_space


try:
    display = pyglet.canvas.get_display()
    screen = display.get_default_screen()
    config = screen.get_best_config()
    # Recuperer la valeur de la taille en argument
    size = ms_view_model.check_argument(sys.argv)
    # Todo: Creer la windows en fonction de la largeur dynamique
    width = ms_view_model.screen_width(size)
    height = ms_view_model.screen_height(size)
    # window = pyglet.window.Window(config=config)
    window = pyglet.window.Window(width, height)
    # Creating a batch obect
    batch = pyglet.graphics.Batch()
    color = (255, 25, 25)

    start_grid = ms_view_model.configure_grid(size)

    @window.event
    def on_draw():
        window.clear()
        display_cells(start_grid)


    # A chaque click de la souris la methode on_draw est appelée
    # Si on clique sur un nombre > 0, ca affiche le nombre
    # Si tu clique sur 0 ca cherche les chiffres autour (ligne haut, bas, gauche et droite)
    @window.event
    def on_mouse_release(x, y, button, modifiers):
        if(button == 1): # Select cell
            line_colum = ms_view_model.coord_to_index(x, y, height, start_grid)
            ms_view_model.check_number_around(line_colum[0], line_colum[1], start_grid)
        else: # Set flag for cell who potentialy contains bomb
            print("0")

    
    pyglet.app.run()
except ValueError:
        traceback.print_exc()


