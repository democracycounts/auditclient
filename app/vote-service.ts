import {Injectable, bind} from '@angular/core';
import {Http} from '@angular/http';
import {PARTIES} from './parties';

@Injectable()
export class VoteService {

    key : string;
    nppparty: string;
    party : string;
    realparty : string;
    nppSelected : boolean;
    signedIn: boolean;
    http:  Http;
    pres: number;
    senator: number;
    presName: string;
    senName: string;
    partySizes: Array<number>;
    partyOffset: Array<number>;

    constructor(http: Http) {
        this.http = http;
        this.reInitialize();
        this.partyOffset = [0];
        this.partySizes = [0];
        var tot = 0;
        var ii:number;
        // tot += PARTIES[ii]["candidates"].length-1;
        // Initialize Arrays..
        for (ii=0;ii<PARTIES.length;ii++) {
            this.partyOffset.push(0);
            this.partySizes.push(0);
        }
        for (ii=0;ii<PARTIES.length;ii++) {
            var firstval = 
                PARTIES[ii]["candidates"][0]["val"];
            if (firstval != 0) {
                var rem = firstval % 100;
                var pos = (firstval-rem)/100;
                this.partySizes[pos] = PARTIES[ii]["candidates"].length-1;
            }
        }
        for (ii=1;ii<PARTIES.length+1;ii++) {
            this.partyOffset[ii-1] = tot;
            // increase by the previous party size
            tot += this.partySizes[ii-1];
        }
    }

    public reInitialize() {
        this.nppparty = null;
        this.nppSelected = false;
        this.party = null;
        this.realparty = null;
        this.key = null;
        this.signedIn = false;
        this.pres = -1;
        this.senator = -1;
    }

    public getKey() {
        return this.key;
    }
    public isValidKey(inval:string) {
        if (inval == 'badstr') {
            return false;
        } else {
            return true;
        }
    }
    
    public setKey(inval:string) {
        if (this.isValidKey(inval)) {
            this.key = inval;
        } else {
            alert('not a valid key ' + inval);
        }
    }
    public getNppParty() {
        return this.nppparty;
    }
    public setNppParty(inval:string) {
        this.nppparty = inval;
    }
    public getParty() {
        return this.party;
    }
    public setParty(inval:string) {
        this.party = inval;
    }
    public isNppSelected() {
        return this.nppSelected;
    }
    public setNppSelected(inval:boolean) {
        this.nppSelected = inval;
    }
    public isSignedIn() {
        return this.signedIn;
    }
    public setSignedIn(inval: boolean) {
        this.signedIn = inval;
    }

    public signInValuesNotFilled() {
        return ((this.key == null) || 
                (this.party == null));
    }

    public choosePres(inval:number, name:string) {
        this.pres = inval;
        this.presName = name;
    }

    public chooseSen(inval:number, name:string) {
        this.senator = inval;
        this.senName = name;
    }

    public getPres() {
        return this.pres;
    }
    public getPresName() {
        return this.presName;
    }
    public getPresPollId() {
        var presNum = this.pres;
        if (presNum < 0) {
            return 0;
        } else {
            var rem = presNum % 100;
            var offset = (presNum-rem) / 100;
            return this.partyOffset[offset] + rem;
        }
    }

    public getSenator() {
        return this.senator;
    }
    public getSenName() {
        return this.senName;
    }

    public setPartyVals(party, nppparty) {
        this.party = party;
        this.nppparty = nppparty;
        if (party == 'npp') {
            this.realparty = nppparty;
        } else {
            this.realparty = party;
        }
    }

    public getRealParty() {
        return this.realparty;
    }
}
