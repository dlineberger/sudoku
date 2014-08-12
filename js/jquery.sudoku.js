(function( $ ) {

	var options = {};
	
	var setValue = function($cell, value) {
		var row = parseInt($cell.attr("data-row"));
		var col = parseInt($cell.attr("data-col"));
		board[row][col].value = value;
		$cell.text(value);

		// test for complete board
		if (options.onComplete && isComplete()) {
			options.onComplete();
		}
		
		saveBoard();
	};

	var isComplete = function() {
		for (var i = 0; i < board.length; i++) {
			for (var j = 0; j < board.length; j++) {
				var cell = board[i][j];
				if (!cell.permanent) {
					if (cell.value === undefined || cell.value !== cell.answer) {
						return false;
					}
				}
			}
		}
		return true;
	};

	var saveBoard = function() {
		if ('localStorage' in window && window.localStorage !== null) {
			window.localStorage.sudoku = JSON.stringify(board);
		}
	};

	var restoreBoard = function () {
		if ('localStorage' in window && window.localStorage !== null) {
			if ('sudoku' in window.localStorage) {
				return JSON.parse(window.localStorage.sudoku);
			}
		}
		return null;
	};

	var board = (restoreBoard() || [
		[ {answer: 5, permanent: true}, {answer: 3, permanent: true}, {answer: 4}, {answer: 6}, {answer: 7, permanent: true}, {answer: 8}, {answer: 9}, {answer: 1}, {answer: 2} ],
		[ {answer: 6, permanent: true}, {answer: 7}, {answer: 2}, {answer: 1, permanent: true}, {answer: 9, permanent: true}, {answer: 5, permanent: true}, {answer: 3}, {answer: 4}, {answer: 8} ],
		[ {answer: 1}, {answer: 9, permanent: true}, {answer: 8, permanent: true}, {answer: 3}, {answer: 4}, {answer: 2}, {answer: 5}, {answer: 6, permanent: true}, {answer: 7} ],
		[ {answer: 8, permanent: true}, {answer: 5}, {answer: 9}, {answer: 7}, {answer: 6, permanent: true}, {answer: 1}, {answer: 4}, {answer: 2}, {answer: 3, permanent: true} ],
		[ {answer: 4, permanent: true}, {answer: 2}, {answer: 6}, {answer: 8, permanent: true}, {answer: 5}, {answer: 3, permanent: true}, {answer: 7}, {answer: 9}, {answer: 1, permanent: true} ],
		[ {answer: 7, permanent: true}, {answer: 1}, {answer: 3}, {answer: 9}, {answer: 2, permanent: true}, {answer: 4}, {answer: 8}, {answer: 5}, {answer: 6, permanent: true} ],
		[ {answer: 9}, {answer: 6, permanent: true}, {answer: 1}, {answer: 5}, {answer: 3}, {answer: 7}, {answer: 2, permanent: true}, {answer: 8, permanent: true}, {answer: 4} ],
		[ {answer: 2}, {answer: 8},	{answer: 7}, {answer: 4, permanent: true}, {answer: 1, permanent: true}, {answer: 9, permanent: true}, {answer: 6}, {answer: 3}, {answer: 5, permanent: true}],
		[ {answer: 3}, {answer: 4}, {answer: 5}, {answer: 2}, {answer: 8, permanent: true}, {answer: 6}, {answer: 1}, {answer: 7, permanent: true}, {answer: 9, permanent: true} ]
	]);

	// Construct the board
	var drawBoard = function($element) {
		var tabIndex = 0;
		for (var b = 0; b < 9; b++) {
			var $block = $("<div class='board-block'></div>");
			for (var r = 0; r < 3; r++) {
				var dataRow = r + (Math.floor(b / 3) * 3);
				for (var c = 0; c < 3; c++) {
					var dataCol = c + (b % 3) * 3;

					var boardValue = board[dataRow][dataCol];
					var displayValue = boardValue.permanent ? boardValue.answer : '';
					var $cell = $("<div class='board-cell'>" + displayValue + "</div>");
					$cell.attr("data-row", dataRow);
					$cell.attr("data-col", dataCol);
					$cell.attr("tabIndex", ++tabIndex);
					if (boardValue.permanent) {
						$cell.addClass("permanent");
					} else {
						$cell.addClass("editable");
						if (boardValue.value) {
							$cell.text(boardValue.value);
						}
					}
					$block.append($cell);
				}
			}
			$element.append($block);
		}
		var $popup = $('<div class="number-popup"><div class="arrow"></div><div class="board-block"><div class="board-cell">1</div> \
<div class="board-cell">2</div><div class="board-cell">3</div> <div class="board-cell">4</div><div class="board-cell">5</div> \
<div class="board-cell">6</div><div class="board-cell">7</div><div class="board-cell">8</div><div class="board-cell">9</div></div></div></div>');

		$element.append($popup.hide());
	};

	var openPopup = function($element, $cellElement) {
		var $popup = $element.find(".number-popup").detach();
		$popup.removeClass('popup-direction-up popup-direction-down popup-direction-left popup-direction-right');

		// position popup so it doesn't go past board bounds
		var boardHeight = $cellElement.offsetParent().height();
		if (boardHeight - $cellElement.position().top < 176) {
			$popup.addClass('popup-direction-up');
		} else {
			$popup.addClass('popup-direction-down');
		}

		var boardWidth = $cellElement.offsetParent().width();
		if (boardWidth - $cellElement.position().left < 136) {
			$popup.addClass('popup-direction-left');
		} else {
			$popup.addClass('popup-direction-right');
		}

		$popup.appendTo($cellElement).fadeIn(100);
	};

	var closePopup = function($element, fn, value) {
		var $popup = $element.find(".number-popup").hide();
		$popup.detach().appendTo($element);
	};

	var onPopupNumberSelection = function() {
		var $cell = $(this).closest(".editable");
		var $sudoku = $cell.closest('.sudoku');
		var val = parseInt($(this).text());
		closePopup($sudoku);
		$cell.removeClass('selected');
		setValue($cell, val);
	};

	var onCellClick = function(e) {
		if (e.target != this) return;
		var $this = $(this);

		if ($this.parent().parent().hasClass('number-popup')) {
			return;
		}

		var isSelected = $this.hasClass('selected');
		
		var $sudoku = $this.closest('.sudoku');
		$sudoku.find('.selected').removeClass('selected');
		closePopup($sudoku);

		if (!isSelected && $this.hasClass('editable')) {
			$this.removeClass('incorrect-value correct-value').addClass('selected');
			openPopup($sudoku, $this);
			return;
		}
	};

	var onKeyPress = function(e) {
		var $this = $(this);
		var $sudoku = $this.closest('.sudoku');
		if (e.which >= 49 && e.which <= 57 && $this.hasClass('editable')) {
			// number keys -- insert typed value
			setValue($this, e.which - 48);
		} else if (e.which >= 37 && e.which <= 40) {
			// arrow keys -- move to appropriate next cell
			$sudoku.find('.selected').removeClass('selected');
			closePopup($sudoku);

			var focusNextCell = function($cell, constantAttribute, variableAttribute, decrement) {
				var constantValue = parseInt($cell.attr(constantAttribute));
				var variableValue = parseInt($cell.attr(variableAttribute));
				variableValue = decrement ? Math.max(0, variableValue - 1) : Math.min(8, variableValue + 1);
				var $nextCell = $('.board-cell[' + constantAttribute + '=' + constantValue + '][' + variableAttribute + '=' + variableValue + ']');
				$nextCell.focus();
			};

			switch (e.which) {
			case 37: // left
				focusNextCell($this, 'data-row', 'data-col', true);
				break;
			case 38: // up
				focusNextCell($this, 'data-col', 'data-row', true);
				break;
			case 39: // right
				focusNextCell($this, 'data-row', 'data-col');
				break;
			case 40: // down
				focusNextCell($this, 'data-col', 'data-row');
				break;
			}
		}
		return false;
	};

	var methods = {
		init: function(opts) {
			return this.each(function() {
				var $this = $(this);
				drawBoard($this);
				$this.find('.board-cell')
					.keydown(onKeyPress)
					.click(onCellClick);
				$this.find('.number-popup .board-cell').click(onPopupNumberSelection);
				options = opts;
			});
		},
		reset: function() {
			var $element = $(this);
			closePopup($element);
			for (var i = 0; i < board.length; i++) {
				for (var j = 0; j < board.length; j++) {
					delete board[i][j].value;
				}
			}
			saveBoard();
			$element.find(".editable").text('');
		},
		validate: function() {
			var $element = $(this);
			$element.find(".editable").each(function() {
				var row = parseInt($(this).attr('data-row'));
				var col = parseInt($(this).attr('data-col'));
				var boardValue = board[row][col];
				if (boardValue.value) {
					var value = boardValue.value;
					if (value === boardValue.answer) {
						$(this).addClass('correct-value');
					} else {
						$(this).addClass('incorrect-value');
					}
				}
			});
		}
	};

	$.fn.sudoku = function(methodOrOptions) {
		if (methods[methodOrOptions]) {
			return methods[methodOrOptions].apply(this);
		} else if (typeof methodOrOptions === 'object' || ! methodOrOptions) {
			return methods.init.apply(this, arguments);
		}
	};

}( jQuery ));
