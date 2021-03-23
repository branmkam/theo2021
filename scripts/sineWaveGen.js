// Cents = K*(log(f1)-log(f0))
// where 1200 = K*log(2)

import {noteNames} from './globals.js';
import Note from './Note.js';
import AugNote from './AugNote.js';

let freqDisp = document.createElement('p');
document.body.appendChild(freqDisp);
freqDisp.id = "freqDisp";
let currentNote = new AugNote("c", 5, 0);

//audio
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let masterGainNode = audioContext.createGain();
masterGainNode.connect(audioContext.destination);
masterGainNode.gain.value = document.getElementById('volumeSlider').value;
document.getElementById('volumeSlider').addEventListener("change", e => masterGainNode.gain.value = document.getElementById('volumeSlider').value, false);

let playButton = document.getElementById('play');
playButton.addEventListener('click', function()
    {
        currentNote = new AugNote(names.options[names.selectedIndex].value.split('/')[0], octs.options[octs.selectedIndex].value, cents.options[cents.selectedIndex].value);
        freqDisp.innerHTML = currentNote + ": " + currentNote.freq.toFixed(2) + " Hz";
        playTone(currentNote.freq);
    }
);

//COPIED/EDITED from mozilla
function playTone(freq) {
    let osc = audioContext.createOscillator();
    osc.connect(masterGainNode);
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.start();
    setTimeout(function(){ osc.stop(); }, 1000);
    return osc;
}

//add select for notes
let noteControls = document.getElementById('noteControls');
console.log(noteControls);
let label = document.createElement('p');
label.innerHTML = "Select a note, octave, and cents:";
let names = document.createElement('select');
let octs = document.createElement('select');
let cents = document.createElement('select');
noteControls.appendChild(label);
noteControls.appendChild(names);
noteControls.appendChild(octs);
noteControls.appendChild(cents);

//names 
noteNames.forEach(n => {
    let el = document.createElement('option'); 
    let str = "";
    n.forEach(note => {str += note + "/"});
    el.innerHTML = str.substring(0, str.length-1); 
    names.appendChild(el)
});

//octs
for(let i = 1; i <= 7; i++)
{
    let el = document.createElement('option'); 
    el.innerHTML = i; 
    octs.appendChild(el);
}

octs.value = 5;

//cents
for(let i = -40; i <= 40; i += 5)
{
    let el = document.createElement('option'); 
    el.innerHTML = i; 
    cents.appendChild(el);
}

cents.value = 0;

//TO DO - USE FORMULA TO MAKE A GAME USING CHECKBOXES (10, 20, 30 CENTS ETC) TO TEST SHARP/FLAT NOTES