import {ViewChild} from '@angular/core';
import {App, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
// import {ListPage} from './pages/list/list';
import {SignInPage} from './pages/signin/signin';
import {PageManagerService} from './page-manager-service';
import {VoteService} from './vote-service';

/*
interface PageManagerInterface{
    ():PageManagerService;
}

declare var getPageManagerService: PageManagerInterface;
*/

@App({
    templateUrl: 'build/app.html',
    config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
    providers: [PageManagerService, VoteService]
})

class MyApp {
    @ViewChild('content') nav: Nav;

    // make HelloIonicPage the root (or first) page
    rootPage: any = SignInPage;
    signInPages: Array<{title: string, component: any}>;
    // pages: Array<{title: string, component: any}>;
    menus: Array<{title: string, mid: string, 
		  pages:Array<{title: string, component: any}> }>;

    pageMgrSvc: PageManagerService;

    constructor(
        private platform: Platform,
        private menu: MenuController,
        pageMgrSvc: PageManagerService
    ) {
        
	this.initializeApp();
	this.pageMgrSvc = pageMgrSvc;
	this.pageMgrSvc.setMenu(menu);
	this.menus = this.pageMgrSvc.setupMenus();
	this.pageMgrSvc.chooseMenu('signin');
	// this.pages = pageMgrSvc.getCurPages();


    // set our app's pages
/*    this.pages = [
        { title: 'Sign-In', component: SignInPage },
        { title: 'Democratic Presidential Candidates', component: DemocratListPage },
        { title: 'Republican Candidates', component: RepublicanListPage },
        { title: 'American Independent Candidates', component: AmIndListPage },
        { title: 'Green Candidates', component: GreenListPage },
        { title: 'Libertarian Candidates', component: LibertarianListPage },
        { title: 'Peace and Freedom Candidates', component: PeaceFreeListPage },
        { title: 'No Party Preference Candidates', component: NppListPage },
        { title: 'Senate Candidates', component: SenatorsListPage },
*/
        /* { title: 'My First List', component: ListPage } */
/*    ];*/
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }
}
