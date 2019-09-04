const DEFAULT_HEIGHT = 20;
import React, { useState, useEffect, useRef } from 'react';

function Textarea({ parentCallback }) {
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [textValue, setTextValue] = useState("");
  const ghost = useRef()

  useEffect(() => {
    setFilledTextareaHeight()
  }, [])

  function setFilledTextareaHeight() {
    const element = ghost;
    setHeight({ height: element.clientHeight })
  }

  function setValue(event) {
    const { value } = event.target;
    setTextValue(value);
  }

  function getExpandableField() {
    const isOneLine = height <= DEFAULT_HEIGHT;

    return (
      <div>
        <textarea
          className="textarea"
          name="textarea"
          id="textarea"
          autoFocus={true}
          defaultValue={textValue}
          style={{
            height,
            resize: isOneLine ? "none" : null
          }}
          onChange={setValue}
          onKeyUp={setFilledTextareaHeight}
          placeholder="Use in source, how it worked in a game or theorization, specifics of emotions"
        />
      </div>
    );
  }

  function getGhostField() {
    return (
      <div
        className="textarea textarea--ghost"
        ref={ghost}
        aria-hidden="true"
      >
        {textValue}
      </div>
    );
  }
  return (
    <div className="container">
      {getExpandableField()}
      {getGhostField()}
    </div>
  );

}

export default Textarea; 