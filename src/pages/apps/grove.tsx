import Head from 'next/head';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import styles from './Grove.module.css';

// Dynamically import heavy components if needed
// const VideoPlayer = dynamic(() => import('./VideoPlayer'), { ssr: false });

export default function Grove() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
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
  
  const handleFullScreen = useCallback(() => { 
    if (playerContainerRef.current?.requestFullscreen) { 
      playerContainerRef.current.requestFullscreen().catch(console.error); 
    } 
  }, []);
  
  const handleScreenshot = useCallback(() => { 
    if (videoRef.current) { 
      const canvas = document.createElement('canvas'); 
      canvas.width = videoRef.current.videoWidth; 
      canvas.height = videoRef.current.videoHeight; 
      const ctx = canvas.getContext('2d'); 
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height); 
        const a = document.createElement('a'); 
        a.href = canvas.toDataURL('image/png'); 
        a.download = 'screenshot.png'; 
        a.click(); 
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
      const container = playerContainerRef.current?.querySelector(`.${styles.video_container}`) as HTMLDivElement;
      
      if (container) {
        // アスペクト比に基づいてコンテナを調整
        if (aspectRatio < 1) {
          // 縦向き動画の場合
          container.style.paddingBottom = '0';
          container.style.height = 'auto';
          container.style.flex = '1';
        } else if (aspectRatio > 2) {
          // 超横長動画の場合
          container.style.paddingBottom = '25%';
        } else {
          // 通常の横向き動画
          container.style.paddingBottom = '56.25%';
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
      <div className={styles.player_container}>
        <div className={styles.video_container}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'white' }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: isPortrait ? 'flex-start' : 'center', 
        minHeight: '100vh', 
        backgroundColor: '#0a0a0a',
        padding: isPortrait ? '10px' : '20px'
      }}>
        <div className={styles.player_container} ref={playerContainerRef}>
          <div className={styles.video_container}>
              <video 
                id="videoPlayer" 
                ref={videoRef} 
                src={videoSrc} 
                onTimeUpdate={handleTimeUpdate} 
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlayPause}
                preload="metadata"
                playsInline
              />
              <div className={styles.overlay_buttons}>
                  <button onClick={handleScreenshot} title="Take Screenshot" type="button">
                    📷 Screenshot
                  </button>
              </div>
          </div>
          <div className={styles.controls_container}>
              <div className={styles.controls}>
                  <div className={styles.controls_left}>
                      <button onClick={togglePlayPause} title={isPlaying ? 'Pause' : 'Play'} type="button">
                          {isPlaying ? '⏸️' : '▶️'}
                      </button>
                      <button onClick={handleFrameBack} title="Previous Frame" type="button">⏮️</button>
                      <button onClick={handleFrameForward} title="Next Frame" type="button">⏭️</button>
                  </div>
                  
                  <div className={styles.controls_center}>
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
                      />
                      <div className={styles.progress_container} onClick={handleProgressClick} title="Seek">
                          <div id="progressBar" style={progressBarStyle}></div>
                      </div>
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
                      />
                  </div>
                  
                  <div className={styles.controls_right}>
                      <button onClick={handleFullScreen} title="Fullscreen" type="button">⛶</button>
                      <button 
                          onClick={handleOpenFile} 
                          className={styles.open_file_btn} 
                          title="Open Video File (MP4, WebM, OGG, AVI, MOV)"
                          type="button"
                      >
                          📁 Open File
                      </button>
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