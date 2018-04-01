import React from "react";
import { Table, List, Avatar, Tooltip, Button, Form, Icon, Input, Checkbox, Pagination, BackTop, Collapse } from "antd";
import ProblemList from "./ProblemList";
import ProEditor from "../editor/ProEditor";
import TestPanel from "./TestPanel";
import EditPanel from "./EditPanel";
import SearchPanel from "./SearchPanel";
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

function getProblemHeader(row) {
    return "Problem " + row.problemID + "  " + row.Name + "  " + row.subject;
}

class StdPanel extends React.Component {
    constructor(props) {
        super(props);
        this.getSearchWord = this.getSearchWord.bind(this);
        this.handleTest = this.handleTest.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.getInitPanel = this.getInitPanel.bind(this);
        this.getSearchTable = this.getSearchTable.bind(this);
        this.getProblemById = this.getProblemById.bind(this);
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

    getSearchWord(e) {
        let val = e.target.value;
        this.setState({ search_word: val });
    }

    getProblemById(id) {
        for (let i = 0; i < this.state.problems; i++)
            if (this.state.problems[i].problemId === id)
                return this.state.problems[i];
    }

    handleTest(e) {
        let val = this.getProblemById(e.target.value);
        this.setState({
            show_panel: TEST_PANEL,
            chose_problem: val
        });
    }

    handleEdit(e) {
        let val = this.getProblemById(e.target.value);
        this.setState({
            show_panel: EDIT_PANEL,
            chose_problem: val
        });
    }

    handleAdd() {
        this.setState({ show_panel: ADD_PANEL });
    }

    handleSearch(value) {
        let temp = Array();
        for (let i = 0; i < this.state.problems.length; i++) {
            if (matchProblem(value, this.state.problems[i]))
                temp.push(this.state.problems[i]);
        }
        this.setState({
            search_word: value,
            show_problems: temp,
        });
    }

    getSearchTable() {
        // const columns = [{
        //     title: "Problem ID",
        //     dataIndex: "problemID",
        //     render: text => <a href="#">{text}</a>,
        // },{
        //     title: "Problem Title",
        //     dataIndex: "Name",
        // },{
        //     title: "Subject",
        //     dataIndex: "subject",
        // },{
        //     title: "Last Edit Date",
        //     dataIndex: "latesEditDate",
        // }];
        return (
            <Collapse accordion className="problem-table">{
                this.state.show_problems.map((row, rowid) =>
                    <Panel key={rowid} className="single-row" header={getProblemHeader(row)}>
                        <div className="problem-icon">
                            <Tooltip title="Redo the problem">
                                <Icon
                                    value={row.problemID}
                                    type="edit"
                                    onClick={this.handleTest}
                                />
                            </Tooltip>
                            &nbsp;&nbsp;&nbsp;
                            <Tooltip title="Edit the problem" >
                                <Icon
                                    value={row.problemID}
                                    type="share-alt"
                                    onClick={this.handleEdit}
                                />
                            </Tooltip>
                        </div>
                        <div className="single-problem-panel" >
                            <p>{"Subject: " + row.subject}</p>
                            <p>{"Latest Edit Date: " + row.latestEditDate}</p>
                        </div>
                    </Panel>, this)
            }</Collapse>
        );
    }

    render() {
        switch (this.state.show_panel) {
            case EDIT_PANEL:
                {
                    console.log(this.state.chose_problem);
                    return <EditPanel
                    problem={this.state.chose_problem}
                    operate={EDIT_PANEL}
                    />;
                }
            case TEST_PANEL:
                {
                    console.log(this.state.chose_problem);
                    return <TestPanel problem={this.state.chose_problem} />;
                }
            case ADD_PANEL:
                {
                    return <EditPanel
                    problem={this.state.chose_problem}
                    operate={ADD_PANEL}
                    />;
                }
            default:
                return this.getInitPanel();
        }
    }

    getInitPanel() {
        let temp = this.getSearchTable();
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
                        onSearch={value => this.handleSearch(value)}
                    />
                </p>
                <p>
                    <Button className="add-problem-button" onClick={this.handleEdit} >
                        + Add a problem
                    </Button>
                </p>
                <br />
                {temp}
                <BackTop />
            </div>
        );
    }
}

export default StdPanel;