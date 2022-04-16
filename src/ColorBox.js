import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";

import "./ColorBox.css";

const ColorBox = (props) => {
  const [copied, setCopied] = useState(false);
  const { name, background, id, showMore } = props;
  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const isDark = chroma(background).luminance() <= 0.08;
  const isLight = chroma(background).luminance() >= 0.6;

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className="ColorBox">
        <div
          style={{ background }}
          className={`copy-overlay ${copied && "show"}`}
        />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>copied!</h1>
          <p className={isLight ? "dark-text" : ""}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={isDark ? "light-text" : ""}>{name}</span>
          </div>
          <button className={`copy-button ${isLight && "dark-text"}`}>
            Copy
          </button>
        </div>
        {showMore && (
          <Link to={id} onClick={(e) => e.stopPropagation()}>
            <span className={`see-more ${isLight && "dark-text"}`}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
