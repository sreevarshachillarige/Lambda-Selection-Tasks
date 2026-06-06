const winningindexs=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
//creates a null value at all indexs
function Emptyboard(){
    return Array(9).fill(null);
}
//Returns the winner with their winning line thorugh index or null in case of draw
function Winner(board){
    for(const indexs of winningindexs){
        const[a,b,c]= indexs;
        if(board[a] && board[a]==board[b] && board[b]==board[c]){
            return{winner: board[a], indexs}
        }
    }
    return null;
}
//Checks if the game resulted in a draw
function Draw(board){
    return board.every(Boolean) && !Winner(board);
}
window.TicTacToe={Emptyboard,Winner,Draw};