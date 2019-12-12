document.addEventListener("DOMContentLoaded", function () {

    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.querySelector('#board');
        this.cells = [];
        this.self = this;

        this.createBoard = function () {
            this.board.style.width = `${this.width*10}px`;
            this.board.style.height = `${this.height*10}px`;
            const boxes = this.width * this.height;
            for (let i = 0; i < boxes; i++) {
                const newDiv = document.createElement("div");
                this.board.appendChild(newDiv);
            }
            this.cells = document.querySelectorAll('#board div');
            this.cells.forEach(element => {
                element.addEventListener('click', (e) => {
                    e.target.classList.toggle("live")
                })
            });
        }
        this.createBoard();

        this.getXYCell = function (x, y) {
            if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
                return document.createElement('div');
            } else {
                return this.cells[x + y * this.width]
            }
        }

        this.setCellState = function (x, y, state) {
            if (state === 'live') {
                this.getXYCell(x, y).classList.add('live');
            } else {
                this.getXYCell(x, y).classList.remove('live');
            }
        }

        this.firstGlider = function () {
            this.setCellState(1, 3, 'live');
            this.setCellState(2, 3, 'live');
            this.setCellState(3, 3, 'live');
            this.setCellState(3, 2, 'live');
            this.setCellState(2, 1, 'live');
        }

        this.firstGlider();

        this.computeCellNextState = function (x, y) {
            const thisCellLiving = this.getXYCell(x, y).classList.contains('live');

            let liveNeighbours = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (x === x + i && y === y + j) {} else {
                        if (this.getXYCell(x + i, y + j).classList.contains('live')) {
                            liveNeighbours++;
                        }

                    }
                }
            }

            if (thisCellLiving) {
                if (liveNeighbours == 2 || liveNeighbours == 3) {
                    return 1
                } else {
                    return 0
                }
            } else {
                if (liveNeighbours == 3) {
                    return 1
                } else {
                    return 0
                }
            }
        }

        this.computeNextGeneration = function () {
            const nextStateArr = [];
            for (let j = 0; j < this.height; j++) {
                for (let i = 0; i < this.width; i++) {
                    nextStateArr.push(this.computeCellNextState(i, j))
                }
            }
            return nextStateArr;
        }
        this.printNextGeneration = function () {
            const arr = this.computeNextGeneration();
            this.cells.forEach(function (item, index) {
                if (arr[index] == 1) {
                    item.classList.add('live')
                } else {
                    item.classList.remove('live')
                }
            })
        }
    }

    const game = new GameOfLife(50, 50);
    document.querySelector('#play').addEventListener('click', function () {
        game.interval = setInterval(function () {
            game.printNextGeneration()
        }, 100);

    });
    document.querySelector('#pause').addEventListener('click', function () {
        clearInterval(game.interval)
    });
});