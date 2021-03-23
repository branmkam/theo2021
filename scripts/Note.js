import {noteNames, noteFreqs} from './globals.js';

export default class Note
{
    constructor(name, oct)
    {
        this.name = (name.trim().substring(0,1).toUpperCase()) + name.substring(1).trim();
        if(oct > 7) { oct = 7 }
        else if(oct < 0) { oct = 0 }
        this.oct = oct;
        this.freq = this.calcFreq(this.name, this.oct);
        this.number = this.calcNum(this.name, this.oct);
    }
   
    calcFreq(name, oct)
    {
        let thisName = this.calcIndex(name);
        return (thisName == 'none') ? 60 : noteFreqs[thisName] * 2**(oct - 1);
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
        return this.name + this.oct + ": " + this.number;
    }
}