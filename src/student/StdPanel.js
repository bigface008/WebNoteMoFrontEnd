import React from "react";
import { Table, List, Avatar, Tooltip, Button, Form, Icon, Input, Checkbox, Pagination, BackTop, Collapse } from "antd";
// import ProblemList from "../problem/ProblemList";
import ProblemRow from "../problem/ProblemRow";
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
        let content;
        switch (this.state.show_panel) {
            case INIT_PANEL:
                {
                    content = (<div>
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
                    </div>);
                    break;
                }
            case EDIT_PANEL:
                {
                    content = (<ProblemEditor
                        problem={this.state.chose_problem}
                        type="edit" />);
                    break;
                }
            case ADD_PANEL:
                {
                    content = (<ProblemEditor
                        type="add" />);
                    break;
                }
            case TEST_PANEL:
                {
                    content = (<div>
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
                    </div>);
                    content = (<ProblemEditor
                        problem={this.state.chose_problem}
                        type="test" />);
                    break;
                }
            default:
                break;
        }

        return (
            <div className="Std-panel">
                <header className="Std-header">
                    <h1 className="Std-title">Web Note</h1>
                    <p className="Usr-info">
                        Hello, {this.state.usr}!
                            </p>
                </header>
                {content}
                <Collapse accordion
                    defaultActiveKey={['0']}
                    className="problem-table">{
                        this.state.show_problems.map((row, rowid) =>
                            <Panel
                                header={"Problem" + row.problemID + " " + row.Name}
                                key={rowid}
                                className="single-row">
                                <ProblemRow key={rowid} problem={row} />
                                {/* <div className="problem-icon">
                                    <Tooltip title="Confirm change">
                                        <Icon
                                            value={row.problemID}
                                            type="check"
                                        />
                                    </Tooltip>
                                    &nbsp;&nbsp;&nbsp;
                                    <Tooltip title="Delete the problem">
                                        <Icon
                                            value={row.problemID}
                                            type="close"
                                        />
                                    </Tooltip>
                                    &nbsp;&nbsp;&nbsp;
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
                                    <p>{"Add Date: " + row.addDate}</p>
                                    <p>{"Semester: " + row.semester}</p>
                                    <p>{"Latest Edit Date: " + row.latestEditDate}</p>
                                    <p>{"Description: " + row.Description}</p>
                                </div> */}
                            </Panel>, this)}
                </Collapse>
                <BackTop />
            </div>
        );
    }

    getInitPanel() {
    }
}

export default StdPanel;