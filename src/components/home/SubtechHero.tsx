/**
 * Subtech homepage hero — pixel match to subtech.in PHP version.
 *
 * Matches the PHP layout exactly:
 *   - 100vh hero with full YouTube video background (id `oFuWT0fFyhw`)
 *   - Uniform 60% black overlay (.video-overlay)
 *   - Bootstrap-style col-lg-6: text takes left half on desktop, full width on mobile
 *   - .hero-title: 3.5rem white bold, line-height 62px, three lines via <br>
 *   - .hero-subtitle: 1.25rem, line-height 2rem, max-width 800px
 *   - .btn-swipe: 290×60 pill — red filled handle (52×52) on the left, label
 *     "Get Your Solution" centred, hover slides handle to fill button width
 *     while label fades white and arrow translates out.
 */
import Link from "next/link";

const VIDEO_ID = "oFuWT0fFyhw";

export default function SubtechHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black flex items-center">
      {/* Background video — full-bleed, always covers viewport */}
      <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
        <iframe
          title="Subtech corporate background video"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?controls=0&autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&playsinline=1&rel=0&modestbranding=1`}
          allow="autoplay; encrypted-media"
          loading="eager"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "100vw",
            height: "56.25vw", // 16:9
            minHeight: "100vh",
            minWidth: "177.77vh", // 100vh * 16/9
          }}
        />
      </div>

      {/* Uniform 60% black overlay — exact match to PHP `.video-overlay` */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-black/60"
      />

      {/* Hero content */}
      <div className="relative z-[2] w-full max-w-[1320px] mx-auto px-6 sm:px-10 py-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          {/* Title — matches PHP .hero-title (3.5rem desktop / 2.5rem mobile, lh 62px) */}
          <h1
            className="font-bold text-white"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: "1.1",
              marginBottom: "1.25rem",
            }}
          >
            Your Global Partner
            <br className="hidden sm:block" />
            {" "}in Electrical
            <br className="hidden sm:block" />
            {" "}Excellence
          </h1>

          {/* Subtitle — matches PHP .hero-subtitle */}
          <p
            className="text-white/90 mx-auto lg:mx-0"
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
              lineHeight: "2rem",
              maxWidth: "800px",
              marginBottom: "1.875rem",
            }}
          >
            Complete solutions in Smart motor control panel, switchgear, and
            automation, trusted by industries worldwide for a sustainable Earth.
          </p>

          {/* btn-swipe — exact PHP recreation */}
          <div className="inline-flex">
            <Link href="/contact" className="btn-swipe group">
              <span className="sw-handle">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              <span className="sw-label">Get Your Solution</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Self-contained CSS for the swipe button — keeps the styling local
          so it can't conflict with global CSS or be missing on production. */}
      <style jsx>{`
        :global(.btn-swipe) {
          position: relative;
          display: inline-flex;
          align-items: center;
          height: 60px;
          width: 290px;
          background: rgba(233, 49, 50, 0.06);
          border: 1px solid rgba(233, 49, 50, 0.15);
          border-radius: 60px;
          text-decoration: none;
          cursor: pointer;
          overflow: hidden;
        }
        :global(.btn-swipe .sw-handle) {
          position: absolute;
          left: 4px;
          top: 4px;
          width: 52px;
          height: 52px;
          background: #e93132;
          border-radius: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          z-index: 1;
        }
        :global(.btn-swipe .sw-handle svg) {
          width: 20px;
          height: 20px;
          stroke: #fff;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          transition: transform 0.4s ease, opacity 0.3s ease;
          flex-shrink: 0;
        }
        :global(.btn-swipe .sw-label) {
          position: absolute;
          width: 100%;
          text-align: center;
          font-family: "DM Sans", sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
          z-index: 2;
          pointer-events: none;
          transition: color 0.35s ease 0.1s;
        }
        :global(.btn-swipe:hover .sw-handle) {
          width: calc(100% - 8px);
        }
        :global(.btn-swipe:hover .sw-label) {
          color: #fff;
        }
        :global(.btn-swipe:hover .sw-handle svg) {
          opacity: 0;
          transform: translateX(20px);
        }
      `}</style>
    </section>
  );
}
