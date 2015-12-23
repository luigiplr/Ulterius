import Promise from 'bluebird';
import {
    client as WebSocketClient
}
from 'websocket';
import {
    EventEmitter
}
from 'events';

class ServerEmitter extends EventEmitter {
    constructor(props) {
        super();
        this.client = new WebSocketClient();


        this.client.on('connectFailed', error => this.emit('failed', error));

        this.client.on('connect', connection => {

            connection.on('error', error => this.emit('error', error));

            connection.on('close', () => this.emit('closed'));

            connection.on('message', message => {
                if (message.type === 'utf8') {
                    console.log("Received: '" + message.utf8Data + "'");
                }
            });

        });

        this.client.connect(...props);
    }

}