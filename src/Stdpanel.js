import React, { Component } from "react";

class Stdpanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usr: "",
        };
    }

    render() {
        return (
            <div className="Std-pane/*  */l" >
                <header className="Std-header" >
                    <h1 className="Std-title">Student</h1>
                </header>
                <p className="Problem-info" >
                    Student Panel {this.state.usr}
                </p>
            </div>
        );
    }
}

export default Stdpanel;