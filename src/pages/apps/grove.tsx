import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { css } from '../../../styled-system/css';
import HMeta from '../../components/headermeta';

// Dynamically import heavy components if needed
// const VideoPlayer = dynamic(() => import('./VideoPlayer'), { ssr: false });

export default function Grove() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const FRAME_RATE = 30;

  // Check if device is in portrait mode
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth && window.innerWidth <= 768);
    };

    checkOrientation();

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Ensure client-side only operations
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
    };
  }, [videoSrc]);

  useEffect(() => {
    if (!isMounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMounted, togglePlayPause]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current?.duration) {
      const progressValue = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressValue);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file.name, file.type);

    // ネイティブでサポートされているビデオ形式をチェック
    const supportedFormats = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];

    if (supportedFormats.some(format => file.type.includes(format.split('/')[1])) || file.type.startsWith('video/')) {
      console.log('Using native video playback');
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    } else {
      alert('サポートされていないファイル形式です。MP4, WebM, OGG, AVI, MOV形式のビデオファイルを選択してください。');
    }
  }, []);

  useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [videoSrc]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) videoRef.current.volume = parseFloat(e.target.value);
  }, []);

  const handleSpeedChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) videoRef.current.playbackRate = parseFloat(e.target.value);
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current?.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const progress = clickX / rect.width;
      videoRef.current.currentTime = progress * videoRef.current.duration;
    }
  }, []);

  const handleFrameBack = useCallback(() => { 
    if (videoRef.current) videoRef.current.currentTime -= 1 / FRAME_RATE; 
  }, []);

  const handleFrameForward = useCallback(() => {
    if (videoRef.current) videoRef.current.currentTime += 1 / FRAME_RATE;
  }, []);

  const handleSkipBack5s = useCallback(() => {
    if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
  }, []);

  const handleSkipForward5s = useCallback(() => {
    if (videoRef.current && videoRef.current.duration)
      videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
  }, []);

  const handleFullScreen = useCallback(() => {
    if (playerContainerRef.current?.requestFullscreen) {
      playerContainerRef.current.requestFullscreen().catch(console.error);
    }
  }, []);
  const handleScreenshot = useCallback(() => {
    if (videoRef.current) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const date = new Date();
          const y = date.getFullYear().toString();
          const mo = (date.getMonth() + 1).toString().padStart(2, '0');
          const d = date.getDate().toString().padStart(2, '0');
          const h = date.getHours().toString().padStart(2, '0');
          const m = date.getMinutes().toString().padStart(2, '0');
          const s = date.getSeconds().toString().padStart(2, '0');
          
          const dataUrl = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = `screenshot-${y}${mo}${d}-${h}${m}${s}-groveplayer.png`;
          a.click();
        }
      } catch (error) {
        console.error('Screenshot failed:', error);
        alert('スクリーンショットの取得に失敗しました。動画がクロスオリジンの可能性があります。\nScreenshot failed. The video may be from a cross-origin source.');
      }
    }
  }, []);

  const handleOpenFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // 動画のメタデータが読み込まれた時の処理
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const aspectRatio = video.videoWidth / video.videoHeight;
      const container = videoContainerRef.current;
      if (container) {
        // アスペクト比に基づいてコンテナを調整
        if (aspectRatio < 1) {
          // 縦向き動画の場合 - 大きく表示
          container.style.paddingBottom = '0';
          container.style.height = 'calc(90vh - 180px)';
          container.style.minHeight = '600px';
          container.style.maxHeight = 'calc(90vh - 180px)';
        } else if (aspectRatio > 2) {
          // 超横長動画の場合
          container.style.paddingBottom = '25%';
          container.style.height = '0';
          container.style.minHeight = '400px';
        } else {
          // 通常の横向き動画
          container.style.paddingBottom = '56.25%';
          container.style.height = '0';
          container.style.minHeight = '400px';
        }
      }

      console.log(`Video dimensions: ${video.videoWidth}x${video.videoHeight}, aspect ratio: ${aspectRatio.toFixed(2)}`);
    }
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoSrc, handleLoadedMetadata]);

  // Cleanup video URL on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (videoSrc && videoSrc.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  // Memoized progress bar style
  const progressBarStyle = useMemo(() => ({
    width: `${progress}%`
  }), [progress]);

  if (!isMounted) {
    return (
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingY: '8',
        })}
      >
        <HMeta pageTitle="Grove Player" pageDescription="A lightweight video player with advanced features like frame-by-frame navigation and screenshot capture." />
        <div
          className={css({
            width: '90%',
            maxWidth: '900px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            borderRadius: '16px',
            overflow: 'hidden',
            minHeight: '200px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          })}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'white' }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={css({
          minHeight: '100vh',
          background: 'linear-gradient(120deg, #232526 0%, #414345 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            paddingY: '8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <div
            className={css({
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#000',
              width: '90%',
              maxWidth: '900px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
            })}
            ref={playerContainerRef}
          >
            <div
              className={css({
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#111',
                borderRadius: '16px 16px 0 0',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                padding: 0,
              })}
            >
              <div
                ref={videoContainerRef}
                className={css({
                  width: '100%',
                  height: 0,
                  paddingBottom: '56.25%',
                  position: 'relative',
                  flexShrink: 0,
                  background: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '400px',
                  maxHeight: 'calc(90vh - 180px)',
                  '@media (max-width: 768px)': {
                    minHeight: '300px',
                    maxHeight: 'calc(90vh - 200px)',
                  },
                })}
              >
                <video
                  id="videoPlayer"
                  ref={videoRef}
                  src={videoSrc}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onClick={togglePlayPause}
                  preload="metadata"
                  playsInline
                  className={css({
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    display: 'block',
                    cursor: 'pointer',
                    objectFit: 'contain',
                  })}
                />
                <div
                  className={css({
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    zIndex: 2,
                    display: 'flex',
                    gap: '10px',
                  })}
                >
                  <button
                    onClick={handleScreenshot}
                    title="Take Screenshot"
                    type="button"
                    className={css({
                      background: 'rgba(0, 0, 0, 0.7)',
                      border: 'none',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(4px)',
                      _hover: {
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-2px)',
                      },
                    })}
                  >
                    📷 Screenshot
                  </button>
                </div>
              </div>
            </div>
            <div
              className={css({
                position: 'relative',
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.9))',
                opacity: 1,
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)',
                flexShrink: 0,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              })}
            >
              
                  <div
                    className={css({
                      flexGrow: 1,
                      cursor: 'pointer',
                      background: 'rgba(255, 255, 255, 0.2)',
                      height: '20px',
                      marginX: '4',
                      borderRadius: '8px',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'height 0.3s ease',
                      _hover: {
                        height: '28px',
                      },
                    })}
                    onClick={handleProgressClick}
                    title="Seek"
                  >
                    <div
                      className={css({
                        background: 'linear-gradient(90deg, #ff4e50 0%, #f9d423 50%, #1fd655 100%)',
                        height: '100%',
                        width: `${progress}%`,
                        borderRadius: '8px',
                        transition: 'width 0.1s ease',
                        position: 'relative',
                        zIndex: 1,
                      })}
                      style={progressBarStyle}
                    ></div>
                  </div>
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  gap: '15px',
                  flexWrap: 'wrap',
                  minHeight: '60px',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  '@media (max-width: 768px)': {
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '8px',
                    minHeight: '120px',
                  },
                })}
              >
                <div className={css({ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  '@media (max-width: 768px)': {
                    gap: '6px',
                    width: '100%',
                    justifyContent: 'center',
                  },
                })}>
                  <button onClick={togglePlayPause} title={isPlaying ? 'Pause' : 'Play'} type="button"
                    className={css({
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      padding: '10px 16px',
                      borderRadius: '25px',
                      transition: 'all 0.3s ease',
                      fontWeight: 500,
                      backdropFilter: 'blur(4px)',
                      minWidth: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      _hover: {
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      },
                      '@media (max-width: 768px)': {
                        padding: '8px 12px',
                        fontSize: '12px',
                        minWidth: '36px',
                        height: '36px',
                      },
                    })}
                  >
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>
                  <button onClick={handleSkipBack5s} title="Skip Back 5s" type="button"
                    className={css({
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px',
                      padding: '8px 12px',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      fontWeight: 500,
                      backdropFilter: 'blur(4px)',
                      height: '36px',
                      _hover: {
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                      '@media (max-width: 768px)': {
                        padding: '6px 8px',
                        fontSize: '10px',
                        height: '32px',
                      },
                    })}
                  >⏪ 5s</button>
                  <button onClick={handleSkipForward5s} title="Skip Forward 5s" type="button"
                    className={css({
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px',
                      padding: '8px 12px',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      fontWeight: 500,
                      backdropFilter: 'blur(4px)',
                      height: '36px',
                      _hover: {
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                      '@media (max-width: 768px)': {
                        padding: '6px 8px',
                        fontSize: '10px',
                        height: '32px',
                      },
                    })}
                  >5s ⏩</button>
                </div>
                
                <div className={css({ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  flex: 1, 
                  justifyContent: 'center',
                  '@media (max-width: 768px)': {
                    width: '100%',
                    flexDirection: 'column',
                    gap: '6px',
                  },
                })}>
                  <span style={{ fontSize: '12px', minWidth: '50px' }}>Volume</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    defaultValue="1"
                    onChange={handleVolumeChange}
                    title="Volume"
                    aria-label="Volume control"
                    className={css({
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '3px',
                      outline: 'none',
                      marginX: '2',
                      cursor: 'pointer',
                      width: '100px',
                      '@media (max-width: 768px)': {
                        width: '90%',
                      },
                    })}
                  />
                  <span style={{ fontSize: '12px', minWidth: '40px' }}>Speed</span>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    defaultValue="1"
                    onChange={handleSpeedChange}
                    title="Playback Speed"
                    aria-label="Playback speed control"
                    className={css({
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '3px',
                      outline: 'none',
                      marginX: '2',
                      cursor: 'pointer',
                      width: '100px',
                      '@media (max-width: 768px)': {
                        width: '90%',
                      },
                    })}
                  />
                </div>
                <div className={css({ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  '@media (max-width: 768px)': {
                    width: '100%',
                    justifyContent: 'center',
                  },
                })}>
                  <button onClick={handleFullScreen} title="Fullscreen" type="button"
                    className={css({
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      padding: '10px 16px',
                      borderRadius: '25px',
                      transition: 'all 0.3s ease',
                      fontWeight: 500,
                      backdropFilter: 'blur(4px)',
                      height: '44px',
                      _hover: {
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                      '@media (max-width: 768px)': {
                        padding: '8px 12px',
                        fontSize: '12px',
                        height: '36px',
                      },
                    })}
                  >⛶</button>
                  <button
                    onClick={handleOpenFile}
                    title="Open Video File (MP4, WebM, OGG, AVI, MOV)"
                    type="button"
                    className={css({
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      fontWeight: 600,
                      color: 'white',
                      padding: '10px 16px',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      _hover: {
                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      },
                      '@media (max-width: 768px)': {
                        padding: '8px 12px',
                        fontSize: '12px',
                      },
                    })}
                  >
                    📁 Open File
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/mp4,video/webm,video/ogg,video/avi,video/mov,video/*"
        style={{ display: 'none' }}
        aria-label="Video file input"
      />
    </>
  );
}