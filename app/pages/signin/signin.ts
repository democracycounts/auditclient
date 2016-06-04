import {Page, NavController, MenuController, NavParams} from 'ionic-angular';
import {VoteService} from '../../vote-service';
import {PageManagerService} from '../../page-manager-service';

@Page({
    templateUrl: 'build/pages/signin/signin.html',
    // providers: [VoteService]
})
export class SignInPage {
    nppSelected: boolean = false;
    pageMgrSvc:PageManagerService;
    voteSvc:VoteService;
    party: string;
    nppparty: string;
    cryptokey: string;

    constructor(private nav: NavController, navParams: NavParams, 
                private menu: MenuController,
                pageMgrSvc:PageManagerService, voteSvc:VoteService ) {
        // If we navigated to this page, we will have an item available as a nav param
        // this.party = null;
        this.nav = nav;
        this.menu = menu;
        this.voteSvc = voteSvc;
        this.pageMgrSvc = pageMgrSvc;
        this.pageMgrSvc.setMenu(menu);
    }

    onChange(value) {
        this.party = value;
        this.voteSvc.setParty(value);
        if (value == 'npp') {
            this.nppSelected = true;
        } else {
            this.nppSelected = false;
        }
    }

    onNppChange(value) {
        this.nppparty = value;
        this.voteSvc.setNppParty(value);
    }

    onKeyChange(value) {
        this.cryptokey = value;
        this.voteSvc.setKey(value);
    }

    onSignIn() {
        if (this.voteSvc.signInValuesNotFilled()) {
            alert('Not all Sign-In values are set!');
        } else {
            var vs = this.voteSvc;
            this.pageMgrSvc.setSignedInPages(vs.getParty(), vs.getNppParty());
            this.voteSvc.setSignedIn(true);
            this.voteSvc.setPartyVals(vs.getParty(), vs.getNppParty());
            // alert('about to open page' + this.pageMgrSvc.getDefaultPage());
            this.nav.push(this.pageMgrSvc.getDefaultPage(), {
            /* this.nav.setRoot(this.pageMgrSvc.getDefaultPage(),{ */
                pageMgrSvc: this.pageMgrSvc,
                voteSvc: this.voteSvc, 
                party: vs.getRealParty()
            });
        }
    }

}
