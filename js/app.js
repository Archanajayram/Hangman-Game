var words=[
    "application",
    "growing",
    "success",
    "function",
    "constructor",
    "response",
    "node",
    "wizard",
    "programming",
    "friends",
    "satisfied",
    "container",
    "service",
    "calander",
    "callback"
]

//target the dom
let wordEl=document.getElementById("word")
let wrLtEl=document.getElementById("wrong-letters")
let num=document.getElementById("num")

let plAgBtn=document.getElementById("playBtn")

let popup=document.getElementById("popup-box")
let notf=document.getElementById("notification")

let finMsg=document.getElementById("final-msg")
let finMsgWd=document.getElementById("final-msg-word")

//hangman shapes
let figParts=document.querySelector(".figure-part")

//declare variables
//select words
let selectedWord=words[Math.floor(Math.random() * words.length)]

//play options
let playable=true

//store the correct and incorrect letters
let correctLetters=[]
let wrongLetters=[]

//display the word
function displayWord(){
    wordEl.innerHTML= `${selectedWord.split("").map((item)=> `<span class="letter">${correctLetters.includes(item) ? item:""}</span>`).join("")}`;

    let innerWord=wordEl.innerText.replace(/\n/g,"")
    if(innerWord===selectedWord){
        finMsg.innerText="Congratulations!You won..."
        finMsgWd.innerText=""
        popup.style.display="flex"
        playable=false
    }
}
displayWord()

function showNotification(){
    notf.classList.add("show")
    setTimeout(()=>{
        notf.classList.remove("show")
    }, 2000)
}
function updatewrongLetters(){
    console.log(`wrong letters=`,wrongLetters)
    wrLtEl.innerHTML=`${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""} ${wrongLetters.map((item) => `<span>${item}</span>`)}`;

    //display hangman shape
    figParts.forEach((part,index) => {
        let errors=wrongLetters.length
        index < errors ? (part.style.display = "block") : (part.style.display= "none")
    });
    //if shapes incomplete 
    if(wrongLetters.length === figParts.length){
        finMsg.innerText="Sorry!You lost the game...."
        finMsgWd.innerText=`.....correct word is <u>${selectedWord}</u>`
        popup.style.display="flex"
        playable=false
    }
}
//play again game button
plAgBtn.addEventListener("click", () => {
    window.location.reload()
})
//inputkey handler
window.addEventListener("keypress",(e) => {
if(playable){
    const letter=e.key.toLowerCase();
    console.log(`letter =`,letter)

    if(letter >= "a" && letter <="z"){
        if(selectedWord.includes(letter)){
            correctLetters.push(letter)
            displayWord()
        }else{
            showNotification()
        }
    }else {
        if(!wrongLetters.includes(letter)){
            wrongLetters.push(letter)
            updatewrongLetters()
        }else{
            showNotification()
        }
    }
}
})