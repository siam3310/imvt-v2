import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import Hls from 'hls.js';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
export default function IptvPlayer({ playerData, getInstance, ...rest }) {
    const artRef = useRef();
    useEffect(() => {
        const option = {
            container: '.artplayer-app',
            url: `${playerData.url}`,
            poster: `${playerData.inf.logo}`,
            type: 'm3u8',
            customType: {
                m3u8: function playM3u8(video, url, art) {
                    if (Hls.isSupported()) {
                        if (art.hls) art.hls.destroy();
                        const hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                        art.hls = hls;
                        art.on('destroy', () => hls.destroy());
                    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = url;
                    } else {
                        art.notice.show = 'Unsupported playback format: m3u8';
                    }
                }
            },
            hotkey: true,
            autoSize: true,
            setting: true,
            plugins: [
                artplayerPluginHlsQuality({
                    control: false,
                    setting: true,
                    getResolution: (level) => level.height + 'P',
                    title: 'Quality',
                    auto: 'Auto',
                }),
            ],
            volume: 1,
            isLive: true,
            muted: false,
            autoplay: true,
            pip: true,
            autoSize: true,
            autoMini: true,
            screenshot: true,
            setting: true,
            loop: true,
            flip: true,
            playbackRate: true,
            aspectRatio: true,
            fullscreen: true,
            fullscreenWeb: true,
            miniProgressBar: true,
            mutex: true,
            backdrop: true,
            playsInline: true,
            autoPlayback: true,
            airplay: true,
            theme: '#23ade5',
            lock: true,
            lang: navigator.language.toLowerCase(),
            moreVideoAttr: {
                crossOrigin: 'anonymous',
                'webkit-playsinline': true,
                playsInline: true,
            },
            layers: [
                {
                    name: 'Channel',
                    html: `<div class="opacity-0 hover:opacity-100 text-center flex flex-col items-center gap-y-1 p-1">
                             <img class="w-[75px]" src="${playerData.inf.tvgLogo}">
                             <h3 class="whitespace-nowrap overflow-hidden text-ellipsis">${playerData.inf.title}</h3>
                             <h3 class="whitespace-nowrap overflow-hidden text-ellipsis">${playerData.inf.groupTitle}</h3>
                           </div>`,
                    tooltip: 'Current Channel',
                    style: {
                        position: 'absolute',
                        width: "100px",
                        height: "100px",
                        top: '20px',
                        right: '20px',
                        PointerEvents: 'none',
                    },
                },
            ],
            icons: {
                state: `<div class="text-center flex flex-col items-center gap-y-1 p-1">
                <img class="w-[100px]" src="${playerData.inf.tvgLogo}">
                <h3 class="whitespace-nowrap overflow-hidden text-ellipsis">${playerData.inf.title}</h3>
                <h3 class="whitespace-nowrap overflow-hidden text-ellipsis">${playerData.inf.groupTitle}</h3>
              </div>`,
                // loading: ``,
                indicator: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>',
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
    }, [playerData]);

    return <div ref={artRef} {...rest
    } ></div>
}