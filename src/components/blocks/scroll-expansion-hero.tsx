/* eslint-disable @next/next/no-img-element */
"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  onExpansionComplete?: () => void;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  onExpansionComplete,
}: ScrollExpandMediaProps) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mediaContainerRef = useRef<HTMLDivElement | null>(null);
  const titleLeftRef = useRef<HTMLHeadingElement | null>(null);
  const titleRightRef = useRef<HTMLHeadingElement | null>(null);
  const dateLabelRef = useRef<HTMLParagraphElement | null>(null);
  const scrollLabelRef = useRef<HTMLParagraphElement | null>(null);
  const bgOverlayRef = useRef<HTMLDivElement | null>(null);

  // Use refs for scroll state to avoid re-renders and listener re-registration
  const rawProgressRef = useRef<number>(0);
  const mediaFullyExpandedRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number>(0);
  const isMobileRef = useRef<boolean>(false);
  const rafIdRef = useRef<number>(0);
  const onExpansionCompleteRef = useRef(onExpansionComplete);
  onExpansionCompleteRef.current = onExpansionComplete;

  // Smoothly interpolated progress for rendering
  const displayProgressRef = useRef<number>(0);

  // Apply visual updates directly to DOM (no React re-render needed)
  const applyVisuals = useCallback(() => {
    const target = rawProgressRef.current;
    const current = displayProgressRef.current;

    // Lerp for silky smooth interpolation
    const lerped = current + (target - current) * 0.15;
    // Snap to target when very close to avoid endless tiny updates
    const progress = Math.abs(target - lerped) < 0.001 ? target : lerped;
    displayProgressRef.current = progress;

    // Apply smoothstep easing for visual output
    const eased = progress * progress * (3 - 2 * progress);

    const mobile = isMobileRef.current;
    const mediaWidth = 300 + eased * (mobile ? 650 : 1250);
    const mediaHeight = 400 + eased * (mobile ? 200 : 400);
    const textTranslateX = eased * (mobile ? 120 : 100);

    if (mediaContainerRef.current) {
      mediaContainerRef.current.style.width = `${mediaWidth}px`;
      mediaContainerRef.current.style.height = `${mediaHeight}px`;
    }
    if (titleLeftRef.current) {
      titleLeftRef.current.style.transform = `translateX(-${textTranslateX}vw)`;
    }
    if (titleRightRef.current) {
      titleRightRef.current.style.transform = `translateX(${textTranslateX}vw)`;
    }
    if (dateLabelRef.current) {
      dateLabelRef.current.style.transform = `translateX(-${textTranslateX}vw)`;
    }
    if (scrollLabelRef.current) {
      scrollLabelRef.current.style.transform = `translateX(${textTranslateX}vw)`;
    }
    if (bgOverlayRef.current) {
      bgOverlayRef.current.style.opacity = `${1 - eased}`;
    }

    // Keep animating if we haven't reached the target yet
    if (Math.abs(target - progress) > 0.0005) {
      rafIdRef.current = requestAnimationFrame(applyVisuals);
    }
  }, []);

  const scheduleUpdate = useCallback(() => {
    cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(applyVisuals);
  }, [applyVisuals]);

  // Update raw progress and kick off smooth animation
  const updateProgress = useCallback((newRawProgress: number) => {
    const clamped = Math.min(Math.max(newRawProgress, 0), 1);
    rawProgressRef.current = clamped;

    if (clamped >= 1) {
      mediaFullyExpandedRef.current = true;
      setShowContent(true);
      if (onExpansionCompleteRef.current) {
        setTimeout(() => {
          onExpansionCompleteRef.current?.();
        }, 1000);
      }
    } else if (clamped < 0.75) {
      setShowContent(false);
    }

    scheduleUpdate();
  }, [scheduleUpdate]);

  // Event listeners registered once, using refs for state
  useEffect(() => {
    const handleWheel = (e: globalThis.WheelEvent) => {
      if (mediaFullyExpandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        mediaFullyExpandedRef.current = false;
        e.preventDefault();
      } else if (!mediaFullyExpandedRef.current) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0005;
        updateProgress(rawProgressRef.current + scrollDelta);
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartYRef.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;

      if (mediaFullyExpandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        mediaFullyExpandedRef.current = false;
        e.preventDefault();
      } else if (!mediaFullyExpandedRef.current) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.02 : 0.015;
        const scrollDelta = deltaY * scrollFactor;
        updateProgress(rawProgressRef.current + scrollDelta);
        touchStartYRef.current = touchY;
      }
    };

    const handleTouchEnd = (): void => {
      touchStartYRef.current = 0;
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpandedRef.current) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateProgress]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      const mobile = window.innerWidth < 768;
      isMobileRef.current = mobile;
      setIsMobileState(mobile);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div
      ref={sectionRef}
      className="overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {/* Background Image */}
          <div
            ref={bgOverlayRef}
            className="absolute inset-0 z-0 h-full will-change-[opacity]"
          >
            <img
              src={bgImageSrc}
              alt="Industrial factory background"
              className="w-screen h-screen"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-[#0D0D0D]/70" />
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              {/* Expanding Media Container */}
              <div
                ref={mediaContainerRef}
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl will-change-[width,height]"
                style={{
                  width: "300px",
                  height: "400px",
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.3)",
                }}
              >
                {mediaType === "video" ? (
                  mediaSrc.includes("youtube.com") ? (
                    (() => {
                      const videoId = mediaSrc.includes("embed")
                        ? mediaSrc.split("embed/")[1]?.split("?")[0]
                        : mediaSrc.split("v=")[1]?.split("&")[0];
                      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${videoId}&vq=hd1080&hd=1&quality=hd1080`;
                      return (
                        <div className="relative w-full h-full pointer-events-none overflow-hidden rounded-xl">
                          <iframe
                            width="100%"
                            height="100%"
                            src={embedUrl}
                            className="absolute inset-0 w-full h-full rounded-xl"
                            style={{ border: "none" }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Subtech industrial automation video"
                          />
                        </div>
                      );
                    })()
                  ) : (
                    <div className="relative w-full h-full z-20">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover rounded-xl"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                    </div>
                  )
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={mediaSrc}
                      alt={title || "Media content"}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                )}

                {/* Date & Scroll Text */}
                <div className="flex flex-col items-center text-center relative z-10 mt-4">
                  {date && (
                    <p
                      ref={dateLabelRef}
                      className="text-2xl text-[#CC0000] font-sans will-change-transform"
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      ref={scrollLabelRef}
                      className="text-[#CC0000] font-medium text-center font-sans will-change-transform"
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* Title Text (split into two halves) */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <h1
                  ref={titleLeftRef}
                  className="text-4xl md:text-5xl lg:text-[72px] font-bold text-white font-sans leading-[1.1] tracking-[-2px] will-change-transform"
                >
                  {firstWord}
                </h1>
                <h1
                  ref={titleRightRef}
                  className="text-4xl md:text-5xl lg:text-[72px] font-bold text-center text-white font-sans leading-[1.1] tracking-[-2px] will-change-transform"
                >
                  {restOfTitle}
                </h1>
              </div>
            </div>

            {/* Content After Expansion */}
            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
