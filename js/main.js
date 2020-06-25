// INIT speechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

// INIT voices array
let voices = [];

const getVoice = ()=>{
    voices = synth.getVoices();

    // const option1 = document.createElement('option')
    // option1.textContent = 'Choose Language';
    // option1.setAttribute('value','');
    // option1.setAttribute('selected','');
    // option1.setAttribute('disabled','');
    // option1.setAttribute('hidden','');
    // voiceSelect.appendChild(option1);

    // loop throgh voices
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + '('+voice.lang+')';

        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);

        voiceSelect.appendChild(option);
    })
}

getVoice();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoice;
}


// SPEAK
const speak = ()=>{
    if(synth.speaking){
        console.error('Already speaking...');
        return;
    }
    if(textInput.value !== ''){
        const speakText = new SpeechSynthesisUtterance(textInput.value);
    

    speakText.onend = e=>{
        console.log('Done speaking...');
    }

    speakText.onerror = e=>{
        console.error('Something went wrong');
    }

    // selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    voices.forEach(voice => {
        if(voice.name === selectedVoice){
            speakText.voice = voice;
        }
    });

    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    synth.speak(speakText);
    }
}

// event listner
textForm.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
})

rate.addEventListener('change',e=>{
    rateValue.textContent = rate.value;
})

pitch.addEventListener('change',e=>{
    pitchValue.textContent = pitch.value;
})

// voice select chagne 
// voiceSelect.addEventListener('change',e=> speak());
