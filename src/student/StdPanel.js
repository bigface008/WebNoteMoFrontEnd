import React from "react";
import { List, Avatar, Tooltip, Button, Form, Icon, Input, Checkbox, Pagination, BackTop, Collapse } from "antd";
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

const PROBLEM_PER_PAGE = 10;

function matchProblem(search_word, problem) {
    // console.log(problem.Name);
    // console.log(problem.problemID);
    // console.log(problem.subject);
    // console.log(problem.redoNumber);
    if ((problem.Name === search_word)
        || (problem.problemID === search_word)
        || (problem.subject === search_word)
        || (problem.redoNumber === search_word))
        return true;
}

function getProblemHeader(row) {
    return "Problem " + row.problemID + "  " + row.Name;
}

class StdPanel extends React.Component {
    constructor(props) {
        super(props);
        this.getSearchWord = this.getSearchWord.bind(this);
        this.handleTest = this.handleTest.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.getInitPanel = this.getInitPanel.bind(this);
        this.getSearchTable = this.getSearchTable.bind(this);
        this.state = {
            usr: this.props.usr,
            psd: this.props.psd,
            id: this.props.id,
            problems: this.props.problems,
            show_problems: this.props.problems,
            show_panel: INIT_PANEL,
            search_word: "",
            toggle_search: true,
            chose_problem_id: null
        };
    }

    getSearchWord(e) {
        let val = e.target.value;
        this.setState({ search_word: val });
    }

    handleTest(e) {
        let val = e.target.value;
        this.setState({ show_panel: TEST_PANEL });
    }

    handleEdit(e) {
        let val = e.target.value;
        this.setState({ show_panel: EDIT_PANEL });
    }

    handleSearch(value) {
        // console.log("SB");
        // console.log(this.state.search_word);
        // console.log(this.state.problems.length);
        let temp = Array();
        for (let i = 0; i < this.state.problems.length; i++) {
            if (matchProblem(value, this.state.problems[i]))
                temp.push(this.state.problems[i]);
        }
        this.setState({
            search_word: value,
            show_problems: temp,
            toggle_search: true
        });
    }

    getSearchTable() {
        return (
            // <Collapse accordion className="problem-table">{
            //     this.state.show_problems.map((row, rowid) =>
            //         <Panel className="single-row" header={getProblemHeader(row)}>
            //             <Tooltip title="Redo the problem" onClick={this.handleTest} >
            //                 <Icon type="edit" />
            //             </Tooltip>
            //             &nbsp;&nbsp;
            //                  <Tooltip title="Edit the problem" onClick={this.handleEdit}>
            //                 <Icon type="share-alt" />
            //             </Tooltip>
            //             <div className="single-problem-panel" >
            //                 <p>{"Subject: " + row.subject}</p>
            //                 <p>{"Latest Edit Date: " + row.latestEditDate}</p>
            //             </div>
            //         </Panel>, this)
            // }</Collapse>
            <table className="problem-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Latest Edit Date</th>
                    </tr>
                </thead>
                <tbody>{
                    this.state.show_problems.map((row, rowid) =>
                        <tr key={rowid}>
                            <td>{row.problemID}</td>
                            <td>{row.Name}</td>
                            <td>{row.subject}</td>
                            <td>{row.latestEditDate}</td>
                            <Tooltip title="Redo the problem">
                                <Icon
                                    value={row.problemID}
                                    type="edit"
                                    onClick={this.handleTest}
                                />
                            </Tooltip>
                            &nbsp;&nbsp;
                            <Tooltip title="Edit the problem" >
                                <Icon
                                    value={row.problemID}
                                    type="share-alt"
                                    onClick={this.handleEdit}
                                />
                            </Tooltip>
                        </tr>, this)
                }</tbody>
            </table>
        );
    }

    render() {
        switch (this.state.show_panel) {
            case EDIT_PANEL:
                return <EditPanel />;
            case TEST_PANEL:
                return <TestPanel />;
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
                    <Button className="test-button" onClick={this.handleTest} >
                        Test
                    </Button>
                    <Button className="add-problem-button" onClick={this.handleEdit} >
                        Add a problem
                    </Button>
                </p>
                {/* <Pagination
                    simple
                    defaultCurrent={1}
                    total={this.state.show_problems.length}
                    showSizeChanger={true}
                    pageSize={PROBLEM_PER_PAGE}
                /> */}
                <br />
                {temp}
                <BackTop />
            </div>
        );
    }
}

export default StdPanel;