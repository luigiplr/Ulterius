import React from 'react';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    History
}
from 'react-router';


export
default React.createClass({

    mixins: [PureRenderMixin, History],

    getInitialState() {
        return {
            active: '/',
            tabs: [{
                name: 'Dashboard',
                path: '/'
            }, {
                name: 'Network',
                path: '/'
            }, {
                name: 'Incidents',
                path: '/'
            }]
        };
    },
    markActive(tab, event) {
        this.setState({
            active: tab
        });
        _.defer(this.history.replaceState.bind(this, null, tab));
    },
    render() {
        return (
            <aside className="sidebar">
                <ul>
                    {
                        this.state.tabs.map((tab, idx) => {
                            return (
                                <li key={idx} onClick={this.markActive.bind(this, tab.path)} className={(this.state.active === tab.path) ? 'active' : ''}>
                                    {tab.name}
                                </li>
                                );
                        }, this)
                    }
                </ul>
            </aside>
        );
    }
});