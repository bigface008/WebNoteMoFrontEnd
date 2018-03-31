import React from "react";
import { Button } from "antd";
import ProblemList from "./ProblemList";
import ProEditor from "../editor/ProEditor";
import TestPanel from "TestPanel";

const INIT_PANEL = 0;
const EDIT_PANEL = 1;
const TEST_PANEL = 2;
const SRCH_PANEL = 3;

class StdPanel extends React.Component {
    constructor(props) {
        super(props);
        this.getInitPanel = this.getInitPanel.bind(this);
        this.handleTest = this.handleTest.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.state = {
            usr: this.props.usr,
            psd: this.props.psd,
            id: this.props.id,
            problems: this.props.problems,
            show_panel: INIT_PANEL
        };
    }

    handleTest() { }

    handleEdit() { }

    handleSearch() { }

    render() {
        switch (this.state.show_panel) {
            case EDIT_PANEL:
                return <ProblemList />;
            case TEST_PANEL:
                return <TestPanel />;
            case SRCH_PANEL:
                return ;
            default:
                return this.getInitPanel();
        }

    }

    getInitPanel() {
        return (
            <div className="Std-panel">
                <header className="Std-header">
                    <h1 className="Std-title">Student</h1>
                </header>
                <p className="Usr-info">
                    Student {this.state.usr}
                </p>
                <ProblemList base={this.state.problems} />
                <Button className="test-button" onClick={this.handleTest()} >
                    Test
                </Button>
                <Button className="add-problem-button" onClick={this.handleEdit()} >
                    Add a problem
                </Button>
                <Button className="" onClick={this.handleSearch()} >
                    Search
                </Button>

            </div>
        );
    }
}

export default StdPanel;