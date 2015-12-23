import alt from '../../alt'
import {
    ipcRenderer
}
from 'electron';

class HeaderActions {
    constructor() {
        this.generateActions(
            'maximized',
            'minimized'
        );
    }

    toggleMaximize() {
        this.dispatch();
        let state = !ipcRenderer.sendSync('app:get:maximized');
        ipcRenderer.send('app:maximize', state);
        this.actions.maximized(state);
    }

    toggleMinimize() {
        this.dispatch();
        ipcRenderer.send('app:minimize');
        this.actions.minimize();
    }

    close() {
        ipcRenderer.send('app:close');
    }
}

export
default alt.createActions(HeaderActions);
