const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const main_body = document.querySelector(".main-body");
let sound = document.querySelector(".sound");
const search_btn = document.querySelector(".search-btn");
let voice;
search_btn.addEventListener("click", () => {
    let user_input = document.querySelector(".user-input").value;   
    if (user_input == '') {
        main_body.innerHTML = `<h3>Please enter a word.</h3>` 

    }
    else{
        console.log(user_input);

        fetch(`${url}${user_input}`).then(response => response.json()).then(data => {
            console.log(data);
            main_body.innerHTML = 
            `
                <div class="word-itself">
                    <p class ="main-word">${user_input}</p>
                    
                    <ion-icon onclick ="playSound()" class="sound" name="volume-high">
                    
                    
                    </ion-icon>
                    
                </div>
                <div class="type-of-word">${data[0].meanings[0].partOfSpeech} ${data[0].phonetic}</div>
                <div id="wordDefinition">${data[0].meanings[0].definitions[0].definition}</div>
                
                <div id="wordAntonyms"></div>
                <p id="wordExampleSentences"> ${data[0].meanings[0].definitions[0].example || ""} </p>
                <div id="wordSynonyms"> <span> Synonyms: </span> ${data[0].meanings[0].synonyms.join(" ,")}</div>
            `
          
            
            // sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    
            sound = new Audio(data[0].phonetics[0].audio);
            setTimeout(() => {
                document.querySelector(".user-input").value = ''; // Clear user input after successful fetch.
            }, 3000); // Wait for 1 second before trying to play the sound.
            
      
        })
       
        .catch( error  => {
            
            main_body.innerHTML = `<h3>An error occurred while fetching data. Please try again.</h3>` 
            sound = null; // Reset sound reference to null to prevent further issues.
        });
    }
});


function playSound() {
    if (sound) {
        sound.play().catch(error => {
            console.error("Error playing sound:", error);
        });
    } else {
        prompt("Sound element not found or not loaded.");
    }
}