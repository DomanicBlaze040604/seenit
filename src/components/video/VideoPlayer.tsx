"use client";

import * as React from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react";
import { cn, formatDuration } from "@/lib/utils";

interface VideoPlayerProps {
    src: string;
    poster?: string;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    onComplete?: () => void;
    className?: string;
}

export function VideoPlayer({
    src,
    poster,
    onTimeUpdate,
    onComplete,
    className,
}: VideoPlayerProps) {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const progressRef = React.useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const [showControls, setShowControls] = React.useState(true);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const controlsTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current?.parentElement?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;
            setCurrentTime(current);
            setProgress((current / total) * 100);
            onTimeUpdate?.(current, total);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        onComplete?.();
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressRef.current && videoRef.current) {
            const rect = progressRef.current.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * duration;
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
        controlsTimeout.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    React.useEffect(() => {
        return () => {
            if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
        };
    }, []);

    return (
        <div
            className={cn(
                "relative aspect-video bg-black rounded-xl overflow-hidden group",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                playsInline
            />

            {/* Center Play Button */}
            {!isPlaying && (
                <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-20 h-20 rounded-full bg-primary-600/90 flex items-center justify-center transition-transform hover:scale-110">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                </button>
            )}

            {/* Controls Overlay */}
            <div
                className={cn(
                    "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
                    showControls ? "opacity-100" : "opacity-0"
                )}
            >
                {/* Progress Bar */}
                <div
                    ref={progressRef}
                    onClick={handleProgressClick}
                    className="h-1 bg-white/30 rounded-full cursor-pointer mb-4 group-hover:h-1.5 transition-all"
                >
                    <div
                        className="h-full bg-primary-500 rounded-full relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={togglePlay}
                            className="text-white hover:text-primary-400 transition-colors"
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6" />
                            ) : (
                                <Play className="w-6 h-6" />
                            )}
                        </button>

                        <button
                            onClick={toggleMute}
                            className="text-white hover:text-primary-400 transition-colors"
                        >
                            {isMuted ? (
                                <VolumeX className="w-5 h-5" />
                            ) : (
                                <Volume2 className="w-5 h-5" />
                            )}
                        </button>

                        <span className="text-white text-sm font-medium">
                            {formatDuration(Math.floor(currentTime))} / {formatDuration(Math.floor(duration))}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-primary-400 transition-colors"
                        >
                            <Maximize className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
