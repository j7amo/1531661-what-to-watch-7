import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const TOAST_DURATION = 10000;

function ToastMessage({message}) {

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), TOAST_DURATION);
  },[]);

  return (
    <div>
      {showToast && <p>{message}</p>}
    </div>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ToastMessage;
