import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    RouteContext
}
from 'react-router';
import _ from 'lodash';
import {
    mouseTrap
}
from 'react-mousetrap';
import {
    ipcRenderer
}
from 'electron';

import Header from './Header';
import Sidebar from './Sidebar';

import updaterActions from '../actions/updateActions';
import analyticsActions from '../actions/analyticsActions';

const Framework = React.createClass({

    mixins: [PureRenderMixin, RouteContext],

    getInitialState() {
        return {
            updateChecked: false
        };
    },

    componentWillMount() {
        this.props.bindShortcut('ctrl+d', () => ipcRenderer.send('app:toggleDevTools'));
    },

    componentDidMount() {},

    componentWillUnmount() {},

    update() {
        if (this.isMounted()) {
            this.setState({});
        }
    },

    render() {
        return (
            <div>
              <Header />
              <Sidebar />
              {React.cloneElement(this.props.children, {query: this.props.query})}
            </div>
        );
    }
});


export
default mouseTrap(Framework)