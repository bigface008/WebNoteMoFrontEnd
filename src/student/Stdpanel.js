import React, { Component } from "react";
import ProblemList from "./ProblemList";

class Stdpanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usr: this.props.usr,
            psd: this.props.psd,
            id: this.props.id,
            problemSet: this.props.problems
        };
    }

    render() {
        return (
            <div className="Std-panel">
                <header className="Std-header">
                    <h1 className="Std-title">Student</h1>
                </header>
                <p className="Usr-info">
                    Student {this.state.usr} {this.state.psd} {this.state.id}
                </p>
                <ProblemList base={this.state.problemSet} />
            </div>
        );
    }
}

export default Stdpanel;