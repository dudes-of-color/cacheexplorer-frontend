import React, { Component } from "react";
import ReactS3Uploader from "react-s3-uploader";
import toast from "./ToastMessage";

const S3_SERVICE_URL = process.env.NEXT_PUBLIC_S3_SERVICE_URL


  // Toast notify message
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);


// Dismiss toast
  const dismiss = React.useCallback(() => {
    toast.dismiss();
  }, []);

class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      progress: 0,
      filesReadyToUpload: false
    };
  }

  // set loading to true, then continue
  // this is a specific func to the react-s3-uploader
  preprocess = (file, callback) => {
    this.setState({ loading: true });
    callback(file);
  };

  onUploadError = e => {
    this.setState({ loading: false, progress: 0 });
    notify("error", "Error uploading image, try again.")
  };

  onUploadFinish = e => {
    // stop loading
    this.setState({ loading: false, progress: 0 });

    // clear input value
    if (this.uploadInput) this.uploadInput.value = null;

    this.props.handleFinish(e.url);

    console.log(S3_SERVICE_URL)
  };

  onUploadProgress = progress => {
    this.setState({
      progress
    });
  };

  renderLoading() {
    const { progress } = this.state;

    return <div>Loading ... {progress}%</div>;
  }

  renderUploadButton() {
    return <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"> 
         Upload an image 
        <ReactS3Uploader
        style={{display: 'none'}}
        signingUrl="/upload/sign"
        signingUrlMethod="GET"
        accept="image/*"
        preprocess={this.preprocess}
        onSignedUrl={this.onSignedUrl}
        onProgress={this.onUploadProgress}
        onError={this.onUploadError}
        onFinish={this.onUploadFinish}
        contentDisposition="auto"
        scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/gi, "")}
        inputRef={cmp => (this.uploadInput = cmp)}
        autoUpload={true}
        multiple
        server={S3_SERVICE_URL}
        signingUrlWithCredentials={ true } 
    />
  </label>
  }



  render() {
    return (
        <div className='flex'>
        {this.state.loading ? (
          this.renderLoading()
        ) : (
          this.renderUploadButton()
        )}
      </div>
      
    );
  }
}

export default Upload;
