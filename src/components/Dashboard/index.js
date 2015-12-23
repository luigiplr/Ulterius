import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';



export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {

        };
    },

    componentDidMount() {

    },

    componentWillUnmount() {

    },

    update() {
        if (this.isMounted()) {
            this.setState({

            });
        }
    },
    render() {
        return (
            <div className="page">
                <section>
                    <div>
                        <canvas id="canvas" height="450" width="600"/>
                    </div>
                </section>
            </div>
        );
    }
});