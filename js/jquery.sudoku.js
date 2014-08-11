(function( $ ) {

	var board = new Sudoku();

	var setValue = function($cell, value) {
		var row = parseInt($cell.attr("data-row"));
		var col = parseInt($cell.attr("data-col"));
		board[row][col].value = value;
		$cell.text(value);
	};

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
					if (!boardValue.permanent) {
						$cell.addClass("editable");
						$cell.attr("tabIndex", ++tabIndex);
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
	}

	var openPopup = function($element, $cellElement) {
		var $popup = $element.find(".number-popup").detach();
		$popup.removeClass('popup-direction-up popup-direction-down popup-direction-left popup-direction-right');

		// position popup so it doesn't go past board
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

	var closePopup = function($element, fn) {
		var popup = $element.find(".number-popup").fadeOut(100, function() {
			$(this).detach().appendTo($element);
			if (fn) {
				fn();
			}
		});
	};

	var onPopupNumberSelection = function() {
		var $cell = $(this).closest(".editable");
		var $sudoku = $cell.closest('.sudoku');
		var val = parseInt($(this).text());

		closePopup($sudoku, function() {
			$cell.removeClass('selected');
			setValue($cell, val);
		});
	};

	var onEditableClick = function(e) {
		if (e.target != this) return;

		var $this = $(this);
		var $sudoku = $(this).closest('.sudoku');
		$sudoku.find('.selected').removeClass('selected');
		$this.removeClass('incorrect-value correct-value').addClass('selected');

		if ($this.find('.number-popup').length > 0) {
			closePopup($sudoku);
		} else {
			openPopup($sudoku, $this);
		}
	};

	var onKeyPress = function(e) {
		var $this = $(this);
		var $sudoku = $this.closest('.sudoku');
		if (e.which >= 49 && e.which <= 57) {
			// number keys -- insert typed value
			setValue($this, e.which - 48);
		} else if (e.which >= 37 && e.which <= 40) {
			// arrow keys -- move to appropriate next cell
			$sudoku.find('.selected').removeClass('selected');
			closePopup($sudoku);

			var focusNextEditable = function($cell, constantAttribute, variableAttribute, decrement) {
				var constantValue = parseInt($cell.attr(constantAttribute));
				var variableValue = parseInt($cell.attr(variableAttribute));
				variableValue = decrement ? variableValue - 1 : variableValue + 1;

				var $nextEditable = $('.editable[' + constantAttribute + '=' + constantValue + '][' + variableAttribute + '=' + variableValue + ']');
				while ($nextEditable.length === 0 && variableValue >= 0 && variableValue <= 8)
				{
					variableValue = decrement ? variableValue - 1 : variableValue + 1;
					$nextEditable = $('.editable[' + constantAttribute + '=' + constantValue + '][' + variableAttribute + '=' + variableValue + ']');
				}
				if ($nextEditable.length > 0) {
					$nextEditable.focus();
				}
			}

			switch (e.which) {
			case 37: // left
				focusNextEditable($this, 'data-row', 'data-col', true);
				break;
			case 38: // up
				focusNextEditable($this, 'data-col', 'data-row', true);
				break;
			case 39: // right
				focusNextEditable($this, 'data-row', 'data-col')
				break;
			case 40: // down
				focusNextEditable($this, 'data-col', 'data-row');
				break;
			}
		}
	};

	var methods = {
		init: function() {
			return this.each(function() {
				var $this = $(this);
				drawBoard($this);
				$this.find('.editable')
					.click(onEditableClick)
					.keydown(onKeyPress);

				$this.find('.number-popup .board-cell').click(onPopupNumberSelection);

			});
		},
		reset: function() {
			var $element = $(this);
			closePopup($element);
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

	$.fn.sudoku = function(method) {
		if (methods[method]) {
			return methods[method].apply(this);
		} else {
			return methods.init.apply(this);
		}
	};

}( jQuery ));
