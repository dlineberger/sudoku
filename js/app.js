$(document).ready(function() {
	$('.sudoku').sudoku({
		onComplete: function() {
			$('#complete-modal').fadeIn(150);
		}
	});

	$('.validate').click(function() {
		$('.sudoku').sudoku('validate');
	});

	$('#reset-modal').find('.ok-button').click(function() {
		$('.sudoku').sudoku('reset');
		$(this).closest('.modal').fadeOut(150);
	});

	$('.modal').find('.close').click(function() {
		$(this).closest('.modal').fadeOut(150);
	});

	$('.reset').click(function() {
		$('#reset-modal').fadeIn(150);
	});
});
