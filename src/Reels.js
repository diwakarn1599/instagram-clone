import React from 'react';
import {Link } from 'react-router-dom';
import './Reels.css';
import VideoCard from './VideoCard';

function Reels() {
    return (
        <div className="reels">
            

            <div className="reels_top">
            <Link to="/">
            <img
              className="reels_logo"
              src="https://www.freepnglogos.com/uploads/instagram-logos-png-images-free-download-2.png"
              alt=""
            />
            </Link>
            <h1>Reels</h1>
            </div>

            <div className="reels_videos">
                <VideoCard
                    channel='diwa'
                    avatarSrc="https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg"
                    song='test song by dddddddddiwa'
                    url='http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4'
                    likes={950}
                    shares={30}

                 />
                <VideoCard />
                <VideoCard />
                
                
            </div>
        </div>
    )
}

export default Reels;
