import alt from '../alt';


class ServerActions {
    constructor() {
        this.generateActions(
            'added',
            'removed',
            'reconnected'
        );
    }


    add() {

    }

}

export
default alt.createActions(ServerActions);