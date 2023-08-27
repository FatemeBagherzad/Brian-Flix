import Header from '../../components/Header/Header';
import bikeingThumbnail from '../../assets/images/Upload-video-preview.jpg';
import publishIcon from '../../assets/icons/publish.svg';
import './Upload.scss';
const Upload = () => {
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
        <button className="uploadSection__uploadBtn" id="cancel">
          CANCEL
        </button>
        <button className="uploadSection__uploadBtn">
          <img
            src={publishIcon}
            className="uploadSection__uploadBtn-icon"
            alt="Upload Icon"
          />
          PUBLISH
        </button>
      </div>
    </>
  );
};
export default Upload;
