/*pattern when win occurs: [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
*/
let boxes=document.querySelectorAll(".boxes");
let reset=document.getElementById("reset");
let turno=true;
let newgame=document.querySelector("#new");
let maincontainer=document.querySelector(".maincontainer")
let message=document.querySelector("#message")
let winningCombinations=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const resetGame=()=>{
    turno=true;
    enableBoxes();
    maincontainer.classList.add("hide");
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turno===true){
            box.style.color="white";
            box.innerText="O";
            turno=false;
        }
        else{
            box.style.color="black";
            box.innerText="X";
            turno=true;
        }
        box.disabled=true;
        winnerChecking();
        checkDraw();
    })
});
const checkDraw=()=>{
    let count=0;
    for(let box of boxes){
        if(box.innerText!=""){
            count+=1;
        }
    }
    if(count==9){
        matchdrawn();
    }
}
const matchdrawn=()=>{
    message.innerText=`Match is Drawn`;
    maincontainer.classList.remove('hide');
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const showWinner=(winner)=>{
    message.innerText=`Congratulations, Winner is ${winner}`;
    maincontainer.classList.remove('hide');
    disableBoxes();
}
const winnerChecking=()=>{
    for(let pattern of winningCombinations){
        let position1=boxes[pattern[0]].innerText;
        let position2=boxes[pattern[1]].innerText;
        let position3=boxes[pattern[2]].innerText;
        if(position1!="" && position2!="" && position3!=""){
            if(position1==position2 && position2==position3){
                showWinner(position1);
            }
        }
    }
}
newgame.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);