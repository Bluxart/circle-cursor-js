import Bowser from 'bowser';

class Browser {

    constructor() {

        this.bowser = Bowser.getParser(window.navigator.userAgent);

        this.addPlatformClasses();
        this.addBrowserClasses();

    }

    addPlatformClasses() {

        const platformType = this.bowser.getPlatformType();
        document.documentElement.classList.add('is-' + platformType);

    }

    addBrowserClasses() {

        const browserName = this.bowser.getBrowserName();

        if( browserName ) {
            document.documentElement.classList.add('is-' + browserName.toLowerCase());
        }

    }

    isHandheld() {

        const platformType = this.bowser.getPlatformType();
        return platformType === 'tablet' || platformType === 'mobile';

    }

    getBowserInstance() {
        return this.bowser;
    }

}

export default new Browser();
