$(document).ready(function() {
	var sudoku = new Sudoku();

	var $board = $(".board");

	// Construct the board
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

	$(".editable").click(function() {
		var row = $(this).attr('data-row');
		var col = $(this).attr('data-col');
		$("#numberPopup").prependTo($(this)).toggle();
	});

	$("#numberPopup .board-cell").click(function() {
		var $cell = $(this).closest(".editable");
		var val = parseInt($(this).text());
		var row = parseInt($cell.attr("data-row"));
		var col = parseInt($cell.attr("data-col"));
		sudoku.set(row, col, val);

		$("#numberPopup").prependTo($('body'));
		$cell.text(val);
	});

	$(".reset").click(function() {
		sudoku.reset();
		$(".editable").text('');
	});
	
});
