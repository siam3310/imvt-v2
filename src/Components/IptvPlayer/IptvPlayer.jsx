import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';

function VideoPlayer() {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            const player = dashjs.MediaPlayer().create();
            player.initialize(videoRef.current, 'https://bpprod3catchup.akamaized.net/bpk-tv/irdeto_com_Channel_930/output/manifest.mpd?begin=20240103T120000&end=20240131T120000', true);
            player.setProtectionData({
                "org.w3.clearkey": {
                    "clearkeys": {
                        "/Cuk+v9dVfubiFi/3WslNw": "SfSvY6kwt9nvf0ICNatxwQ"
                    }
                }
            });
        }
    }, []);

    return <video ref={videoRef} controls />;
}

export default VideoPlayer;