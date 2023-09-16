import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import bikeingThumbnail from '../../assets/images/Upload-video-preview.jpg';
import publishIcon from '../../assets/icons/publish.svg';
import './Upload.scss';
import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';

const Upload = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc('');
    }
  };

  const videoSubmitHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
    const formData = new FormData();
    formData.append('title', event.target.uploadTitle.value);
    formData.append('channel', 'user');
    formData.append('description', event.target.videoDescription.value);
    formData.append('file', file);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    axios
      .post('http://localhost:8888/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));

    event.target.uploadTitle.value = '';
    event.target.videoDescription.value = '';
    event.target.file.value = '';
    setImageSrc('');
  };

  const closeUploadDialog = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header />

      <hr className="uploadSection__devider-long " />
      <h1 className="uploadSection__header container">Upload Video</h1>
      <hr className="uploadSection__devider container" />

      <form
        // action="'http://localhost:8888/videos'"
        // method="post"
        encType="multipart/form-data"
        className="container"
        onSubmit={videoSubmitHandler}
      >
        <section className="uploadSection">
          <div className="uploadSection__thumbnail">
            <span className="uploadSection__thumbnail--txt">
              VIDEO THUMBNAIL
            </span>
            <img
              src={imageSrc ? imageSrc : bikeingThumbnail}
              className="uploadSection__thumbnail--img"
              alt="a person biking"
            />
          </div>

          <div className="uploadSection__form">
            <label className="uploadSection__form--label">
              TITLE YOUR VIDEO
            </label>
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
          </div>
        </section>

        <div>
          <input
            id="imageInput"
            name="file"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="uploadSection__uploadFile"
            onChange={handleFileChange}
          />
        </div>

        <div className="uploadGuide">
          {/* <span className="uploadGuide__title">
            Our tips for easily uploading your videos
          </span> */}
          <div className="uploadGuide__tips">
            <div className="uploadGuide__tips-tip">
              You can upload your cover photo that is .JPEG, .JPG, or .PNG.
            </div>
            <div className="uploadGuide__tips-tip">
              You can upload JPEG photos over 20 KB and PNG photos over 40KB and
              either type under 10MB.
            </div>
            <div className="uploadGuide__tips-tip">
              You can upload your video that is .MP4, .AVI, or .MOV.
            </div>
          </div>
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
          <button className="btn" type="submit">
            <img src={publishIcon} className="btn-icon" alt="Upload Icon" />
            PUBLISH
          </button>
        </div>
      </form>
    </>
  );
};
export default Upload;
