'use strict';

var Sudoku = function() {
	var originalBoard = [
		[5, 3,  ,  , 7,  ,  ,  ,  ],
		[6,  ,  , 1, 9, 5,  ,  ,  ],
		[ , 9, 8,  ,  ,  ,  , 6,  ],
		[8,  ,  ,  , 6,  ,  ,  , 3],
		[4,  ,  , 8,  , 3,  ,  , 1],
		[7,  ,  ,  , 2,  ,  ,  , 6],
		[ , 6,  ,  ,  ,  , 2, 8,  ],
		[ ,  ,  , 4, 1, 9,  ,  , 5],
		[ ,  ,  ,  , 8,  ,  , 7, 9]
	];

	this.board = originalBoard.slice();

	this.set = function(row, col, value) {
		this.board[row][col] = value;
	};

	this.unset = function(row, col) {
		delete this.board[row][col];
	};

	this.reset = function() {
		this.board = originalBoard.slice();
	};

	this.validate = function() {
		
	};
	
};
