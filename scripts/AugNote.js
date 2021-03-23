import {noteNames, noteFreqs} from './globals.js';

export default class AugNote
{
    constructor(name, oct, cents)
    {
        this.name = (name.trim().substring(0,1).toUpperCase()) + name.substring(1).trim();
        this.oct = oct;
        this.freq = this.calcFreq(this.name, this.oct, cents);
        this.number = this.calcNum(this.name, this.oct);
        this.cents = cents;
    }

    // constructor(note, cents)
    // {
    //     this.name = note.name;
    //     this.oct = note.oct;
    //     this.freq = this.calcFreq(this.name, this.oct);
    //     this.number = this.calcNum(this.name, this.oct);
    //     this.cents = cents;
    // }
   
    calcFreq(name, oct, cents)
    {
        let ratio = 2**(cents/1200); //ratio between og note and new cents
        let thisName = this.calcIndex(name);
        return (thisName == 'none') ? 60 : noteFreqs[thisName] * 2**(oct - 1) * ratio;
    }

    //key on a piano
    calcNum(name, oct)
    {
        let thisName = this.calcIndex(name);
        return thisName - 8 + (12*oct);
    }

    //calculate note index
    calcIndex(name)
    {
        let thisName = 'none';
        noteNames.reduce((acc, val, ind) => 
        {
            if(val.includes(name))
            {
                thisName = ind;
            }
        }, 0);

        return thisName;
    }

    toString()
    {
        return this.name + this.oct + "/" + this.cents + " cents";
    }
}