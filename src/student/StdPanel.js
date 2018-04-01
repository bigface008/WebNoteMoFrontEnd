import React from "react";
import { Button, Form, Icon, Input, Checkbox } from "antd";
import ProblemList from "./ProblemList";
import ProEditor from "../editor/ProEditor";
import TestPanel from "./TestPanel";
import EditPanel from "./EditPanel";
import SearchPanel from "./SearchPanel";
import "../style/Student.css";

const Search = Input.Search;
const FormItem = Form.Item;

const INIT_PANEL = 0;
const EDIT_PANEL = 1;
const TEST_PANEL = 2;

function matchProblem(search_word, problem) {
    console.log(problem.Name);
    console.log(problem.problemID);
    console.log(problem.subject);
    console.log(problem.redoNumber);
    if ((problem.Name === search_word)
        || (problem.problemID === search_word)
        || (problem.subject === search_word)
        || (problem.redoNumber === search_word))
        return true;
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
            show_problems: null,
            show_panel: INIT_PANEL,
            search_word: "",
            toggle_search: false
        };
    }

    getSearchWord(e) {
        let val = e.target.value;
        this.setState({ search_word: val });
    }

    handleTest() {
        this.setState({ show_panel: TEST_PANEL });
    }

    handleEdit() {
        this.setState({ show_panel: EDIT_PANEL });
    }

    handleSearch(value) {
        // console.log("SB");
        // console.log(this.state.search_word);
        // console.log(this.state.problems.length);
        let temp = Array();
        for (let i = 0; i < this.state.problems.length; i++) {
            if (matchProblem(this.state.search_word, this.state.problems[i]))
                temp.push(this.state.problems[i]);
        }
        this.setState({
            search_word: value,
            show_problems: temp,
            toggle_search: true
        });
    }

    getSearchTable() {
        if (this.state.toggle_search) {
            console.log(this.state.show_problems.length);
            return (
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
                            </tr>, this)
                    }</tbody>
                </table>
            );
        }
        else
            return <div />;
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
        return (
            <div className="Std-panel">
                <header className="Std-header">
                    <h1 className="Std-title">Web Note</h1>
                    <p className="Usr-info">
                        Hello, {this.state.usr}!
                    </p>
                </header>
                {/* <form action=""> */}
                    <Search
                        placeholder="input search text"
                        // type="text"
                        // suffix=""
                        // value={this.state.search_word}
                        // onChange={this.getSearchWord}
                        onSearch={value => this.handleSearch(value)}
                    />
                {/* </form> */}
                <Icon type="search" />
                <ProblemList base={this.state.problems} />
                <Button className="test-button" onClick={this.handleTest} >
                    Test
                </Button>
                <Button className="add-problem-button" onClick={this.handleEdit} >
                    Add a problem
                </Button>
                {/* <Button className="search-button" onClick={this.handleSearch} >
                    Search
                </Button> */}
                {this.getSearchTable()}
            </div>
        );
    }
}

export default StdPanel;