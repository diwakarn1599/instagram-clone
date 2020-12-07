import React from 'react';
import './VideoHeader.css';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function VideoHeader() {
    return (
        <div className="videoHeader">
            <ArrowBackIosIcon />
            <h3>Reels</h3>
            <CameraAltIcon />
        </div>
    )
}

export default VideoHeader;
