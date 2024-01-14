import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import dashjs from 'dashjs';
export default function IptvPlayer({ getInstance, ...rest }) {
    const artRef = useRef();
    function playMpd(video, url, art) {
        if (dashjs.supportsMediaSource()) {
            if (art.dash) art.dash.destroy();
            const dash = dashjs.MediaPlayer().create();
            dash.initialize(video, url, art.option.autoplay);
            const protData = {
                "org.w3.clearkey": {
                    "clearkeys": {
                        "fc2ba4faff5d55fb9b8858bfdd6b2537": "451140c2bf1eb22eaf0260df1359ec4f"
                    },
                }
            }
            dash.setProtectionData(protData);
            art.dash = dash;
            art.on('destroy', () => dash.destroy());
        } else {
            art.notice.show = 'Unsupported playback format: mpd';
        }
    }
    // {"keys":[{"kty":"oct","k":"zO4dPyhR9u5l2pUdpW6RXg","kid":"BjQb891jXmylxxGI0CEDcw"}],"type":"temporary"}
    useEffect(() => {
        const option = {
            container: '.artplayer-app',
            url: 'https://bpprod3linear.akamaized.net/bpk-tv/irdeto_com_Channel_930/output/manifest.mpd',
            type: 'mpd',
            customType: {
                mpd: playMpd
            },
        };
        const art = new Artplayer({
            ...option,
            container: artRef.current,
        });

        if (getInstance && typeof getInstance === 'function') {
            getInstance(art);
        }

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, []);

    return <div className='w-full h-full' ref={artRef} {...rest
    } ></div>
}