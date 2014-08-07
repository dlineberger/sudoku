$(document).ready(function() {
	var sudoku = new Sudoku();

	var $board = $(".board");
	
	for (var b = 0; b < 9; b++) {
		var $block = $("<div class='board-block'></div>");
		for (var r = 0; r < 3; r++) {
			var dataRow = r + (Math.floor(b / 3) * 3);
			
			var $row = $("<div class='board-block-row'></div>");
			for (var c = 0; c < 3; c++) {
				var dataCol = c + (b % 3) * 3;
				var cellValue = sudoku.board[dataRow][dataCol];
		
				var $cell = $("<div class='board-cell'>" + (cellValue || '') + "</div>");
				$cell.attr("data-row", dataRow);
				$cell.attr("data-col", dataCol);
				if (!cellValue) {
					$cell.addClass("editable");
				}
				
				$row.append($cell);
			}
			$block.append($row);
		}
		$board.append($block);
	}

	
	// for (var i = 0; i < sudoku.board.length; i++) {
	// 	$row = $("<div class='board-row'></div>");
	// 	var boardRow = sudoku.board[i];
	// 	for (var j = 0; j < sudoku.board.length; j++) {
	// 		$cell = $("<div class='board-cell'>" + (boardRow[j] || '') + "</div>");
	// 		$cell.attr("data-row", i);
	// 		$cell.attr("data-col", j);
	// 		if (i % 3 === 0) {
	// 			$cell.addClass("border-row");
	// 		}
			
	// 		if (!boardRow[j]) {
	// 			$cell.addClass("editable");
	// 		}
	// 		$row.append($cell);
	// 	}
	// 	$board.append($row);
	// }

	$(".editable").click(function() {
		var row = $(this).attr('data-row');
		var col = $(this).attr('data-col');
		sudoku.set(row, col, 'X');
		$(this).text("X");
	});

	$(".reset").click(function() {
		sudoku.reset();
		$(".editable").text('');
	});

	
});
