import React from 'react';


export
default React.createClass({

    getInitialState() {
        return {
        };
    },
    componentWillMount() {
    },
    update() {
        if (this.isMounted()) {
            this.setState({
            });
        }
    },
    render() {
        return (
        <aside className="sidebar">
            <h1>Channels</h1>
            <ul>
                <li className="active">#general </li>
                <li>#slakie</li>
            </ul>
            <h1>DM's</h1>
            <ul>
                <li>Hurr</li>
                <li>Durr</li>
            </ul>


        </aside>
        );
    }
});