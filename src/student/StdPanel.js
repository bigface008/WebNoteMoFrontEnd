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

function getNewID() {
    return String(Math.floor(Math.random() * (900) + 100));
}

function getTodayDate() {
    let date = new Date();
    let result = String(date.getFullYear()) + "."
        + String(date.getMonth()) + "."
        + String(date.getDate());
    console.log(result);
    return result;
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
        let new_problem = Object();
        new_problem.Name = "None";
        new_problem.userName = this.state.usr;
        new_problem.problemID = getNewID();
        new_problem.Description = "None";
        new_problem.Reason = "None";
        new_problem.subject = "None";
        new_problem.semester = "None";
        new_problem.latestEditDate = getTodayDate();
        new_problem.redoTimes = 0;
        new_problem.answer = { getTodayDate: "None" };

        let all_problems = this.state.problems;
        all_problems.unshift(new_problem);
        this.setState({ problems: all_problems });

        // Update database
    }

    handleDel(problem_id) {
        let temp = [];
        for (let i = 0; i < this.state.problems.length; i++) {
            if (problem_id != this.state.problems[i].problemID) {
                temp.push(this.state.problems[i]);
            }
        }

        // Update database.

        let temp0 = [];
        for (let i = 0; i < this.state.show_problems.length; i++) {
            if (problem_id != this.state.show_problems[i].problemID) {
                temp0.push(this.state.show_problems[i]);
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
            if (temp[i].problemID === new_problem.problemID) {
                temp[i] = new_problem;
            }

        let temp0 = this.state.show_problems;
        for (let i = 0; i < this.state.show_problems.length; i++)
            if (temp0[i].problemID === new_problem.problemID) {
                temp0[i] = new_problem;
            }

        // Update database.

        this.setState({
            problems: temp,
            show_problems: temp0
        })
    }

    render() {
        return (
            <div className="Std-panel">
                <header className="Std-header">
                    <h1 className="Std-title">Web Note</h1>
                    <p className="Usr-info">
                        Hello, {this.state.usr}!
                            </p>
                </header>
                <div>
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
                </div>
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