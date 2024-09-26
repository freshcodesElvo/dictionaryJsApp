const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const main_body = document.querySelector(".main-body");
let sound = document.querySelector(".sound");
const search_btn = document.querySelector(".search-btn");
let voice;
search_btn.addEventListener("click", () => {
    let user_input = document.querySelector(".user-input").value;   
    console.log(user_input);

    fetch(`${url}${user_input}`).then(response => response.json()).then(data => {
        console.log(data);
        main_body.innerHTML = 
        `
            <div class="word-itself">
                <p>${user_input}</p>
                
                <ion-icon onclick ="playSound()" class="sound" name="volume-high"></ion-icon>
                
            </div>
            <div class="type-of-word">${data[0].meanings[0].partOfSpeech} ${data[0].phonetic}</div>
            <div id="wordDefinition">${data[0].meanings[0].definitions[0].definition}</div>
            <div id="wordSynonyms"></div>
            <div id="wordAntonyms"></div>
            <div id="wordExampleSentences">${data[0].meanings[0].definitions[0].example || ""}</div>

        
        `
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
  
    })
})

function playSound() {
    sound.play()
}