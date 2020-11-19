import React from "react";
import StockForm from "./stock_form";
import { connect } from "react-redux";
import "./form.scss";
import {
  stopUploadingProcess,
  startUploadingProcess,
} from "../../Redux/Upload/( a - r )upload";

class FormComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    console.log(props, "from Form");
  }

  handleSubmit = (values) => {
    console.log(values["files"].files, " files ", values, " values from form");
  };

  componentDidMount() {
    // !this.props.uploading && window.location.pathname === "/upload"
    //   ? this.props.startUploadingProcess()
    //   : null;
    if (
      this.props.uploading == false &&
      window.location.pathname === "/upload"
    ) {
      this.props.startUploadingProcess();
    }
    console.log(
      window.location,
      " FORM SECTION MOUNT +++++ ",
      this.props.uploading
    );
  }

  componentWillUnmount() {
    console.log(" FORM SECTION UNMOUNT");
    this.props.stopUploadingProcess();
  }

  render() {
    return (
      <section className="form_section">
        <StockForm />
      </section>
    );
  }
}

const dispatchToProps = {
  stopUploadingProcess,
  startUploadingProcess,
};

export const FormSection = connect(
  (state) => ({ uploading: state.uploading }),
  dispatchToProps
)(FormComponent);
