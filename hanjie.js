/*
   New Perspectives on HTML, CSS, and JavaScript
   Tutorial 13
   Tutorial Case

   Author: 
   Date:   

   Function List
   =============

   init()
      Run when the Web page is loaded; displays puzzle 1
      and loads the event handlers for the Web page buttons.

   swapPuzzle()
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   setupPuzzle()
      Sets up a new puzzle, adding the onclick event handlers for
      every puzzle cell.

   changeBackground()
      Changes the cell background from gold to gray to white and
      back to gold again. Checks the puzzle for a complete solution.

   peek()
      Temporarily displays incorrect cells. In correct white cell are
      displayed in pink; incorrect gray cells are displayed in red.

   unpeek()
      Returns the puzzle to its original state prior to peeking.

   showSolution()
      Removes all inline background color styles from the puzzle, showing
      the complete solution.

   checkSolution()
      Checks the current state of the puzzle, determining whether it 
      respreents a complete solution.

   drawGrid(puzzle)
      Returns a text string of the HTML code to
      display a hanjie Web table based on the contents of
      multi-dimensional array, puzzle.
	
*/

window.onload = init;

function init()
{
	document.getElementsByTagName("h1")[0].innerHTML = "Hanjie Puzzle 1";
	document.getElementById("hint").innerHTML = puzzle1Hint;
	document.getElementById("rating").innerHTML = puzzle1Rating;
	document.getElementById("peek").onclick = peek;
	document.getElementById("solve").onclick = showSolution;
	var puzzleButtons = document.getElementsByClassName("puzzles");
	for (var i = 0; i < puzzleButtons.length; i++) 
	{
		puzzleButtons[i].onclick = swapPuzzle;
	}
	document.getElementById("puzzle").innerHTML = drawGrid(puzzle1);
	setupPuzzle();

}

function setupPuzzle()
{
	var puzzleCells = document.querySelectorAll("#hanjieGrid td");
	for (var i = 0; i < puzzleCells.length; i++) 
	{
		puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";
		puzzleCells[i].onclick = changeBackground;
	}
}

function changeBackground() 
{
   var bColor = this.style.backgroundColor; //store the current background color in a variable
   if (bColor == "rgb(233, 207, 29)") // if BG color is gold...
	   bColor = "rgb(101, 101, 101)"; // change to grey
   else if (bColor == "rgb(101, 101, 101)") //if BG color is grey...
	   bColor = "white"; //change it to white
   else bColor = "rgb(233, 207, 29)"; // otherwise change it back to gold
   this.style.backgroundColor = bColor; //now set the BG color to whatever above condition is true
   checkSolution();
}

function checkSolution() 
{

   var solved = true;
   var allCells = document.querySelectorAll("#hanjieGrid td");
   for (var i = 0; i < allCells.length; i++) 
   {
      var cellColor = allCells[i].style.backgroundColor;
      var cellClass = allCells[i].className;
      if ( (cellClass == "marked" && cellColor !== "rgb(101, 101, 101)") || 
           (cellClass == "empty" && cellColor !== "white") ) 
		{
         solved = false;
         break; 
		}
   }
   if (solved) 
	   alert("Congratulations! You solved the puzzle!");
}

function swapPuzzle() 
{
   if (confirm("You will lose all of your work on the puzzle! Continue?")) 
   {
      var title = "Hanjie " + this.value;
      var hint = eval(this.id + "Hint");
      var rating = eval(this.id + "Rating");
      var puzzle = eval(this.id);
      document.getElementsByTagName("h1")[0].innerHTML = title;
      document.getElementById("hint").innerHTML = hint;
      document.getElementById("rating").innerHTML = rating;
      document.getElementById("puzzle").innerHTML = drawGrid(puzzle);
      setupPuzzle();
   }
}

function showSolution() 
{
   var allCells = document.querySelectorAll("#hanjieGrid td"); //find all the td tags inside hanji grid
   for (var i = 0; i < allCells.length; i++) 
   {
      allCells[i].style.backgroundColor = "";
   }
}

function peek() 
{
   var markedCells = document.querySelectorAll("#hanjieGrid td.marked");
   var emptyCells = document.querySelectorAll("#hanjieGrid td.empty");
   for (var i = 0; i < markedCells.length; i++) 
   {
      cell = markedCells[i];
      if (cell.style.backgroundColor == "white") 
		cell.style.backgroundColor = "rgb(255, 192, 192)"; // pink 
   } 

   for (var i = 0; i < emptyCells.length; i++)
   {
      var cell = emptyCells[i];
      if (cell.style.backgroundColor == "rgb(101, 101, 101)") // grey
		cell.style.backgroundColor = "red";  
	}
   setTimeout("unpeek()", 500);
}

function unpeek() //peek and unpeek work together
{
   var allCells = document.querySelectorAll("#hanjieGrid td");
   for (var i = 0; i < allCells.length; i++) 
   {
      var cell = allCells[i];
      if (cell.style.backgroundColor == "rgb(255, 192, 192)")   
            cell.style.backgroundColor = "white";
      if (cell.style.backgroundColor == "red") 
            cell.style.backgroundColor = "rgb(101, 101, 101)";
   }
}


function drawGrid(puzzle) {

   /* Initial HTML String for the Hanjie Puzzle */
   var htmlString = "";

   /* puzzle is a multidimensional array containing the
      Hanjie puzzle layout. Marked cells are indicated by
      the # character. Empty cells are indicated by an
      empty text string. First, determine the number of rows
      and columns in the puzzle */

   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;

   /* Loop through the rows to create the rowCount array
      containing the totals for each row in the puzzle */

   var rowCount = [];
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;

      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] == "#") {
            spaceCount++;
            if (j == totalCols-1) rowCount[i] += spaceCount + "&nbsp;&nbsp;";
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Loop through the columns to create the colCount array
      containing the totals for each column in the puzzle */

   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] == "#") {
            spaceCount++;
            if (i == totalRows-1) colCount[j] += spaceCount + "<br />";
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Create a Web table with the id, hanjieGrid, containing
      headers with the row and column totals.
      Each marked cell has the class name, marked; each
      empty cell has the class name, empty */

   htmlString = "<table id='hanjieGrid'><tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>" + rowCount[i]+"</th>";

      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] == "#") htmlString += "<td  class='marked'></td>"
         else htmlString += "<td class='empty'></td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}
