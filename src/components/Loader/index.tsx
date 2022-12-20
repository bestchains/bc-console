/*
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2018 TenxCloud. All Rights Reserved.
 * ----
 * loader
 *
 * @author Vsion
 * @date 2022-12-19
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Loader = ({ spinning, fullScreen, text }) => {
  return (
    <div
      className={classNames('loader', {
        hidden: !spinning,
        fullScreen: fullScreen,
      })}
    >
      <div className="wrapper">
        <div className="inner" />
        <div className="text">{text || 'LOADING'}</div>
      </div>
    </div>
  );
};

export default Loader;
