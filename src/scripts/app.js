import Browser from './utils/browser';
import Cursor from './cursor/cursor';

if ( !Browser.isHandheld() ) {
    Cursor.init();
    console.log('Non-touch device detected. Initializing cursor.');
} else {
    Cursor.disable();
    console.log('Touch device detected. Disabling cursor.');
}
