import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import bikeingThumbnail from '../../assets/images/Upload-video-preview.jpg';
import publishIcon from '../../assets/icons/publish.svg';
import './Upload.scss';
import { useState } from 'react';

const Upload = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const closeUploadDialog = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header />

      <hr className="uploadSection__devider-long " />
      <h1 className="uploadSection__header container">Upload Video</h1>
      <hr className="uploadSection__devider container" />

      <div className="uploadSection container">
        <div className="uploadSection__thumbnail">
          <span className="uploadSection__thumbnail--txt">VIDEO THUMBNAIL</span>
          <img
            src={bikeingThumbnail}
            className="uploadSection__thumbnail--img"
            alt="a person biking"
          />
        </div>

        <form className="uploadSection__form">
          <label className="uploadSection__form--label">TITLE YOUR VIDEO</label>
          <input
            className="uploadSection__form--input uploadSection__form--title"
            name="uploadTitle"
            placeholder="Add a title to your video"
          />
          <label className="uploadSection__form--label">
            ADD A VIDEO DESCRIPTION
          </label>
          <textarea
            className="uploadSection__form--input uploadSection__form--textarea"
            name="videoDescription"
            placeholder="Add a description to your video"
          ></textarea>
        </form>
      </div>

      <hr className="uploadSection__devider container" />

      <div className="uploadSection__btnWrapper container">
        <div
          className="uploadSection__btnWrapper--videoUploaded"
          id={!isOpen ? 'closeUploadBox' : null}
        >
          <span>
            Your video has been <strong>uploaded</strong>.
          </span>

          <button
            className="uploadSection__btnWrapper--videoUploaded-btn btn"
            onClick={() => {
              navigate('/');
            }}
          >
            go to home page!
          </button>
          <button
            className="uploadSection__btnWrapper--videoUploaded-btn btn"
            onClick={closeUploadDialog}
          >
            stay here!
          </button>
        </div>

        <button className="btn" id="cancel">
          CANCEL
        </button>
        <button
          className="btn"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img src={publishIcon} className="btn-icon" alt="Upload Icon" />
          PUBLISH
        </button>
      </div>

      <form
        action="'http://localhost:8888/videos'"
        method="post"
        enctype="multipart/form-data"
      >
        <label for="file">File</label>
        <input id="file" name="file" type="file" />
        <button>Upload</button>
      </form>
    </>
  );
};
export default Upload;
