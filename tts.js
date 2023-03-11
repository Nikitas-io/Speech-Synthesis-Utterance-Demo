
// Get the dropdown element.
const voicesDropdown = document.getElementById('voices-dropdown');
// Get the read button from the DOM.
const readButton = document.getElementById('read-button');

window.addEventListener("load", () => {

    // Get the speech synthesizer from the window.
    const speech = window.speechSynthesis;
    // Check if the voices are undefined.
    if(speech.onvoiceschanged !== undefined) {
        // Get the voices.
        speech.onvoiceschanged = () => populateVoiceList();
    }

    // Get the voices from the synthesizer.
    function populateVoiceList(){
        // Get the list of available voices with our own custom-made function.
        voices = speech.getVoices(); // now should have an array of all voices
        console.log('The voices: ', voices)
    
        // Loop through the available voices.
        for (let i = 0; i < voices.length; i++) {
            // Append the voices to the dropdown.
            voicesDropdown.insertAdjacentHTML('beforeend', `<option value="${i}">${voices[i].name}</option>`);
        }
        
    }

    
    // Read button has been clicked.
    readButton.addEventListener('click', function(){
        // Get the inner text of the content element.
        const textValue = document.getElementById('text').value;
        // Get the value of the selected voice.
        const selectedVoice = voicesDropdown.value;
        // Set the rate, pitch and volume of the voice.
        let rate = 1, pitch = 1, volume = 1;
        
        // Read out the text.
        speak(textValue, voices[selectedVoice], rate, pitch, volume, voices[selectedVoice].lang);
    });

    
    
    function speak(text, voice, rate, pitch, volume, language) {
        // create a SpeechSynthesisUtterance to configure the how text to be spoken 
        let speakData = new SpeechSynthesisUtterance();
        speakData.volume = volume; // From 0 to 1
        speakData.rate = rate; // From 0.1 to 10
        speakData.pitch = pitch; // From 0 to 2
        speakData.text = text;
        speakData.lang = language;
        speakData.voice = voice;
        
        // pass the SpeechSynthesisUtterance to window.speechSynthesis.speak to start speaking 
        window.speechSynthesis.speak(speakData);
    
    }

});


    