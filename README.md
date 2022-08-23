# BitGo
is a tile-based browser implementation of the game Binary Sudoku.
Preset tiles may not be changed. Gray tiles may be clicked once to change their color to red, and clicked again to change their color to blue. To win, players must solve the board by adhering to three rules of logic: 

* Each row and column must contain an equal amount of red tiles and blue tiles

* Each row and column must be unique 

* More than two of the same colored tiles placed consecutively in a row or column are not allowed

> To play, simply launch the file in localhost and navigate to the designated port in your browser!

**_Abstract_**

While BitGo appears relatively straightforward on the surface, it was quite a challenge to build. The challenge lies in randomly generating a preset, *solvable* board for players to decipher. Initially, it seemed the only hurdle to overcome was generating a set of 4-5 randomly colored tiles to place on the starting 4x4 board, while keeping track of the underlying grid after each placement, thus ensuring that no more than two tiles are assigned to any row or column. Unfortunately, once this had been accomplished, it appeared evident that I had merely opened Pandora's box. 

While the solution did in fact produce valid boards, it *also* produced many *invalid* boards that could not be solved, as attempting to adhere by one rule of the game would require *also* breaking a *different* rule. At this point, the path forward was unclear. The problem seemed growingly complex, as more attempts were made to get to the bottom of it. The first method I employed involved building an increasingly long and inefficient *check function*, that consisted of over 170 lines of double-nested for-loops and triple-nested for-loops, keying into every imaginable coordinate on the grid, to search for and eliminate unwanted patterns that could lead to an unsolvable board. This *worked* in a *sense*. While the underlying generator was no longer producing unsolvable boards, it was also filtering out perfectly valid boards due to the nature of the checks being performed. The solution felt clunky and inelegant, and I knew that it would be rendered useless to my future self, even as a boilerplate function, as many of the checks performed would be ineffective on larger boards.

All but defeated, I realized that the only valid solution left was to entirely redesign my main class and build an algorithm that could generate solved boards at inception, at which point I could reduce the grid down to a valid set of starting tiles. With no knowledge at the time of how to leverage machine-learning or AI to my advantage, the task seemed next to impossible. However, I soon remembered a valuable anecdote: computers are good at doing *many* things, *fast*. With this in mind, I designed a chain of recursive functions that are called repeatedly until a solved board is produced. 

The first function in this chain assembles valid rows (arrays), containing an even amount of red values and blue values. The second function takes the row handed off by the first function, and checks to see if it is unique, at which point it gets pushed into the outer grid. The third function then takes the grid (2d array) handed off by the second function, checks to see if all of the columns have an even amount of red and blue values, and then hands the grid off to the final function. At this point, each column is checked for uniqueness, and if it passes, the grid is finally handed off to the reduction functions. If the grid is deemed defective at any point during the recursive process, the chain will call itself over, all the way back to the top. All that was left to do after perfecting the generator process was to refactor a few tracking functions, which reduce the tiles from the now solved board. The solution performed marvelously, thus cutting the Gordian knot and paving the way for bigger and better BitGo boards.