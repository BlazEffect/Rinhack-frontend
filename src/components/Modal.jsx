import { useEffect, useRef } from "react";

export default function Modal({ text, title, open, handleClose }) {
  const modalRef = useRef(null);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const classNames = `${
    open ? "" : "hidden"
  } modal-wrapper backdrop-blur-lg flex px-8 py-8 z-10 justify-center items-center blured w-full h-full fixed top-4 left-0 right-0 bottom-4`;

  return (
    <div ref={modalRef} className={classNames}>
      <div
        tabIndex="-1"
        onBlur={handleClose}
        className="modal max-h-screen p-4 mx-8 w-full relative rounded-[15px] bg-white border-[#70B839] border-2 min-h-[300px] h-fit"
      >
        <div className="text-center">
          <span className="!text-black text-[24px] uppercase">{title}</span>
          <div
            className="absolute cursor-pointer right-4 top-2 text-black text-[24px]"
            onClick={handleClose}
          >
            X
          </div>
        </div>
        <div className="break-words text-[22px] text-black font-[300]">
          {text}
        </div>
      </div>
    </div>
  );
}
