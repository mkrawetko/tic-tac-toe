import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }

    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            nextPlayer: 'X',
            winner: null
        };
    }

    handleClick(name) {
        let squares = this.state.squares.slice();
        squares[name] = this.state.nextPlayer;
        if (!this.state.winner) {
            let winner = this.findWinner(squares);
            let nextP = this.state.nextPlayer === 'X' ? 'O' : 'X';
            this.setState({squares: squares, nextPlayer: nextP, winner: winner})
        }
    }

    solutions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 6],
        [0, 4, 8],
        [6, 4, 2],
    ];

    findWinner(squares) {
        for (let i = 0; i < this.solutions.length; i++) {
            let solution = this.solutions[i];
            let player = squares[solution[0]];
            if (player === squares[solution[1]] && player === squares[solution[2]]) {
                return player;
            }
        }
        return null;
    };

    renderSquare(i) {
        return <Square name={i} value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }


    render() {
        const status = this.state.winner ? 'Winner: ' + this.state.winner : 'Next player: ' + this.state.nextPlayer;

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
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

