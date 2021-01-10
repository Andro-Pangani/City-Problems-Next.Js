import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  getUploadingRequest,
  startUploadingProcess,
  stopUploadingProcess,
} from "../../Redux/Upload/( a - r )upload";
import { clearNewItemAddress } from "../../Redux/Upload/( a - r )upload";

class StockForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
    this.fileInputAlternative = React.createRef();

    this.typeInput = React.createRef();
    this.addressInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.latitudeInput = React.createRef();
    this.longitudeInput = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let newItem = {
      files: this.fileInput.current.files,
      type: this.typeInput.current.value,
      address: this.addressInput.current.value,
      description: this.descriptionInput.current.value,
      latitude: this.latitudeInput.current.value,
      longitude: this.longitudeInput.current.value,
    };

    console.log(
      this.fileInput.current.files.length,
      " < - >"
      // this.fileInputAlternative.current.files
    );
    let files = this.fileInput.current.files.length;
    if (files <= 0 || files > 3) {
      this.addressInput.current.value =
        "შეცდომა: ვიდეო და ფოტო მასალა ჯამში არემატება 3 ერთეულს ან არ არის მითითებული საერთოდ";
      return;
    }
    this.props.startUploadingProcess();
    this.props.getUploadingRequest(newItem);

    this.props.clearNewItemAddress();
    this.addressInput.current.value =
      "აირჩიეთ მისამართი რუქაზე ან შეიყვანეთ ხელით";
  };

  componentDidUpdate() {
    // if (this.props.uploading) this.props.stopUploadingProcess();
  }

  render() {
    return (
      <Fragment>
        {this.props.uploaded ? (
          <div className="form_notification">
            თქვენს მიერ მოწოდებული მასალა წარმატებით იქნა ატვირთული
          </div>
        ) : this.props.uploading ? (
          <div className="form_notification">მასალა იტვირთება ...</div>
        ) : this.props.failure ? (
          <div className="form_notification">
            შეფერხება ! მასალა არ ატვირთულა, სცადეთ ხელახლა.
          </div>
        ) : null}
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li className="form_list-item">
              <input name="MyFile" ref={this.fileInput} type="file" multiple />
            </li>
            <li className="form_list-item">
              <div className="form_item_title">აირჩიე პრობლემის ტიპი</div>
              <select ref={this.typeInput} name="type">
                <option />
                <option value="school">სკოლა</option>
                <option value="recreational">სარეკრეაციო სივრცე</option>
                <option value="kids">ბავშვები</option>
                <option value="transport">ტრანსპორტი</option>
                <option value="pollution">დაბინძურება</option>
                <option value="construction">მშენებლობა</option>
                <option value="food">საკვები</option>
              </select>
            </li>
            <li className="form_list-item">
              <div className="form_item_title">მისამართი: </div>
              <textarea
                className="addressInput"
                value={
                  this.props.address
                    ? this.props.address
                    : this.props.uploaded
                    ? "Uploaded"
                    : ""
                }
                placeholder="აირჩიეთ მისამართი რუქაზე ან შეიყვანეთ ხელით"
                ref={this.addressInput}
                name="address"
                readOnly
              />
            </li>
            <li className="form_list-item">
              <div className="form_item_title">კომენტარი</div>
              <textarea
                className="descriptionInput"
                ref={this.descriptionInput}
                placeholder="სურვილისამებრ დაურთეთ განმარტება"
                name="description"
              />
            </li>
            {/* <li>
              <li className="form_list-item">
                <input
                  name="MyFileAlternative"
                  ref={this.fileInputAlternative}
                  type="file"
                  multiple
                />
              </li>
            </li> */}
          </ul>
          <input
            ref={this.latitudeInput}
            type="hidden"
            name="lat"
            value={this.props.coords ? this.props.coords.lat : ""}
          />
          <input
            ref={this.longitudeInput}
            type="hidden"
            name="lng"
            value={this.props.coords ? this.props.coords.lng : ""}
          />
          <input type="submit" value="ატვირთვა" />
        </form>
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    address: state.new_item_address.address,
    coords: state.new_item_address.coords,
    uploaded: state.upload.uploaded,
    uploading: state.upload.uploading,
    failure: state.upload.failure,
  }),

  {
    getUploadingRequest,
    clearNewItemAddress,
    startUploadingProcess,
    stopUploadingProcess,
  }
)(StockForm);
