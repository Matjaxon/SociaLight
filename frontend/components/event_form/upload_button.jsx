import React from 'react';

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this._upload = this._upload.bind(this);
  }
  _upload(event) {
    event.preventDefault();
    const that = this;
    window.cloudinary.openUploadWidget(window.cloudinary_options, (error, results) => {
      if(!error) {
        that.props.postImage(results[0]);
      }
    });
  }

  render() {
    let addText = (this.props.status === 'no-image') ? "" : "new ";
    let buttonType = (this.props.status === 'no-image') ? "" : "form-button";
    return (
      <div className={`upload-button ${this.props.status} ${buttonType}`}
        onClick={this._upload}>{`Upload ${addText}Image`}
      </div>
    );
  }
}

export default UploadButton;
