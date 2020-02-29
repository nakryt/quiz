import React, { FunctionComponent } from 'react'
import classes from './Preloader.module.css'

type Props = {};

const Preloader: FunctionComponent<Props> = (props) => {

  return (
      <div className={classes.PreloaderWrap}>
          <div className={classes.Preloader}>
              <div/>
              <div/>
          </div>
      </div>
  )
};

export default Preloader;
