import Slack from 'slack-client';
import {
    app
}
from 'remote';
import path from 'path';
import alt from '../../alt';
import OAuthUtil from '../../utils/OAuthUtil';
import commonUtil from '../../utils/commonUtil';

const ConfPath = path.join(app.getPath('userData'), 'teams.conf');

console.log(ConfPath);

class TeamselectorActions {
    constructor() {
        this.generateActions(
            'added',
            'loggedin'
        );
    }

    add() {
    	this.dispatch();
    	
        return OAuthUtil.getAuthorization()
            .then(token => {
                var slackObj = {
                    api: new Slack(token.access_token, true, false),
                    token: token
                };
                commonUtil.saveJson(ConfPath, token).then(() => {
                    this.actions.added(slackObj)
                }).catch(e => {
                    console.error(e);
                });
            })
            .catch(() => {

            });
    }


}

export
default alt.createActions(TeamselectorActions);