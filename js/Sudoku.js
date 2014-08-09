'use strict';

function Sudoku() {
	var board = [
		[
			{answer: 5, permanent: true},
			{answer: 3, permanent: true},
			{answer: 4},
			{answer: 6},
			{answer: 7, permanent: true},
			{answer: 8},
			{answer: 9},
			{answer: 1},
			{answer: 2},
		],
		[
			{answer: 6, permanent: true},
			{answer: 7},
			{answer: 2},
			{answer: 1, permanent: true},
			{answer: 9, permanent: true},
			{answer: 5, permanent: true},
			{answer: 3},
			{answer: 4},
			{answer: 8}
		],
		[
			{answer: 1},
			{answer: 9, permanent: true},
			{answer: 8, permanent: true},
			{answer: 3},
			{answer: 4},
			{answer: 2},
			{answer: 5},
			{answer: 6, permanent: true},
			{answer: 7}
		],
		[
			{answer: 8, permanent: true},
			{answer: 5},
			{answer: 9},
			{answer: 7},
			{answer: 6, permanent: true},
			{answer: 1},
			{answer: 4},
			{answer: 2},
			{answer: 3, permanent: true},

		],
		[
			{answer: 4, permanent: true},
			{answer: 2},
			{answer: 6},
			{answer: 8, permanent: true},
			{answer: 5},
			{answer: 3, permanent: true},
			{answer: 7},
			{answer: 9},
			{answer: 1, permanent: true},
		],
		[
			{answer: 7, permanent: true},
			{answer: 1},
			{answer: 3},
			{answer: 9},
			{answer: 2, permanent: true},
			{answer: 4},
			{answer: 8},
			{answer: 5},
			{answer: 6, permanent: true},
		],
		[
			{answer: 9},
			{answer: 6, permanent: true},
			{answer: 1},
			{answer: 5},
			{answer: 3},
			{answer: 7},
			{answer: 2, permanent: true},
			{answer: 8, permanent: true},
			{answer: 4}
		],
		[
			{answer: 2},
			{answer: 8},
			{answer: 7},
			{answer: 4, permanent: true},
			{answer: 1, permanent: true},
			{answer: 9, permanent: true},
			{answer: 6},
			{answer: 3},
			{answer: 5, permanent: true},
		],
		[
			{answer: 3},
			{answer: 4},
			{answer: 5},
			{answer: 2},
			{answer: 8, permanent: true},
			{answer: 6},
			{answer: 1},
			{answer: 7, permanent: true},
			{answer: 9, permanent: true}
		]
	];

	return board;
};
