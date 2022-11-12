import Modal from "react-modal";
import React from "react";
import PropTypes from "prop-types";
import imageIcon from "../assets/image.png";
import viewIcon from "../assets/view.png";
import numberFiveIcon from "../assets/number-five.png";

const RulesModal = ({ openRulesModal, setOpenRulesModal }) => {
  return (
    <Modal
      className="w-90 md:w-1/4 min-w-96 mx-auto border-2 dark:border-primary border-gray-300/50 rounded bg-slate-200 dark:bg-primary text-primary dark:text-secondary p-5 text-xl mt-56"
      isOpen={openRulesModal}
      onRequestClose={() => setOpenRulesModal(false)}
      ariaHideApp={false}>
      <div className="flex mb-2">
        <h3 className="text-2xl w-11/12">How to Play ?</h3>
        <button onClick={() => setOpenRulesModal(false)}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div className="w-full">
        <p className="bg-blue-300/50 dark:bg-blue-300/80 border-blue-300 rounded flex p-3 mb-3">
          <span className="mr-3">
            <img className="w-12 h-auto mt-1.5" src={imageIcon} alt="close" />
          </span>
          <span>Use the image provided to guess the name of the movie.</span>
        </p>
        <p className="bg-blue-300/50 dark:bg-blue-300/80 border-blue-300 rounded flex p-3 mb-3">
          <span className="mr-3">
            <img className="w-14 h-auto mt-1.5" src={viewIcon} alt="close" />
          </span>
          <span>If you get a guess wrong a new image from the same movie is revealed.</span>
        </p>
        <p className="bg-blue-300/50 dark:bg-blue-300/80 border-blue-300 rounded flex p-3">
          <span className="mr-3">
            <img className="w-10 h-auto mt-1.5" src={numberFiveIcon} alt="close" />
          </span>
          <span>You have five chances to guess the movie</span>
        </p>
      </div>
    </Modal>
  );
};

RulesModal.propTypes = {
  openRulesModal: PropTypes.bool,
  setOpenRulesModal: PropTypes.func
};

export default RulesModal;
