import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'lodash';

import TeamSelectorActions from './actions';
import teamsEngineStore from '../../stores/teamsEngineStore';


export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            active: false,
            teams: {}
        };
    },

    componentWillMount() {
        teamsEngineStore.listen(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                active: teamsEngineStore.getState().selectedTeam,
                teams: teamsEngineStore.getState().teams
            });
        }
    },

    render() {
        console.log(this.state.teams)

        return (
            <aside className="teams">
                <div className="team">
                </div> 
                <div onClick={TeamSelectorActions.add} className="add">
                    <i className="ion-plus-round"/>
                </div>
            </aside>
        );
    }
});