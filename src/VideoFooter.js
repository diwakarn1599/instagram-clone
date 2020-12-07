import React from 'react';
import './VideoFooter.css';
import {Button,Avatar} from "@material-ui/core";

function VideoFooter({channel,song,likes,shares,avatarSrc}) {
    return (
        <div className="videoFooter">
            <div className="videoFooter_text" >
            <Avatar src={avatarSrc} />
            <h4>{channel} •<Button>Follow</Button></h4>
            </div>
        </div>
    )
}

export default VideoFooter;
