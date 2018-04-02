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

function getFirstShowProblemID(show_problems) {
    return show_problems[0].problemID;
}


class StdPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.changeProblem = this.changeProblem.bind(this);
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

    handleDel(problem_id) {
        // console.log(problem_id + " handle del in std");
        let temp = [];
        for (let i = 0; i < this.state.problems.length; i++) {
            if (problem_id != this.state.problems[i].problemID) {
                temp.push(this.state.problems[i]);
                // console.log("problem " + this.state.problems[i].problemID);
            }
        }

        // Update database.

        let temp0 = [];
        for (let i = 0; i < this.state.show_problems.length; i++) {
            if (problem_id != this.state.show_problems[i].problemID) {
                temp0.push(this.state.show_problems[i]);
                // console.log("show problem" + this.state.show_problems[i].problemID);
            }
        }

        this.setState({
            problems: temp,
            show_problems: temp0
        });
    }

    changeProblem(new_problem) {
        let temp = this.state.problems;
        for (let i = 0; i < this.state.problems.length; i++)
            if (temp[i].problemID === new_problem.problemID)
            {
                temp[i] = new_problem;
            }

        let temp0 = this.state.show_problems;
        for (let i = 0; i < this.state.show_problems.length; i++)
            if (temp0[i].problemID === new_problem.problemID)
            {
                temp0[i] = new_problem;
            }

        // Update database.

        this.setState({
            problems: temp,
            show_problems: temp0
        })
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
                    className="problem-table">{
                        this.state.show_problems.map((row, rowid) =>
                            <Panel
                                header={"Problem" + row.problemID + " " + row.Name}
                                key={row.problemID}
                                className="single-row">
                                <ProblemRow
                                    key={rowid}
                                    problem={row}
                                    callbackDel={this.handleDel}
                                    callbackChangeProblem={this.changeProblem}
                                />
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