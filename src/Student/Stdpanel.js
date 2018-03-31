import React, { Component } from "react";

class Stdpanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usr: this.props.usr,
        };
    }

    render() {
        return (
            <div className="Std-panel" >
                <header className="Std-header" >
                    <h1 className="Std-title">Student</h1>
                </header>
                <p className="Usr-info" >
                    Student {this.state.usr}
                </p>
                
            </div>
        );
    }
}

export default Stdpanel;