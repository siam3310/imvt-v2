import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import Hls from 'hls.js';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import './VideoPlayer.css';
export default function VideoPlayer({ media, getInstance, ...rest }) {
    const artRef = useRef();
    let SubtitleObj
    SubtitleObj = media?.subtitles?.map((subtitle) => {
        if (subtitle.lang === media?.subtitles[0]?.lang) {
            return {
                default: true,
                html: `<span className="px-3 block w-40 whitespace-nowrap overflow-hidden text-ellipsis text-start" title="${subtitle.lang}">${subtitle.lang}</span>`,
                url: subtitle.url,
                type: 'vtt',
                encoding: 'utf-8',
                escape: true,
                style: {
                    color: '#ffffff',
                    'font-size': '1em',
                },
            }
        } else {
            return {
                html: `<span className="px-3 block w-40 whitespace-nowrap overflow-hidden text-ellipsis text-start" title="${subtitle.lang}">${subtitle.lang}</span>`,
                url: subtitle.url,
                type: 'vtt',
                encoding: 'utf-8',
                escape: true,
                style: {
                    color: '#ffffff',
                    'font-size': '1em',
                },
            }
        }
    })

    useEffect(() => {
        const option = {
            container: '.artplayer-app',
            url: `${media?.urls[media.urls.length - 1].url}`,
            poster: `${media?.thumbnail}`,
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
                    control: true,
                    setting: true,
                    getResolution: (level) => level.height + 'P',
                    title: 'Quality',
                    auto: 'Auto',
                }),
            ],
            volume: 1,
            isLive: false,
            muted: false,
            autoplay: false,
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
            subtitleOffset: true,
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
            settings: media?.subtitles[0] ? [
                {
                    width: 200,
                    html: 'Subtitle',
                    tooltip: `${media?.subtitles[0]?.lang}`,
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-subtitles"><path d="M7 13h4"/><path d="M15 13h2"/><path d="M7 9h2"/><path d="M13 9h4"/><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>`,
                    selector: [{
                        html: 'Display',
                        tooltip: 'Show',
                        switch: true,
                        onSwitch: function (item) {
                            item.tooltip = item.switch ? 'Hide' : 'Show';
                            art.subtitle.show = !item.switch;
                            return !item.switch;
                        },
                    }, ...SubtitleObj],
                    onSelect: function (item) {
                        art.subtitle.switch(item.url, {
                            // name: item.html,
                        });
                        return item.html;
                    },
                },
            ] : [],
            subtitle: {
                url: `${media?.subtitles[0]?.url}`,
                type: 'vrt',
                style: {
                    color: '#ffffff',
                    fontSize: '1em',
                },
                encoding: 'utf-8',
            },
            icons: {
                // state: 'play Icon',
                // loading: 'loading Icon',
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
    }, []);

    return <div ref={artRef} {...rest
    } ></div>
}