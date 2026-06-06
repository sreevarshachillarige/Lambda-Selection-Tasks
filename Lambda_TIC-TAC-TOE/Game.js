(function(){
    const {Emptyboard, Winner, Draw}=window.TicTacToe;

 //Starting State
let board=Emptyboard();
let XNext=true;
let scores={X:0,O:0,draws:0};//initial scores

//DOM Reference
const boardEl=document.getElementById("board");
const statusEl=document.getElementById("status");
const scoreXEl=document.getElementById("score-x");
const scoreOEl=document.getElementById("score-o");
const scoreDrawsEl=document.getElementById("score-draws");
const scoreXbox=document.getElementById("score-x-box");
const scoreObox=document.getElementById("score-o-box");

//Made 9 buttons functional
const squares=[];
for(let i=0;i<9;i++){
    const btn=document.createElement("button");
    btn.className="square";//adding style
    btn.setAttribute("aria-label",`Cell ${i+1}`);//assigning numbers
    btn.addEventListener("click", ()=>handleClick(i));//adding click handler
    boardEl.appendChild(btn);
    squares.push(btn);
}

//Game actions
function handleClick(index){
    const result=Winner(board);// gets the winner with indexs or null for draw
    const gameOver=Boolean(result)|| Draw(board);//game is over if the game ends in draw or one person wins
    if(board[index] || gameOver) return;// no action for buttons when game is over or the button is filled

    board[index]=XNext ? "X":"O";// determines the next player to play

    const outcome=Winner(board);
    if(outcome){
        scores[outcome.winner]++;//adds the score in the winner's score box
    }else if(Draw(board)){
        scores.draws++;//adds the score in draw's box
    }
    XNext=! XNext;
    render();//displays the page 
}

//Resets the UI for the next round of game in a sequence
function newRound(){
    board=Emptyboard();
    XNext=true;
    render();
}

//resets the UI for the next round(nullifies all the scores of the present round)
function resetAll(){
    board=Emptyboard();
    XNext=true;
    scores={X:0,O:0, draws:0};
    render();
}

//Rendering
function render(){
    const result=Winner(board);
    const winningMark=result ? result.winner:null;
    const winningLine=result ? result.indexs:[];
    const draw= !result && Draw(board);
    const gameOver= Boolean(result)|| draw;

    //Board square boxes/buttons
    squares.forEach((btn,i) => {
        const value= board[i];
        btn.className="square";
        if(value) btn.classList.add(`square-${value.toLowerCase()}`);//adding style to the score box
        if(winningLine.includes(i))btn.classList.add("square-winning");//adds the winning style to the winning indexs boxes
        btn.disabled=Boolean(value)|| gameOver;//button gets disabled when game is over or button has already value
        btn.innerHTML= value? `<span class="mark">${value}</span>`:"";//adds additional styles to the X and O marks in the boxes
    });

    //toggle or flips the style of the board boxes to "board-over" when the game is over
    boardEl.classList.toggle("board-over",gameOver);


    //Status message
    statusEl.classList.remove("status-win", "status-draw");//Removes the status classes to reset the status message style for the next round
    if (winningMark) {
      statusEl.textContent = `${winningMark} wins!`;//displays the winner message in the status 
      statusEl.classList.add("status-win");//adds the winning style to the status 
    } else if (draw) {
      statusEl.textContent = "It's a draw!";//displays the draw message in the status 
      statusEl.classList.add("status-draw");//adds the draw style to the status 
    } else {
      statusEl.textContent = `${XNext ? "X" : "O"}'s turn`;//displays the next player message in the status 
    }

    //Adds the value to the boxes in the scoreboard
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreDrawsEl.textContent = scores.draws;
    scoreXbox.classList.toggle("active", XNext && !gameOver);//adds the active style to the X score box when it's X's turn and game is not over
    scoreObox.classList.toggle("active", !XNext && !gameOver);//adds the active style to the O score box when it's O's turn and game is not over
  }

  //Event Listeners for the buttons:New Round and Reset Scores
  document.getElementById("new-round").addEventListener("click", newRound);
  document.getElementById("reset-scores").addEventListener("click", resetAll);

  render();
})();
