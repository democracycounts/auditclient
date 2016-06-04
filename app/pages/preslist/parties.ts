import {NavController, NavParams, App, IonicApp, Page} from 'ionic-angular';
import {MenuController} from 'ionic-angular';
import {
    Control,
    ControlGroup,
    NgForm,
    Validators,
    NgControl,
    ControlValueAccessor,
    NgControlName,
    NgFormModel,
    FormBuilder
} from '@angular/common';
import {Vote} from '../../vote';

import {VoteService} from '../../vote-service';
import {PageManagerService} from '../../page-manager-service';

@Page({
  templateUrl: 'build/pages/preslist/party.html'
})
export class PartyListPage {

    pageMgrSvc:PageManagerService;
    voteSvc:VoteService;
    partySym: string;
    party: string;
    candidates : Vote[] = [];
    cands: Control;
    president: ControlGroup;
    pres: number;

    constructor(private nav: NavController, navParams: NavParams,
                private menu: MenuController
               ) {
        this.pageMgrSvc = navParams.get('pageMgrSvc');
        this.voteSvc = navParams.get('voteSvc');
        this.partySym = navParams.get('party');
        this.party = this.pageMgrSvc.getPartyTitle(this.partySym);
        this.candidates = this.pageMgrSvc.getCandidates(this.partySym);
        this.cands = new Control("");
        this.president = new ControlGroup({
            "cands": this.cands
        });
        this.pres = -1;
    }

    onCandChange(inval:Vote) {
        this.pres = inval.val;
        this.voteSvc.choosePres(this.pres, inval.label);
    }

    onVote() {
        // console.log('Submitting form', this.pres);
        // event.preventDefault();
        if (this.pres < 0) {
            alert('No Candidate for President was Chosen!\n'
		 + 'Choose One or None of the Above Option');
        } else {
            var pg = this.pageMgrSvc.getSenatePage();
            if (pg) {
                /* this.nav.setRoot(pg, { */
                this.nav.push(pg, {
                    pageMgrSvc: this.pageMgrSvc,
                    voteSvc: this.voteSvc
                });
            }
        }
    }
}
