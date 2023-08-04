import logo from '../../assets/logo/BrainFlix-logo.svg';
import searchIcon from '../../assets/icons/search.svg';
import uploadIcon from '../../assets/icons/upload.svg';
import user from '../../assets/images/Mohan-muruge.jpg';
import './Header.scss';

const Header = () => {
  return (
    <div className="container">
      <div className="nav">
        <a href="">
          <img src={logo} className="nav__logo" />
        </a>
        <div className="nav__right">
          <div className="nav__right--searchWrapper">
            <img src={searchIcon} className="nav__right--searchWrapper-icon" />
            <input
              icon="search"
              placeholder="Search..."
              className="nav__right--searchWrapper-input"
            />
          </div>
          <button className="nav__right--uploadBtn">
            <img src={uploadIcon} className="nav__right--uploadBtn-icon" />
            UPLOAD
          </button>
          <img src={user} className="nav__right--userImg" />
        </div>
      </div>
    </div>
  );
};
export default Header;
