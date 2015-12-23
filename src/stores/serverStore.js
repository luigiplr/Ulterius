import alt from '../alt';
import serverActions from '../actions/serverActions';
import ls from 'local-storage';

class ServerStore {
    constructor() {
        this.bindActions(serverActions);

        this.server = ls('server') || false;
    }
}

export
default alt.createStore(ServerStore);