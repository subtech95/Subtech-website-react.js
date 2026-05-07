"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ============================================================
   Careers @ Subtech — full client page
   Ported from jobs.php
   ============================================================ */

type Job = {
  eid: string;
  title: string;
  dept: string;
  type: string;
  loc: string;
  posted: string;
  desc: string;
};

/* Sample jobs — replace by fetching from your CRM API later.
   The form below already POSTs to https://subtech.in/Controller/Master/. */
const SAMPLE_JOBS: Job[] = [
  {
    eid: "j1",
    title: "Sales Executive – Smart Motor Panels",
    dept: "Sales & Business Development",
    type: "Full Time",
    loc: "Greater Noida, UP",
    posted: "10 Apr 2026",
    desc: "<p>Drive revenue across Subtech's smart motor control panel range. Manage existing dealer relationships, identify new institutional clients, and own the full sales cycle.</p><ul><li>3+ years of B2B field sales in electrical, automation or related industry</li><li>Strong relationships with electrical contractors, dealers or government EPC firms</li><li>Two-wheeler/four-wheeler license preferred</li></ul>",
  },
  {
    eid: "j2",
    title: "Embedded Firmware Engineer",
    dept: "R&D & Engineering",
    type: "Full Time",
    loc: "Greater Noida, UP",
    posted: "8 Apr 2026",
    desc: "<p>Develop firmware for Subtech's MPU and PMC platforms. Work on motor protection logic, sensor interfacing, RF communication and IoT integration.</p><ul><li>Strong embedded C / C++ on STM32, ESP32 or PIC</li><li>Experience with UART, SPI, I2C, ADC, timers and interrupts</li><li>Bonus: RF protocol design, FreeRTOS, low-power optimisation</li></ul>",
  },
  {
    eid: "j3",
    title: "Panel Wiring Technician",
    dept: "Production & Assembly",
    type: "Full Time",
    loc: "Greater Noida, UP",
    posted: "5 Apr 2026",
    desc: "<p>Hands-on assembly, wiring and quality testing of motor control panels in our Greater Noida facility. ITI/Diploma in electrical preferred.</p><ul><li>2+ years of panel wiring experience</li><li>Ability to read electrical drawings and schematics</li><li>Familiarity with contactors, relays, MCBs, MCCBs and busbars</li></ul>",
  },
  {
    eid: "j4",
    title: "Service Engineer",
    dept: "Service & Technical Support",
    type: "Full Time",
    loc: "Pan-India (Travel Required)",
    posted: "3 Apr 2026",
    desc: "<p>Field commissioning and after-sales support across India. Handle on-site troubleshooting, customer training, and warranty work for installed Subtech panels.</p><ul><li>Diploma/Degree in electrical engineering</li><li>Willingness to travel 60–70% of the time</li><li>Strong communication skills in Hindi and English</li></ul>",
  },
  {
    eid: "j5",
    title: "Digital Marketing Executive",
    dept: "Marketing & Digital",
    type: "Full Time",
    loc: "Greater Noida, UP",
    posted: "1 Apr 2026",
    desc: "<p>Run Subtech's digital presence — manage the website, social media, ad campaigns, content calendar and dealer marketing collateral.</p><ul><li>2+ years in digital marketing, ideally in B2B / industrial</li><li>Hands-on with Meta Ads, Google Ads, basic SEO and analytics</li><li>Comfortable creating product content in English and Hindi</li></ul>",
  },
];

const DEPARTMENTS = [
  ["Sales & Business Development", "Build and manage dealer networks, handle institutional clients, and grow Subtech's pan-India footprint."],
  ["Production & Assembly", "Assemble, wire, and quality-test control panels at our Greater Noida manufacturing facility."],
  ["R&D & Engineering", "Design circuits, develop microcontroller-based protection systems, and innovate on PMC and MPU technologies."],
  ["Accounts & Finance", "Manage day-to-day accounting, GST compliance, costing, and financial reporting."],
  ["Marketing & Digital", "Create product content, manage the website, run campaigns, and build brand presence online and offline."],
  ["Service & Technical Support", "Provide field commissioning, troubleshooting, and after-sales support across all installations."],
  ["Operations & Warehouse", "Handle procurement, inventory, dispatch logistics, and supply chain coordination."],
];

const BENEFITS = [
  ["🏥", "Health Insurance", "Mediclaim coverage for all employees."],
  ["📚", "Learning & Growth", "On-the-job training, exposure to real projects, and cross-functional learning."],
  ["🎉", "Festival Bonuses", "Annual festive benefits for all employees."],
  ["🗺️", "Pan-India Opportunities", "Field and sales roles available across multiple states."],
  ["🤝", "Respectful Work Culture", "A professional, harassment-free environment where every employee is heard."],
  ["⏰", "Structured Work Hours", "Fixed shift timings with no unpaid overtime. Work-life balance respected."],
];

const WHY_JOIN = [
  ["⚡", "Work on Real Technology", "We design proprietary technologies like MPU (Motor Protection Unit) and PMC (Pre-Magnetic Contactor) in-house. If you want to work on R&D that actually ships to the field, this is the place."],
  ["🏛️", "Clients That Matter", "Our panels are installed at NTPC plants, Delhi Metro stations, Indian Air Force bases, and Jal Nigam water supply networks. Your work has real impact on national infrastructure."],
  ["📈", "Growth With a Growing Company", "We are scaling from a strong regional presence to a pan-India brand, expanding our dealer network, product range, and digital capabilities. Early joiners grow fast."],
  ["🔧", "Manufacturing Meets Innovation", "We combine traditional electrical engineering with modern approaches like IoT connectivity, microcontroller-based protection, and remote monitoring through Subtech Command Center."],
];

const CLIENTS = [
  "Indian Railways", "Delhi Metro", "NTPC", "GAIL", "Indian Air Force", "Honda",
  "Reliance", "UP Jal Nigam", "Delhi Jal Board", "Air India", "NALCO", "BHEL",
];

const LIFE_PHOTOS = [
  ["/images/brands/image1.jpeg", "Recognising our people", "Where Talent Meets Recognition"],
  ["/images/brands/image2.jpeg", "Team meetings that matter", "One Vision. One Force. Unstoppable."],
  ["/images/brands/image3.jpeg", "Employee recognition", "Because Hard Work Never Goes Unseen"],
  ["/images/brands/image4.jpeg", "Team celebration", "Built Different. Win Together."],
];

const FORM_ENDPOINT = "https://subtech.in/Controller/Master/";

type View = "list" | "detail" | "apply";

/**
 * Convert a row from `/api/public/jobs` into the local Job shape used by the
 * existing UI (eid/dept/type/loc/posted/desc). Stays robust to missing fields.
 */
type ApiJobRow = {
  id: number | string;
  title: string;
  department?: string | null;
  type?: string | null;
  location?: string | null;
  posted_at?: string | null;
  created_at?: string | null;
  description?: string | null;
  requirements?: string | null;
};

function apiToJob(r: ApiJobRow): Job {
  const dateStr = r.posted_at ?? r.created_at ?? "";
  const dt = dateStr ? new Date(dateStr) : null;
  const posted =
    dt && !isNaN(dt.getTime())
      ? dt.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";
  let desc = (r.description ?? "").trim();
  if (r.requirements) {
    desc += `\n\n<h4>Requirements</h4>\n${r.requirements}`;
  }
  return {
    eid: String(r.id),
    title: r.title ?? "",
    dept: r.department ?? "",
    type: r.type ?? "Full Time",
    loc: r.location ?? "",
    posted,
    desc,
  };
}

const CMS_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_BASE_URL?.replace(/\/+$/, "") ||
  "https://crm.subtech.in";

export default function CareersClient() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [view, setView] = useState<View>("list");
  const [activeCat, setActiveCat] = useState("All");
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);

  /* Live jobs from CRM. Falls back to SAMPLE_JOBS if the API is unreachable
     (offline dev, CRM down, etc.) so the page still renders something useful. */
  const [jobs, setJobs] = useState<Job[]>(SAMPLE_JOBS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${CMS_BASE_URL}/api/public/jobs`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as { data?: ApiJobRow[] };
        const list = (json?.data ?? []).map(apiToJob);
        if (!cancelled && list.length) setJobs(list);
      } catch {
        // keep SAMPLE_JOBS as fallback — no toast, no UI flash
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /* Form state — apply form */
  const [applyName, setApplyName] = useState("");
  const [applyMobile, setApplyMobile] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applyExp, setApplyExp] = useState("");
  const [applyTitle, setApplyTitle] = useState("");
  const [applyLinkedIn, setApplyLinkedIn] = useState("");
  const [applyMessage, setApplyMessage] = useState("");
  const [applyResume, setApplyResume] = useState<File | null>(null);
  const [applyConsent, setApplyConsent] = useState(false);
  const [applyBusy, setApplyBusy] = useState(false);

  /* Form state — speculative form */
  const [specName, setSpecName] = useState("");
  const [specMobile, setSpecMobile] = useState("");
  const [specEmail, setSpecEmail] = useState("");
  const [specExp, setSpecExp] = useState("");
  const [specOrg, setSpecOrg] = useState("");
  const [specDept, setSpecDept] = useState("");
  const [specResume, setSpecResume] = useState<File | null>(null);
  const [specConsent, setSpecConsent] = useState(false);
  const [specBusy, setSpecBusy] = useState(false);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    jobs.forEach((j) => j.dept && set.add(j.dept));
    return Array.from(set);
  }, [jobs]);

  const filteredJobs = useMemo(
    () => (activeCat === "All" ? jobs : jobs.filter((j) => j.dept === activeCat)),
    [activeCat, jobs]
  );

  /* Reveal */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    root.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [view]);

  const goDetail = (job: Job) => {
    setCurrentJob(job);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goApply = (job?: Job) => {
    const target = job ?? currentJob;
    if (!target) return;
    setCurrentJob(target);
    /* reset apply form */
    setApplyName("");
    setApplyMobile("");
    setApplyEmail("");
    setApplyExp("");
    setApplyTitle("");
    setApplyLinkedIn("");
    setApplyMessage("");
    setApplyResume(null);
    setApplyConsent(false);
    setView("apply");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goList = () => {
    setView("list");
    setOpenJobId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyConsent || !applyResume || !currentJob) return;
    setApplyBusy(true);
    const fd = new FormData();
    fd.append("method", "JobApply");
    fd.append("data_id", currentJob.eid);
    fd.append("name", applyName);
    fd.append("mobile", applyMobile);
    fd.append("email", applyEmail);
    fd.append("message", applyExp);
    fd.append("subject", applyTitle);
    fd.append("c_type", applyLinkedIn);
    fd.append("address", applyMessage);
    fd.append("resume", applyResume);
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: fd });
      const text = await res.text();
      try {
        const j = JSON.parse(text);
        if (j.type === "success") {
          alert("Application submitted successfully!");
          goList();
        } else {
          alert(j.message || "Something went wrong.");
        }
      } catch {
        alert("Application submitted!");
        goList();
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setApplyBusy(false);
    }
  };

  const submitSpec = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!specConsent || !specResume) return;
    setSpecBusy(true);
    const fd = new FormData();
    fd.append("method", "JobApply");
    fd.append("name", specName);
    fd.append("mobile", specMobile);
    fd.append("email", specEmail);
    fd.append("message", specExp);
    fd.append("subject", specOrg);
    fd.append("job", specDept);
    fd.append("resume", specResume);
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: fd });
      const text = await res.text();
      try {
        const j = JSON.parse(text);
        if (j.type === "success") {
          alert("Submitted! We'll reach out when a matching role opens.");
          setSpecName(""); setSpecMobile(""); setSpecEmail(""); setSpecExp("");
          setSpecOrg(""); setSpecDept(""); setSpecResume(null); setSpecConsent(false);
        } else {
          alert(j.message || "Something went wrong.");
        }
      } catch {
        alert("Submitted successfully!");
        setSpecName(""); setSpecMobile(""); setSpecEmail(""); setSpecExp("");
        setSpecOrg(""); setSpecDept(""); setSpecResume(null); setSpecConsent(false);
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSpecBusy(false);
    }
  };

  return (
    <div className="cr-wrap" ref={rootRef}>
      {/* Bootstrap Icons via CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
      />

      {view === "list" && (
        <div id="page-list">
          {/* HERO */}
          <section className="cr-hero">
            <div className="cr-container">
              <div className="cr-hero-label">Careers at Subtech</div>
              <h1>
                Build What
                <br />
                Powers India.
              </h1>
              <p>
                From smart motor control panels to IoT-enabled automation systems, join the team
                behind the technology that keeps water flowing, industries running, and
                infrastructure protected.
              </p>
              <div className="cr-hero-buttons">
                <a href="#positions" className="btn btn-dark">
                  View All Jobs ↓
                </a>
                <a href="#apply" className="btn btn-outline">
                  Submit Your Resume
                </a>
              </div>
            </div>
          </section>

          {/* STATS */}
          <div className="cr-stats-bar">
            <div className="cr-container">
              <div className="cr-stats-grid">
                {[
                  ["25", "+", "Years in business"],
                  ["100", "+", "Clients served"],
                  ["150", "+", "Dealers nationwide"],
                  ["170", "+", "Product models"],
                ].map(([n, s, l]) => (
                  <div className="cr-stat-item fade-up" key={l}>
                    <div className="cr-stat-number">
                      {n}
                      <span>{s}</span>
                    </div>
                    <div className="cr-stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WHO WE ARE */}
          <section className="cr-section cr-who-we-are">
            <div className="cr-container">
              <div className="cr-section-label">About Us</div>
              <div className="cr-section-title">Who We Are</div>
              <div className="cr-content-grid">
                <div className="cr-text-block">
                  <p>
                    Subtech is the flagship brand of S S Power System, a 25+ year-old Indian
                    manufacturing company specialising in smart electrical automation. We design
                    and build motor control panels, pump automation systems, generator control
                    panels, and IoT-based monitoring solutions from our facility in Greater Noida.
                  </p>
                  <p>
                    Our clients range from Indian Railways and Delhi Metro to NTPC, GAIL, the
                    Indian Air Force, and 100+ companies across government, industrial, and
                    commercial sectors. When you join Subtech, you work on products that protect
                    real infrastructure and serve real communities.
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--gray-700)",
                      marginBottom: 16,
                    }}
                  >
                    Trusted by leading organisations
                  </div>
                  <div className="cr-client-logos">
                    {CLIENTS.map((c) => (
                      <span className="cr-client-tag" key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WHY JOIN */}
          <section className="cr-section cr-why-join">
            <div className="cr-container">
              <div className="cr-section-label">Why Subtech</div>
              <div className="cr-section-title">Why Join Us?</div>
              <div className="cr-section-desc">
                We are not just another panel manufacturer. Here is what makes working at Subtech
                different.
              </div>
              <div className="cr-cards-grid">
                {WHY_JOIN.map(([ic, t, d]) => (
                  <div className="cr-card fade-up" key={t}>
                    <div className="cr-card-icon">{ic}</div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LIFE */}
          <section className="cr-section cr-life-section">
            <div className="cr-container">
              <div className="cr-section-label">Culture</div>
              <div className="cr-section-title">Life at Subtech</div>
              <p className="cr-intro-text">
                We&apos;re an SME with big ambitions. Our team is small enough that your ideas get
                heard, and the company is growing fast enough that there&apos;s always something new
                to build. We value practical skills, ownership, and honesty over fancy degrees and
                corporate jargon.
              </p>
              <div className="cr-photo-grid">
                {LIFE_PHOTOS.map(([src, alt, cap]) => (
                  <div className="cr-photo-card" key={cap}>
                    <img src={src} alt={alt} />
                    <div className="caption">{cap}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DEPARTMENTS */}
          <section className="cr-section">
            <div className="cr-container">
              <div className="cr-section-label">Teams</div>
              <div className="cr-section-title">Build. Sell. Grow. Here.</div>
              <div className="cr-dept-list">
                {DEPARTMENTS.map(([n, d]) => (
                  <div className="cr-dept-item fade-up" key={n}>
                    <div className="cr-dept-name">{n}</div>
                    <div className="cr-dept-desc">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BENEFITS */}
          <section className="cr-section cr-benefits-section">
            <div className="cr-container">
              <div className="cr-section-label">Your Growth Kit</div>
              <div className="cr-section-title">What We Offer</div>
              <div className="cr-benefits-grid">
                {BENEFITS.map(([ic, t, d]) => (
                  <div className="cr-benefit-item fade-up" key={t}>
                    <div className="cr-benefit-icon">{ic}</div>
                    <div>
                      <h4>{t}</h4>
                      <p>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* OPEN POSITIONS */}
          <section className="cr-section" id="positions">
            <div className="cr-container">
              <div className="cr-positions-header">
                <div>
                  <div className="cr-section-title">Open Positions</div>
                  <div className="cr-section-desc">
                    Discover where you fit in at Subtech and make an impact in the world of
                    electrical automation.
                  </div>
                </div>
                <div className="cr-positions-count">
                  Showing all openings <span>{filteredJobs.length}</span>
                </div>
              </div>

              <div className="cr-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`cr-tab${activeCat === cat ? " active" : ""}`}
                    onClick={() => {
                      setActiveCat(cat);
                      setOpenJobId(null);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="cr-job-list">
                {filteredJobs.length === 0 ? (
                  <div className="cr-no-jobs">
                    <p>
                      No current openings at this time. Submit your resume below and we&apos;ll
                      reach out when a matching role opens up.
                    </p>
                  </div>
                ) : (
                  filteredJobs.map((job, i) => {
                    const isOpen = openJobId === job.eid;
                    return (
                      <div
                        className={`cr-job-card${isOpen ? " open" : ""}`}
                        key={job.eid}
                      >
                        <div
                          className="cr-job-header"
                          onClick={() => setOpenJobId(isOpen ? null : job.eid)}
                        >
                          <div className="cr-job-index">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <div className="cr-job-header-info">
                            <h3>{job.title}</h3>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 8,
                              }}
                            >
                              <span className="cr-job-type">{job.type}</span>
                              <div className="cr-job-meta">
                                {job.loc && (
                                  <span>
                                    <i className="bi bi-geo-alt" /> {job.loc}
                                  </span>
                                )}
                                {job.dept && (
                                  <span>
                                    <i className="bi bi-briefcase" /> {job.dept}
                                  </span>
                                )}
                                {job.posted && (
                                  <span>
                                    <i className="bi bi-calendar3" /> {job.posted}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            className="cr-job-toggle"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenJobId(isOpen ? null : job.eid);
                            }}
                          >
                            +
                          </button>
                          <div className="cr-job-header-btns">
                            <button
                              className="btn btn-red btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                goDetail(job);
                              }}
                            >
                              Apply Now
                            </button>
                            <button
                              className="btn btn-outline btn-sm"
                              style={{ borderColor: "#333", color: "#666" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                goDetail(job);
                              }}
                            >
                              Details
                            </button>
                          </div>
                        </div>

                        <div className="cr-job-body">
                          <div className="cr-job-body-inner">
                            <div className="cr-job-desc">
                              <div className="cr-job-desc-label">Quick Preview</div>
                              <div dangerouslySetInnerHTML={{ __html: job.desc }} />
                              <div className="cr-job-tags">
                                <span className="cr-job-tag">Health Insurance</span>
                                <span className="cr-job-tag">Performance Bonus</span>
                                <span className="cr-job-tag">Festival Bonus</span>
                              </div>
                            </div>
                            <div className="cr-job-actions">
                              <button
                                className="cr-job-cta-primary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goApply(job);
                                }}
                              >
                                Apply Now <span aria-hidden>→</span>
                              </button>
                              <button
                                className="cr-job-cta-secondary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goDetail(job);
                                }}
                              >
                                View Full Job Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          {/* SPECULATIVE FORM */}
          <section className="cr-section cr-open-application" id="apply">
            <div className="cr-container">
              <div className="cr-section-label">Get in Touch</div>
              <div className="cr-section-title">Don&apos;t See a Role That Fits?</div>
              <p className="cr-section-desc">
                We&apos;re always looking for talented people. Fill in the form below and we&apos;ll
                get back to you when a suitable position opens up.
              </p>

              <form className="cr-application-form" onSubmit={submitSpec}>
                <div className="cr-form-row">
                  <div className="cr-form-group">
                    <label>
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      value={specName}
                      onChange={(e) => setSpecName(e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="cr-form-group">
                    <label>
                      Mobile Number <span className="req">*</span>
                    </label>
                    <input
                      type="tel"
                      value={specMobile}
                      onChange={(e) => setSpecMobile(e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      required
                    />
                  </div>
                </div>
                <div className="cr-form-row">
                  <div className="cr-form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={specEmail}
                      onChange={(e) => setSpecEmail(e.target.value)}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className="cr-form-group">
                    <label>Total Experience</label>
                    <input
                      type="text"
                      value={specExp}
                      onChange={(e) => setSpecExp(e.target.value)}
                      placeholder="e.g. 3 years"
                    />
                  </div>
                </div>
                <div className="cr-form-row">
                  <div className="cr-form-group">
                    <label>Current Organisation</label>
                    <input
                      type="text"
                      value={specOrg}
                      onChange={(e) => setSpecOrg(e.target.value)}
                      placeholder="e.g. ABC Electricals"
                    />
                  </div>
                  <div className="cr-form-group">
                    <label>Function / Department</label>
                    <select
                      value={specDept}
                      onChange={(e) => setSpecDept(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option>Sales</option>
                      <option>Service & Support</option>
                      <option>Engineering / R&D</option>
                      <option>Manufacturing</option>
                      <option>Marketing</option>
                      <option>Accounts / Finance</option>
                      <option>IT / Software</option>
                      <option>HR / Admin</option>
                      <option>Others</option>
                    </select>
                  </div>
                </div>
                <div className="cr-form-group">
                  <label>
                    Upload CV <span className="req">*</span>{" "}
                    <span style={{ fontWeight: 400, color: "var(--gray-400)", fontSize: 12 }}>
                      (PDF, max 10 MB)
                    </span>
                  </label>
                  <label
                    className="cr-upload-box"
                    htmlFor="spec-resume"
                    style={{ cursor: "pointer", display: "block" }}
                  >
                    <input
                      type="file"
                      id="spec-resume"
                      style={{ display: "none" }}
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setSpecResume(e.target.files?.[0] ?? null)}
                      required
                    />
                    <i className="bi bi-cloud-arrow-up" />
                    <span className={specResume ? "chosen" : ""}>
                      {specResume ? specResume.name : "Click to upload your resume"}
                    </span>
                  </label>
                </div>
                <div className="cr-checkbox">
                  <input
                    type="checkbox"
                    id="spec-check"
                    checked={specConsent}
                    onChange={(e) => setSpecConsent(e.target.checked)}
                    required
                  />
                  <label htmlFor="spec-check">
                    By submitting, I agree to Subtech&apos;s terms and conditions and consent to my
                    data being processed for recruitment purposes.
                  </label>
                </div>
                <div className="cr-form-submit">
                  <button
                    type="submit"
                    className="btn btn-red"
                    disabled={!specConsent || specBusy}
                  >
                    {specBusy ? "Submitting…" : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* CLOSING QUOTE */}
          <section className="cr-closing-quote">
            <div className="cr-container">
              <div className="cr-red-line" />
              <blockquote>
                &ldquo;We build products that work — quietly, consistently, without interruption. If
                that level of craftsmanship drives you, we&apos;d love to have you with us.&rdquo;
              </blockquote>
              <p className="attribution">
                That&apos;s the standard we build to. If that sounds like the kind of work you want
                to do, we&apos;d like to hear from you.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* DETAIL VIEW */}
      {view === "detail" && currentJob && (
        <div id="page-detail">
          <div className="cr-detail-wrap">
            <span className="cr-back" onClick={goList}>
              <i className="bi bi-arrow-left" /> Back to all jobs
            </span>
            <div className="cr-detail-head">
              <h2>{currentJob.title}</h2>
            </div>
            <div className="cr-detail-meta">
              <div className="cr-dm-item">
                <span className="dm-label">Department</span>
                <span className="dm-value">{currentJob.dept || "—"}</span>
              </div>
              <div className="cr-dm-item">
                <span className="dm-label">Type</span>
                <span className="dm-value">{currentJob.type || "Full Time"}</span>
              </div>
              <div className="cr-dm-item">
                <span className="dm-label">Location</span>
                <span className="dm-value">{currentJob.loc || "—"}</span>
              </div>
              <div className="cr-dm-item">
                <span className="dm-label">Posted</span>
                <span className="dm-value">{currentJob.posted || "—"}</span>
              </div>
            </div>
            <div className="cr-detail-section">
              <h4>About Subtech</h4>
              <p>
                Subtech (S S Power System) is a leading manufacturer of electrical automation and
                motor control panels with 25+ years of experience, 500+ clients, and operations
                across 28+ states. Our products include DOL, Star-Delta, VFD, ATS, AMF, and MCC
                panels for industrial, commercial, and government sectors.
              </p>
            </div>
            <div className="cr-detail-section">
              <h4>Job Description</h4>
              <div dangerouslySetInnerHTML={{ __html: currentJob.desc }} />
            </div>
            <div className="cr-detail-section">
              <h4>Why Join Subtech?</h4>
              <ul>
                <li>Work with a trusted, growing brand in electrical automation.</li>
                <li>Supportive, performance-driven culture with clear career growth.</li>
                <li>ISO 9001, ISO 45001, and ISO 50001 certified workplace.</li>
                <li>Competitive salary, health insurance, and performance bonuses.</li>
              </ul>
            </div>
            <div className="cr-detail-actions">
              <button className="btn btn-red" onClick={() => goApply()}>
                Apply for This Position →
              </button>
              <button className="btn btn-outline" onClick={goList}>
                All Openings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPLY VIEW */}
      {view === "apply" && currentJob && (
        <div id="page-apply">
          <div className="cr-apply-wrap">
            <span
              className="cr-back"
              onClick={() => setView("detail")}
            >
              <i className="bi bi-arrow-left" /> Back to job detail
            </span>
            <h2>Apply: {currentJob.title}</h2>
            <p>Fill in your details below to apply for this position.</p>
            <form onSubmit={submitApply}>
              <div className="cr-form-group">
                <label>Applying For</label>
                <input
                  type="text"
                  readOnly
                  value={currentJob.title}
                  style={{ background: "var(--gray-50)", fontWeight: 600 }}
                />
              </div>
              <div className="cr-form-row">
                <div className="cr-form-group">
                  <label>
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    value={applyName}
                    onChange={(e) => setApplyName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="cr-form-group">
                  <label>
                    Mobile Number <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    value={applyMobile}
                    onChange={(e) => setApplyMobile(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    required
                  />
                </div>
              </div>
              <div className="cr-form-row">
                <div className="cr-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={applyEmail}
                    onChange={(e) => setApplyEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </div>
                <div className="cr-form-group">
                  <label>
                    Total Experience <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    value={applyExp}
                    onChange={(e) => setApplyExp(e.target.value)}
                    placeholder="e.g. 3 years"
                    required
                  />
                </div>
              </div>
              <div className="cr-form-row">
                <div className="cr-form-group">
                  <label>Previous Job Title</label>
                  <input
                    type="text"
                    value={applyTitle}
                    onChange={(e) => setApplyTitle(e.target.value)}
                    placeholder="e.g. Panel Wiring Technician"
                  />
                </div>
                <div className="cr-form-group">
                  <label>LinkedIn Profile</label>
                  <input
                    type="url"
                    value={applyLinkedIn}
                    onChange={(e) => setApplyLinkedIn(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
              <div className="cr-form-group">
                <label>Message</label>
                <textarea
                  value={applyMessage}
                  onChange={(e) => setApplyMessage(e.target.value)}
                  rows={4}
                  placeholder="Tell us why you'd be a great fit..."
                />
              </div>
              <div className="cr-form-group">
                <label>
                  Upload Resume <span className="req">*</span>
                </label>
                <label
                  className="cr-upload-box"
                  htmlFor="resume-file"
                  style={{ cursor: "pointer", display: "block" }}
                >
                  <input
                    type="file"
                    id="resume-file"
                    style={{ display: "none" }}
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setApplyResume(e.target.files?.[0] ?? null)}
                    required
                  />
                  <i className="bi bi-cloud-arrow-up" />
                  <span className={applyResume ? "chosen" : ""}>
                    {applyResume ? applyResume.name : "Click to upload PDF, DOC or DOCX"}
                  </span>
                </label>
              </div>
              <div className="cr-checkbox">
                <input
                  type="checkbox"
                  id="confirm-check"
                  checked={applyConsent}
                  onChange={(e) => setApplyConsent(e.target.checked)}
                  required
                />
                <label htmlFor="confirm-check">
                  I confirm that all information provided is accurate and I consent to Subtech
                  processing my data for recruitment purposes.
                </label>
              </div>
              <div className="cr-form-submit">
                <button
                  type="submit"
                  className="btn btn-red"
                  style={{ width: "100%" }}
                  disabled={!applyConsent || applyBusy}
                >
                  {applyBusy ? "Submitting…" : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Override globals.css headings */}
      <style jsx global>{`
        .cr-wrap h1,
        .cr-wrap h2,
        .cr-wrap h3,
        .cr-wrap h4,
        .cr-wrap p {
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          color: inherit;
          margin: 0;
        }
      `}</style>

      <style jsx>{`
        .cr-wrap {
          --red: #c8102e;
          --red-dark: #a00d24;
          --red-light: #fef2f2;
          --red-glow: rgba(200, 16, 46, 0.1);
          --dark: #111111;
          --gray-900: #1a1a1a;
          --gray-700: #404040;
          --gray-500: #6b6b6b;
          --gray-400: #999;
          --gray-300: #d4d4d4;
          --gray-200: #e0e0e0;
          --gray-100: #f5f5f5;
          --gray-50: #f8f8f8;
          --white: #ffffff;

          background: var(--white);
          color: var(--gray-900);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        .cr-wrap :global(*),
        .cr-wrap :global(*::before),
        .cr-wrap :global(*::after) {
          box-sizing: border-box;
        }
        .cr-wrap :global(.bi) {
          font-family: "bootstrap-icons" !important;
        }

        .cr-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .cr-section {
          padding: 80px 0;
        }

        /* HERO */
        .cr-hero {
          padding: 120px 0 80px;
          border-bottom: 1px solid var(--gray-100);
        }
        .cr-hero-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 20px;
        }
        .cr-hero h1 {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          color: var(--dark);
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -1px;
        }
        .cr-hero p {
          font-size: 18px;
          color: var(--gray-500);
          max-width: 600px;
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .cr-hero-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Buttons */
        .cr-wrap :global(.btn) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          border: none;
        }
        .cr-wrap :global(.btn-dark) {
          background: var(--dark);
          color: var(--white);
        }
        .cr-wrap :global(.btn-dark:hover) {
          background: #333;
        }
        .cr-wrap :global(.btn-red) {
          background: var(--red);
          color: var(--white);
        }
        .cr-wrap :global(.btn-red:hover) {
          background: var(--red-dark);
          transform: translateY(-1px);
          box-shadow: 0 3px 12px var(--red-glow);
        }
        .cr-wrap :global(.btn-red:disabled) {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .cr-wrap :global(.btn-outline) {
          background: transparent;
          color: var(--dark);
          border: 1.5px solid var(--gray-300);
        }
        .cr-wrap :global(.btn-outline:hover) {
          border-color: var(--dark);
        }
        .cr-wrap :global(.btn-sm) {
          padding: 10px 22px;
          font-size: 14px;
        }

        /* STATS */
        .cr-stats-bar {
          padding: 48px 0;
          border-bottom: 1px solid var(--gray-100);
        }
        .cr-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        .cr-stat-item {
          text-align: center;
        }
        .cr-stat-number {
          font-size: 32px;
          font-weight: 700;
          color: var(--dark);
          line-height: 1;
          margin-bottom: 6px;
        }
        .cr-stat-number :global(span) {
          color: var(--red);
        }
        .cr-stat-label {
          font-size: 14px;
          color: var(--gray-500);
        }

        /* SECTION */
        .cr-section-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 12px;
        }
        .cr-section-title {
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }
        .cr-section-desc {
          font-size: 17px;
          color: var(--gray-500);
          max-width: 640px;
          line-height: 1.7;
        }

        /* WHO WE ARE */
        .cr-who-we-are .cr-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          margin-top: 40px;
          align-items: start;
        }
        .cr-who-we-are .cr-text-block :global(p) {
          font-size: 16px;
          color: var(--gray-700);
          line-height: 1.8;
          margin-bottom: 16px;
        }
        .cr-who-we-are .cr-text-block :global(p:last-child) {
          margin-bottom: 0;
        }
        .cr-client-logos {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .cr-client-tag {
          padding: 8px 16px;
          background: var(--gray-100);
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          color: var(--gray-700);
        }

        /* WHY JOIN */
        .cr-why-join {
          background: var(--gray-100);
        }
        .cr-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 40px;
        }
        .cr-card {
          background: var(--white);
          padding: 32px;
          border-radius: 8px;
          border: 1px solid transparent;
          transition: border-color 0.2s ease;
        }
        .cr-card:hover {
          border-color: var(--gray-300);
        }
        .cr-card-icon {
          width: 40px;
          height: 40px;
          background: var(--red-light);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 18px;
        }
        .cr-card :global(h3) {
          font-size: 18px;
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 10px;
        }
        .cr-card :global(p) {
          font-size: 15px;
          color: var(--gray-500);
          line-height: 1.7;
        }

        /* LIFE */
        .cr-life-section .cr-intro-text {
          font-size: 17px;
          color: var(--gray-700);
          max-width: 700px;
          line-height: 1.8;
          margin-top: 20px;
          margin-bottom: 40px;
        }
        .cr-photo-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .cr-photo-card {
          background: var(--gray-100);
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: flex-end;
          height: 260px;
          cursor: pointer;
        }
        .cr-photo-card :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          transition: transform 0.5s ease;
        }
        .cr-photo-card:hover :global(img) {
          transform: scale(1.05);
        }
        .cr-photo-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.75) 100%);
          z-index: 1;
          transition: background 0.4s ease;
        }
        .cr-photo-card:hover::before {
          background: rgba(0, 0, 0, 0.6);
        }
        .cr-photo-card .caption {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 20px 16px 16px;
          color: white;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.3px;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
          transition: transform 0.3s ease;
        }
        .cr-photo-card:hover .caption {
          transform: translateY(-4px);
        }

        /* DEPARTMENTS */
        .cr-dept-list {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
        }
        .cr-dept-item {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
          padding: 24px 0;
          border-bottom: 1px solid var(--gray-100);
          align-items: start;
        }
        .cr-dept-item:first-child {
          border-top: 1px solid var(--gray-100);
        }
        .cr-dept-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--dark);
        }
        .cr-dept-desc {
          font-size: 15px;
          color: var(--gray-500);
          line-height: 1.7;
        }

        /* BENEFITS */
        .cr-benefits-section {
          background: var(--gray-100);
        }
        .cr-benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 40px;
        }
        .cr-benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 24px;
          background: var(--white);
          border-radius: 8px;
        }
        .cr-benefit-icon {
          width: 36px;
          height: 36px;
          min-width: 36px;
          background: var(--red-light);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .cr-benefit-item :global(h4) {
          font-size: 15px;
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 4px;
        }
        .cr-benefit-item :global(p) {
          font-size: 14px;
          color: var(--gray-500);
          line-height: 1.5;
        }

        /* POSITIONS */
        .cr-positions-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
        }
        .cr-positions-count {
          font-size: 14px;
          color: var(--gray-500);
        }
        .cr-positions-count :global(span) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--red);
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
          margin-left: 6px;
        }
        .cr-tabs {
          display: flex;
          margin-bottom: 32px;
          flex-wrap: wrap;
          border-bottom: 2px solid var(--gray-200);
        }
        .cr-tab {
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 600;
          color: var(--gray-500);
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
          font-family: inherit;
        }
        .cr-tab:hover {
          color: var(--dark);
        }
        .cr-tab.active {
          color: var(--red);
        }
        .cr-tab.active::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--red);
        }

        /* JOB CARDS */
        .cr-job-list {
          display: flex;
          flex-direction: column;
        }
        .cr-job-card {
          border-bottom: 1px solid #1e1e1e;
          background: var(--dark);
          color: #f0f0f0;
          position: relative;
          overflow: hidden;
          transition: background 0.25s ease;
        }
        .cr-job-card:first-child {
          border-radius: 6px 6px 0 0;
          border-top: 1px solid #1e1e1e;
        }
        .cr-job-card:last-child {
          border-radius: 0 0 6px 6px;
        }
        .cr-job-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 100%;
          background: var(--red);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
        }
        .cr-job-card:hover::before,
        .cr-job-card.open::before {
          transform: scaleY(1);
        }
        .cr-job-header {
          display: grid;
          grid-template-columns: 72px 1fr auto;
          align-items: center;
          padding: 26px 32px 26px 36px;
          gap: 24px;
          cursor: pointer;
          user-select: none;
        }
        .cr-job-index {
          font-size: 44px;
          font-weight: 800;
          color: #202020;
          line-height: 1;
          letter-spacing: -2px;
          transition: color 0.3s ease;
          font-variant-numeric: tabular-nums;
        }
        .cr-job-card:hover .cr-job-index,
        .cr-job-card.open .cr-job-index {
          color: var(--red);
        }
        .cr-job-header-info :global(h3) {
          font-size: 17px;
          font-weight: 600;
          color: var(--white);
          margin-bottom: 10px;
          transition: color 0.2s ease;
        }
        .cr-job-card:hover .cr-job-header-info :global(h3),
        .cr-job-card.open .cr-job-header-info :global(h3) {
          color: var(--red);
        }
        .cr-job-meta {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: #555;
          flex-wrap: wrap;
          align-items: center;
        }
        .cr-job-meta :global(span) {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .cr-job-type {
          display: inline-block;
          padding: 3px 10px;
          background: rgba(200, 16, 46, 0.12);
          color: var(--red);
          font-size: 10px;
          font-weight: 700;
          border-radius: 2px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid rgba(200, 16, 46, 0.25);
        }
        .cr-job-toggle {
          width: 30px;
          height: 30px;
          border-radius: 4px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #555;
          font-size: 20px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
          cursor: pointer;
          font-family: inherit;
          font-weight: 300;
        }
        .cr-job-card:hover .cr-job-toggle {
          border-color: var(--red);
          color: var(--red);
        }
        .cr-job-card.open .cr-job-toggle {
          background: var(--red);
          border-color: var(--red);
          color: white;
        }
        .cr-job-header-btns {
          display: none;
        }
        .cr-job-body {
          max-height: 0;
          overflow: hidden;
          background: var(--dark);
          transition:
            max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.3s ease;
          opacity: 0;
        }
        .cr-job-card.open .cr-job-body {
          /* Big enough for any real job description from the CRM. The
             transition only animates up to the actual content height, so
             there's no visual penalty from a large ceiling. */
          max-height: 6000px;
          opacity: 1;
        }
        .cr-job-body-inner {
          padding: 0 32px 32px 132px;
          display: grid;
          grid-template-columns: 1fr 240px;
          gap: 40px;
          align-items: stretch;
          background: var(--dark);
          border-top: 1px solid #1e1e1e;
        }
        .cr-job-header {
          background: var(--dark);
        }
        .cr-job-desc {
          font-size: 14px;
          color: #d4d4d4;
          line-height: 1.8;
          padding-top: 20px;
        }
        .cr-job-desc-label {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--red);
          background: rgba(200, 16, 46, 0.12);
          padding: 4px 10px;
          border-radius: 3px;
          margin-bottom: 14px;
        }
        .cr-job-desc :global(p) {
          margin-bottom: 8px;
          color: #d4d4d4;
        }
        .cr-job-desc :global(ul) {
          padding-left: 20px;
          margin-bottom: 8px;
        }
        .cr-job-desc :global(li) {
          margin-bottom: 4px;
          color: #d4d4d4;
        }
        .cr-job-desc :global(li::marker) {
          color: var(--red);
        }
        .cr-job-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 18px;
        }
        .cr-job-tag {
          padding: 4px 10px;
          border: 1px solid #2a2a2a;
          border-radius: 20px;
          font-size: 11px;
          color: #888;
        }
        .cr-job-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
          padding-top: 24px;
          align-self: end;
        }
        .cr-job-cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 14px 22px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          background: var(--red);
          color: #fff;
          border: 1.5px solid var(--red);
          border-radius: 6px;
          cursor: pointer;
          transition:
            background 0.2s,
            transform 0.2s,
            box-shadow 0.2s;
          letter-spacing: 0.2px;
        }
        .cr-job-cta-primary :global(span) {
          font-size: 18px;
          transition: transform 0.2s ease;
        }
        .cr-job-cta-primary:hover {
          background: var(--red-dark);
          border-color: var(--red-dark);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(200, 16, 46, 0.35);
        }
        .cr-job-cta-primary:hover :global(span) {
          transform: translateX(4px);
        }
        .cr-job-cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          background: transparent;
          color: #f0f0f0;
          border: 1.5px solid #3a3a3a;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cr-job-cta-secondary:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: #f0f0f0;
          color: #fff;
        }
        .cr-no-jobs {
          text-align: center;
          padding: 48px 20px;
          color: #444;
          font-size: 15px;
          border: 1px dashed #222;
          border-radius: 8px;
          background: var(--dark);
        }

        /* OPEN APPLICATION */
        .cr-open-application {
          background: var(--gray-100);
          text-align: center;
        }
        .cr-open-application .cr-section-desc {
          margin: 0 auto 32px;
        }
        .cr-application-form {
          max-width: 560px;
          margin: 0 auto;
          text-align: left;
        }
        .cr-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .cr-form-group {
          margin-bottom: 16px;
        }
        .cr-form-group :global(label) {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: var(--gray-700);
          margin-bottom: 6px;
        }
        .cr-form-group :global(label .req) {
          color: var(--red);
        }
        .cr-form-group :global(input),
        .cr-form-group :global(select),
        .cr-form-group :global(textarea) {
          width: 100%;
          padding: 12px 16px;
          font-family: inherit;
          font-size: 15px;
          border: 1px solid var(--gray-300);
          border-radius: 6px;
          background: var(--white);
          color: var(--dark);
          transition: border-color 0.2s ease;
          outline: none;
        }
        .cr-form-group :global(input:focus),
        .cr-form-group :global(select:focus),
        .cr-form-group :global(textarea:focus) {
          border-color: var(--red);
          box-shadow: 0 0 0 3px var(--red-glow);
        }
        .cr-form-group :global(textarea) {
          resize: vertical;
          min-height: 80px;
        }
        .cr-upload-box {
          border: 2px dashed var(--gray-300);
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: var(--white);
        }
        .cr-upload-box:hover {
          border-color: var(--red);
          background: var(--red-light);
        }
        .cr-upload-box :global(i) {
          font-size: 1.4rem;
          color: var(--gray-400);
          margin-bottom: 6px;
          display: block;
        }
        .cr-upload-box :global(span) {
          font-size: 13px;
          color: var(--gray-400);
        }
        .cr-upload-box :global(span.chosen) {
          color: var(--red);
          font-weight: 700;
        }
        .cr-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin: 18px 0 22px;
        }
        .cr-checkbox :global(input) {
          margin-top: 3px;
          accent-color: var(--red);
          cursor: pointer;
        }
        .cr-checkbox :global(label) {
          font-size: 13px;
          color: var(--gray-500);
          cursor: pointer;
          line-height: 1.5;
          font-weight: 400;
        }
        .cr-form-submit {
          text-align: center;
          margin-top: 24px;
        }

        /* DETAIL */
        .cr-detail-wrap {
          max-width: 800px;
          margin: 0 auto;
          padding: 48px 24px 60px;
        }
        .cr-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--gray-500);
          text-decoration: none;
          cursor: pointer;
          font-weight: 600;
          margin-bottom: 24px;
          transition: color 0.2s;
        }
        .cr-back:hover {
          color: var(--red);
        }
        .cr-detail-head :global(h2) {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 20px;
          letter-spacing: -0.5px;
        }
        .cr-detail-meta {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 32px;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--gray-200);
        }
        .cr-dm-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cr-dm-item .dm-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--gray-400);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .cr-dm-item .dm-value {
          font-size: 15px;
          font-weight: 600;
          color: var(--dark);
        }
        .cr-detail-section {
          margin-bottom: 32px;
        }
        .cr-detail-section :global(h4) {
          font-size: 15px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .cr-detail-section :global(p),
        .cr-detail-section :global(li) {
          font-size: 15px;
          color: var(--gray-700);
          line-height: 1.8;
        }
        .cr-detail-section :global(ul) {
          padding-left: 20px;
        }
        .cr-detail-section :global(ul li) {
          margin-bottom: 6px;
        }
        .cr-detail-section :global(ul li::marker) {
          color: var(--red);
        }
        .cr-detail-actions {
          display: flex;
          gap: 12px;
          margin-top: 40px;
          padding-top: 28px;
          border-top: 1px solid var(--gray-200);
        }

        /* APPLY */
        .cr-apply-wrap {
          max-width: 560px;
          margin: 0 auto;
          padding: 48px 24px 60px;
        }
        .cr-apply-wrap :global(h2) {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }
        .cr-apply-wrap > :global(p) {
          font-size: 15px;
          color: var(--gray-500);
          margin-bottom: 32px;
        }

        /* CLOSING */
        .cr-closing-quote {
          text-align: center;
          padding: 80px 0;
          border-top: 1px solid var(--gray-100);
        }
        .cr-closing-quote :global(blockquote) {
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 500;
          color: var(--dark);
          max-width: 700px;
          margin: 0 auto 16px;
          line-height: 1.5;
          letter-spacing: -0.3px;
        }
        .cr-closing-quote .attribution {
          font-size: 15px;
          color: var(--gray-500);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .cr-red-line {
          width: 40px;
          height: 3px;
          background: var(--red);
          margin: 0 auto 24px;
          border-radius: 2px;
        }

        /* fade-up */
        .cr-wrap :global(.fade-up) {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.5s ease,
            transform 0.5s ease;
        }
        .cr-wrap :global(.fade-up.visible) {
          opacity: 1;
          transform: translateY(0);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .cr-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .cr-who-we-are .cr-content-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .cr-cards-grid {
            grid-template-columns: 1fr;
          }
          .cr-photo-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cr-dept-item {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .cr-benefits-grid {
            grid-template-columns: 1fr;
          }
          .cr-form-row {
            grid-template-columns: 1fr;
          }
          .cr-tabs {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            -webkit-overflow-scrolling: touch;
          }
          .cr-tab {
            white-space: nowrap;
          }
          .cr-detail-meta {
            gap: 16px;
          }
          .cr-job-header {
            grid-template-columns: 32px 1fr 36px;
            align-items: start;
            padding: 16px;
            gap: 12px;
          }
          .cr-job-index {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 2px;
            color: #333;
            padding-top: 3px;
          }
          .cr-job-header-info {
            width: 100%;
          }
          .cr-job-header-info :global(h3) {
            font-size: 15px;
            line-height: 1.4;
            margin-bottom: 8px;
            white-space: normal;
            word-break: break-word;
          }
          .cr-job-toggle {
            width: 30px;
            height: 30px;
            margin-top: 0;
          }
          .cr-job-meta {
            gap: 4px 10px;
            font-size: 12px;
            margin-top: 4px;
          }
          .cr-job-body-inner {
            padding: 0 16px 20px 16px;
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .cr-job-actions {
            flex-direction: column;
            padding-top: 8px;
            align-self: stretch;
          }
          .cr-job-cta-primary,
          .cr-job-cta-secondary {
            width: 100%;
            justify-content: center;
          }
        }
        @media (max-width: 600px) {
          .cr-section {
            padding: 56px 0;
          }
          .cr-hero {
            padding: 80px 0 56px;
          }
          .cr-photo-grid {
            grid-template-columns: 1fr 1fr;
          }
          .cr-positions-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
