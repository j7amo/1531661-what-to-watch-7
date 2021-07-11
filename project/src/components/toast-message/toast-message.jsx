import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { ToastMessages } from '../../const.js';

const TOAST_DURATION = 10000;
const ERROR_CODE = '400';

function ToastMessage({message}) {

  if (message.includes(ERROR_CODE)) {
    message = ToastMessages.REVIEW_ADD_ERROR;
  }
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
