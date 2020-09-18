import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import _ from 'lodash'

import brain from 'brain.js';

const model = new brain.NeuralNetwork();

const training_data = [];

const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

let trained = false;

class App extends Component {
	render() {
		return (
			<div className="App">
				<Game />
			</div>
		);
	}
}

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares : Array(9).fill(null),
			xIsNext : true,
			human_moves : [],
			ai_moves : [],
		};
	}

	handleClick(i) {
		const squares = this.state.squares.slice();

		const {human_moves, ai_moves} = this.state;
		
		if (squares[i]) {
			return console.log("Slot", i, "is already taken!")
		}

		console.log("i", i);

		const squares_before_move = this.state.squares.slice();
		const next_move = i;
		
		const nextValue = this.state.xIsNext ? 'X' : 'O';

		squares[i] = nextValue;

		human_moves.push(i + 1);

		const winner = calculateWinner(squares);

		if (winner) {
			console.log("Human won!!! human_moves", JSON.stringify(human_moves));

			let _training_data = {};

			human_moves.map((slot, sloti) => {
				_training_data[sloti] = slot;
			});

			_training_data["take_slot_" + i] = 1;

			_training_data = {input: _training_data, output: {}};

			_training_data.output["take_slot_" + i] = 1;

			training_data.push(_training_data);

			console.log("training_data", training_data);

			console.log(model.train(training_data));
		}

		// if (winner) {
		// 	this.setState({
		// 		squares: squares,
		// 		// xIsNext: !this.state.xIsNext,
		// 	});
				
		// 	return;
		// }

		console.log("11111 nextValue", nextValue, "winner", winner);

		if (!winner) {
			let movei, move_val = 0, slots_available = [];

			for (let iii = 0; iii < 9; iii++) {
				console.log("Checking square[" + iii + "]");

				if (!squares[iii]) {
					slots_available.push(iii);
				}
				else {
					console.log("Checking square[" + iii + "] is already taken!");
				}
			}

			console.log("1111 slots_available", slots_available);

			if (training_data.length > 0) {
				slots_available.forEach(slot => {
					console.log("Checking slot", slot);

					const _ai_moves = ai_moves.slice(0);

					const move_data = {};

					_ai_moves.map((slot, sloti) => {
						move_data[sloti] = slot;
					});

					move_data.next = slot

					console.log("move_data", move_data);

					const check_result = model.run(move_data);

					console.log("check_result", check_result);

					if (check_result[0] > move_val) {
						movei = slot;
						move_val = check_result[0];
					}
				});

			}

			if (movei >= 0) {
				squares[movei] = 'O';
			}
			else {
				const index = Math.round(Math.random() * slots_available.length);

				console.log("Unable to find a move.  Making a random choice for now. index", index);
				squares[slots_available[index]] = 'O';
			}
		}

		this.setState({
			squares: squares,
			// xIsNext: !this.state.xIsNext,
		});
	}

	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
			/>
		);
	}

	render() {
		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
				<div>
					<button onClick={() => {this.setState({squares: Array(9).fill(null), xIsNext: true, ai_moves: [], human_moves: []})}}>New Game</button>
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);

		console.log("New Game!!!");
	}

	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>


			</div>
		);
	}
}

function calculateWinner(squares) {
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			let winner = squares[a];

			// const _training_data = {};

			// for (let ii = 0; ii < 9; ii++) {
			// 	if (squares[ii]) {
			// 		_training_data[ii] = squares[ii] === winner ? 1 : 0
			// 	}
			// }

			// console.log("_traning_data", _training_data);

			// training_data.push({input: _training_data, output: {win: 1}});

			// console.log("training_data", training_data);

			// console.log(model.train(training_data));

			return winner;
		}
	}
	return null;
}

function toTrainingData(squares, winner) {
	const _training_data = {};

	squares.forEach((val, vali) => {
		if (val && val === winner) {
			_training_data[vali] = 1;
		}
	});

	return _training_data;
}

export default App;
