import React from "react";
import { Table, List, Avatar, Tooltip, Button, Form, Icon, Input, Checkbox, Pagination, BackTop, Collapse } from "antd";
import ProblemList from "../problem/ProblemList";
import ProblemEditor from "../editor/ProblemEditor";
import "../style/Student.css";

const Search = Input.Search;
const FormItem = Form.Item;
const Panel = Collapse.Panel;

const INIT_PANEL = 0;
const EDIT_PANEL = 1;
const TEST_PANEL = 2;
const ADD_PANEL = 3;

function matchProblem(search_word, problem) {
    if ((problem.Name === search_word)
        || (problem.problemID === search_word)
        || (problem.subject === search_word)
        || (problem.redoNumber === search_word)
        || (search_word === ""))
        return true;
}


class StdPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.getInitPanel = this.getInitPanel.bind(this);
        this.state = {
            usr: this.props.usr,
            psd: this.props.psd,
            id: this.props.id,
            problems: this.props.problems,
            show_problems: this.props.problems,
            show_panel: INIT_PANEL,
            search_word: "",
            chose_problem: null
        };
    }

    handleSearch(value) {
        let temp = Array();
        for (let i = 0; i < this.state.problems.length; i++) {
            if (matchProblem(value, this.state.problems[i])) {
                temp.push(this.state.problems[i]);
            }
        }
        this.setState({
            search_word: value,
            show_problems: temp,
        });
    }

    handleAdd() {
        // console.log("SB");
        this.setState({ show_panel: ADD_PANEL });
    }

    render() {
        switch (this.state.show_panel) {
            case INIT_PANEL:
                return this.getInitPanel();
            case EDIT_PANEL:
                return <ProblemEditor
                    className="problem-editor"
                    type="edit"
                />;
            case ADD_PANEL:
                return <ProblemEditor
                    className="problem-editor"
                    type="add"
                />;
        }
        return (this.getModPanel());
    }

    getInitPanel() {
        return (
            <div className="Std-panel">
                <header className="Std-header">
                    <h1 className="Std-title">Web Note</h1>
                    <p className="Usr-info">
                        Hello, {this.state.usr}!
                            </p>
                </header>
                <p>
                    <Search
                        className="search-form"
                        placeholder="input search text"
                        onSearch={value => this.handleSearch(value)} />
                </p>
                <p>
                    <Button
                        className="add-problem-button"
                        onClick={this.handleAdd}>
                        + Add a problem
                            </Button>
                </p>
                <Collapse accordion className="problem-table">{
                    this.state.show_problems.map((row, rowid) =>
                        <Panel
                            header={"Problem" + row.problemID + " " + row.Name}
                            key={rowid}
                            className="single-row">
                            <div className="problem-icon">
                                <Tooltip title="Redo the problem">
                                    <Icon
                                        value={row.problemID}
                                        type="edit"
                                    />
                                </Tooltip>
                                &nbsp;&nbsp;&nbsp;
                                        <Tooltip title="Edit the problem">
                                    <Icon
                                        value={row.problemID}
                                        type="share-alt"
                                    />
                                </Tooltip>
                            </div>
                            <div className="single-problem-panel">
                                <p>{"Subject: " + row.subject}</p>
                                <p>{"Latest Edit Date: " + row.latestEditDate}</p>
                            </div>
                        </Panel>, this)
                }</Collapse>
                <BackTop />
            </div>
        );
    }
}

export default StdPanel;