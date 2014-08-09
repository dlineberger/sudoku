(function( $ ) {

	var board = new Sudoku();

	var createPopup = function($element) {
		var $popup = $('\
<div class="number-popup"> \
    <div class="arrow-down"></div> \
    <div class="board-block"> \
        <div class="board-block-row"> \
            <div class="board-cell">1</div> \
            <div class="board-cell">2</div> \
            <div class="board-cell">3</div> \
        </div> \
        <div class="board-block-row"> \
            <div class="board-cell">4</div> \
            <div class="board-cell">5</div> \
            <div class="board-cell">6</div> \
        </div> \
        <div class="board-block-row"> \
            <div class="board-cell">7</div> \
            <div class="board-cell">8</div> \
            <div class="board-cell">9</div> \
        </div> \
    </div> \
</div>');

		$element.append($popup.hide());
		$popup.find('.board-cell').click(function() {
			var $cell = $(this).closest(".editable");
			var val = parseInt($(this).text());
			var row = parseInt($cell.attr("data-row"));
			var col = parseInt($cell.attr("data-col"));

			closePopup($element);

			board[row][col].value = val;
			$cell.text(val);
		})
	};

	// Construct the board
	var drawBoard = function($element) {
		for (var b = 0; b < 9; b++) {
			var $block = $("<div class='board-block'></div>");
			for (var r = 0; r < 3; r++) {
				var dataRow = r + (Math.floor(b / 3) * 3);

				var $row = $("<div class='board-block-row'></div>");
				for (var c = 0; c < 3; c++) {
					var dataCol = c + (b % 3) * 3;

					var boardValue = board[dataRow][dataCol];
					var displayValue = boardValue.permanent ? boardValue.answer : '';
					var $cell = $("<div class='board-cell'>" + displayValue + "</div>");
					$cell.attr("data-row", dataRow);
					$cell.attr("data-col", dataCol);
					if (!boardValue.permanent) {
						$cell.addClass("editable");
					}
					$row.append($cell);
				}
				$block.append($row);
			}
			$element.append($block);
		}
		createPopup($element);
	}

	var openPopup = function($element, $cellElement) {
		$element.find(".number-popup").detach().appendTo($cellElement).show();
	};

	var closePopup = function($element) {
		var popup = $element.find(".number-popup").hide().detach().appendTo($element);
	};

	var listenToClickEvents = function($element) {
		$element.find('.editable').click(function(e) {
			if (e.target != this) return;
			
			var $this = $(this);
			if ($this.find('.number-popup').length > 0) {
				closePopup($element);
			} else {
				openPopup($element, $this);
			}
		});

	};

	var methods = {
		init: function() {
			return this.each(function() {
				var $this = $(this);
				drawBoard($this);
				listenToClickEvents($this);
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
