import React from "react";
import { connect } from "react-redux";
import {
  getDeletionRequest,
  refreshDeletingProcess,
} from "../../../Redux/AdminRoom/a - r _adminRoom";
import { getMainDataRequest } from "../../../Redux/( a-r )getMainData";
class DeleteSection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      deleting: false,
      startDeleting: false,
    };
  }

  componentDidUpdate() {
    if (this.props.deleted == true) {
      this.setState({ clicked: false });
    }
  }

  handleClick = () => {
    
    this.setState({ clicked: !this.state.clicked });
    console.log(this.props.startDeleting, "delete");
  };

  handleClick_no = () => {
    this.setState({
      clicked: false,
    });
  };

  handleClick_yes = () => {
    this.setState({
      deleting: this.props.deleting,
      deleted: this.props.deleted,
    });

    if (this.props.deleted) {
      this.setState({ clicked: false });
    }

    let caseItem = {
      docId: this.props.id,
      coords: this.props.coords,
    };

    this.props.urls.map((item, index) => {
      caseItem[`file${index}`] = item.filename;
    });

    console.log(caseItem);

    this.props.getDeletionRequest(caseItem);
  };

  render() {
    return (
      <div className="delete_section">
        {this.state.clicked ? (
          this.props.deleting ? (
            <div className="deleting_section">Deleting ...</div>
          ) : (
            <div>
              <button onClick={this.handleClick} className="delete_button">
                delete
              </button>
              <div className="question_section">
                <span className="question_title">Are you sure ?</span>
                <button
                  onClick={this.handleClick_yes}
                  className="answer_button _yes"
                >
                  yes
                </button>
                <button
                  onClick={this.handleClick_no}
                  className="answer_button _no"
                >
                  no
                </button>
              </div>
            </div>
          )
        ) : (
          <button onClick={this.handleClick} className="delete_button">
            delete
          </button>
        )}
      </div>
    );
  }
}

const deleteRequestToProps = {
  getDeletionRequest,
  getMainDataRequest,
  refreshDeletingProcess,
};

const stateToProps = (state) => {
  return {
    deleting: state.deletion.deleting,
    deleted: state.deletion.deleted,
    failure: state.deletion.failure,
    refresh: state.deletion.refresh
  };
};

export default connect(stateToProps, deleteRequestToProps)(DeleteSection);
