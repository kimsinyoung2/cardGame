// =============================================
//전역 변수 영역
let dragingCard = null;
let dragOverBox = null;
let dragOverCard = null;
let probNo = Math.floor(Math.random()* problem.prblib.length);
let USERNAME_KEY = "username";

// =============================================
// =============================================
function shuffle(array){
    array.sort(() =>  Math.random() - 0.5);
}
// Card Event Handler
function onDragStartCard(ev) {
    dragingCard = this;
    this.classList.add("dragingCard");
}
// =============================================
function onDragEndCard (ev) {
    ev.preventDefault();
    dragingCard = null;
    dragOverBox = null;
    this.classList.remove("dragingCard");
    if(dragOverCard){
        dragOverCard.classList.remove("overCard");
        dragOverCard = null;
    }
}
// =============================================
function onDragOverCard(ev){
    dragOverCard = this;
    this.classList.add("overCard");
}
// =============================================
function onDragLeaveCard(ev){
    ev.preventDefault();
    dragOverCard = null;
    this.classList.remove("overCard");
}
// =============================================
function onDragOverBox (ev){
    ev.preventDefault();
    this.classList.add("overBox");
    dragOverBox = this;
}

// =============================================
function onDragLeaveBox (ev) {
    ev.preventDefault();
    this.classList.remove("overBox");
}
// =============================================
function onDropBox(ev){
    ev.preventDefault();

    if(dragOverCard) //카드 위에서 놓은 경우
        this.insertBefore(dragingCard, dragOverCard);
    else
        this.appendChild(dragingCard);


    this.classList.remove("overBox");
}
// =============================================
function 섞은문제(){
    let wordArray = problem.prblib[probNo].eng.split(" ");
    shuffle(wordArray);
    let box = document.querySelector(".box");
    let cardHTML = "";
    
    for(let word of wordArray){
        cardHTML += `<div draggable="true" class="card hiddens">${word}</div>`
        }
        box.innerHTML += cardHTML;

}
function 문제(){
    let h2 = document.querySelector("h2");
    h2.innerHTML = problem.prblib[probNo].kor;

}
// =============================================
function 정답(){
    cards = document.querySelectorAll(".card");
    subBtn = document.querySelector(".submit");

    let answer = '';
    for(let card of cards){
        answer += card.innerText;
    }

    let answerArrays = problem.prblib[probNo].eng.split(" ");
    let answer2 = '';
    for(let answerArray of answerArrays){
        answer2 += answerArray;
    }
    
    if(answer == answer2){
        alert("정답입니다");
        location.reload();
    }
    else{
        alert("다시 배치해 주세요.");
    }

    
}
function display(){
    let cards = document.getElementsByClassName("card");
    let h2 = document.querySelector("h2");
    
    for(card of cards){
        card.classList.remove("hiddens");
    }
    h2.classList.remove("hiddens");    
}
function login(){
    let idInput = document.getElementById("idInput");
    let ID = idInput.value;
    localStorage.setItem(USERNAME_KEY,ID);
    let btn = document.getElementById("loginBtn");
    btn.style.display = "none";
    idInput.style.display = "none";
}
function printName(){
    let username = localStorage.getItem(USERNAME_KEY);
    let idInput = document.getElementById("idInput");
    let btn = document.getElementById("loginBtn");
    let h1 = document.querySelector(".hiddens");
    let names = document.querySelector("#name");
    names.innerText = `안녕하세요. ${username}님`;
    h1.classList.remove("hiddens");
    btn.style.display = "none";
    idInput.style.display = "none";
}
// =============================================
window.onload = function (){
    섞은문제();
    문제();
    let cards = document.querySelectorAll(".card");
    for(let card of cards){
        card.addEventListener("dragstart",onDragStartCard);
        card.addEventListener("dragend",onDragEndCard);
        card.addEventListener("dragover",onDragOverCard);
        card.addEventListener("dragleave",onDragLeaveCard);
    }
    
    let boxes = document.querySelectorAll(".box");
    for(let box of boxes){
        box.addEventListener("dragover",onDragOverBox);
        box.addEventListener("dragleave",onDragLeaveBox);
        box.addEventListener("drop",onDropBox);
    }
    let submitBtn = document.querySelector(".submit");
    submitBtn.addEventListener("click",정답);
    let playBtn = document.getElementsByClassName("play")[0];
    playBtn.addEventListener("click",display);
    let loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click",login);
    loginBtn.addEventListener("click",printName);

    let saveUsername = localStorage.getItem(USERNAME_KEY);
    let idInput = document.getElementById("idInput");
    let btn = document.getElementById("loginBtn");

    if(saveUsername === null){
    // show the form
        idInput.classList.remove("hiddens");
        btn.classList.remove("hiddens");
    } else {
    // show the greeting
        printName();

    }
}
// =============================================
