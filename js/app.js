$(document).ready(function() {
	$('.sudoku').sudoku();
	
	$('.validate').click(function() {
		$('.sudoku').sudoku('validate');
	});

	$('.reset').click(function() {
		$('.sudoku').sudoku('reset');
	});
	
});
