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

import {SENATORS} from '../../senators';

@Page({
  templateUrl: 'build/pages/senatelist/senates.html'
})
export class SenatorsListPage {
    pageMgrSvc:PageManagerService;
    voteSvc:VoteService;
    selectedItem: any;
    party: string;
    candidates : Vote[] = [];
    cands: Control;
    senate: ControlGroup;
    sen: number;

    constructor(private nav: NavController, navParams: NavParams,
                private menu: MenuController
               ) {
        this.pageMgrSvc = navParams.get('pageMgrSvc');
        this.voteSvc = navParams.get('voteSvc');
        this.nav = nav;
        this.candidates = SENATORS;
        this.cands = new Control("");
        this.senate = new ControlGroup({
            "cands": this.cands
        });
        this.sen = -1;
    }

    onCandChange(inval:Vote) {
        this.sen = inval.val;
        this.voteSvc.chooseSen(this.sen, inval.label);
    }

    doSubmit(event) {
        // console.log('Submitting form', this.senate.value);
        // event.preventDefault();
    }

    onVote() {
        // console.log('Submitting form', this.pres);
        // event.preventDefault();
        if (this.sen < 0) {
            alert('No Candidate for Senate was Chosen!\n'
                  + 'Choose One or None of the Above Option');
        } else {
            var vs = this.voteSvc;
            var presval;
            if (vs.getPresName()) {
                presval = vs.getPresName();
            } else {
                presval = 'NOBODY'
            }
            alert('You voted for:\n' + presval + ' for President=' + 
                  vs.getPresPollId() + ', and\n'
                  + vs.getSenName() + ' for Senator');
            /* Do something else */
            this.pageMgrSvc.setSignedInPages('signin',null);
            this.voteSvc.reInitialize();
            this.nav.setRoot(this.pageMgrSvc.getDefaultPage(),{
                pageMgrSvc: this.pageMgrSvc,
                voteSvc: vs, 
                party: vs.getRealParty()
            });
        }
    }

}
