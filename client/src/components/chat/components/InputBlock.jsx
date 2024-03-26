import React from "react";
import styles from './InputBlock.module.scss'

const InputBlock = () => {
  const handleSubmit = () => {};

  return (
    <div className="input-block">
      <form onSubmit={handleSubmit}>
        <input type="text" className="input-message"/>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default InputBlock;
