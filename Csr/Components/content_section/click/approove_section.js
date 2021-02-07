import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getApproovingRequest } from "../../../Redux/AdminRoom/a - r _adminRoom";

class ApprooveSection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      approove: false,
    };
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleClick_yes = () => {
    this.props.getApproovingRequest({ docId: this.props.id });
  };

  handleClick_no = () => {
    this.setState({ clicked: false });
  };

  render() {
    return (
      <div className="approove_section">
        <button onClick={this.handleClick} className="approove_button">
          approove
        </button>
        {this.state.clicked ? (
          <div className="question_section">
            <span className="question_title">Are you sure ?</span>
            <button
              onClick={this.handleClick_yes}
              className="answer_button _yes"
            >
              yes
            </button>
            <button onClick={this.handleClick_no} className="answer_button _no">
              no
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(null, { getApproovingRequest })(ApprooveSection);
