import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );

}

class Board extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        return (
            <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history: [Array(9).fill(null)],
            nextPlayer: 'X'
        };
    }

    handleClick(name) {
        let squares = this.state.history[this.state.history.length - 1].slice();
        if (this.findWinner(squares) || squares[name]) {
            return;
        }
        squares[name] = this.state.nextPlayer;
        let newHistory = this.state.history.slice(0);
        newHistory.push(squares);
        this.setState({history: newHistory, nextPlayer: this.state.nextPlayer === 'X' ? 'O' : 'X'})
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
            let [a, b, c] = this.solutions[i];
            if (squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    render() {
        let winner = this.findWinner(this.state.history[this.state.history.length - 1]);
        const status = winner ? 'Winner: ' + winner : 'Next player: ' + this.state.nextPlayer;

        const moves = this.state.history.map((step, move) => {
            {
                let desc = move ? "Go to move: #" + move : "Go to game start";
                return (
                    <li key={move}>
                        <button>{desc}</button>
                    </li>
                )
            }
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.history[this.state.history.length - 1]}
                        onClick={(x) => this.handleClick(x)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
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

