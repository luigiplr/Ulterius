import React from 'react';
import {
    History
}
from 'react-router';
import HeaderStore from './store';
import HeaderActions from './actions';


export
default React.createClass({

    mixins: [History],

    getInitialState() {
        return {
            maximized: false
        };
    },
    componentWillMount() {
        HeaderStore.listen(this.update);
    },
    update() {
        if (this.isMounted()) {
            this.setState({
                maximized: HeaderStore.getState().maximized
            });
        }
    },
    render() {
        return (
            <header>
                <div className={'controls ' + process.platform}>
                    <div className="close" onClick={HeaderActions.close}>
                        <i className="ion-ios-close-empty"></i>
                    </div>
                    <div className="toggle" onClick={HeaderActions.toggleMaximize}>
                        <i></i>
                        <i></i>
                    </div>
                    <div className="minimize" onClick={HeaderActions.toggleMinimize}>
                        <i></i>
                    </div>
                </div>
                <h1>Slakie</h1>
            </header>
        );
    }
});