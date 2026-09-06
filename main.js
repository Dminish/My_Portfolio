/* ============================================================
   Danishvaran Kamalakannan — portfolio
   ============================================================ */

/* ---- EDIT ME -------------------------------------------------
   Fill these in and the links switch on automatically.
   Leave a value as "" and that link stays disabled instead of
   shipping a dead href.
--------------------------------------------------------------- */
const LINKS = {
  pl:       "https://premier-league-match-prediction-by-danish.streamlit.app/",
  linkedin: "https://www.linkedin.com/in/danishvaran15/",
  github:   "https://github.com/Dminish"
};

/* ---- live links ---------------------------------------------- */

document.querySelectorAll("[data-live-link]").forEach((el) => {
  const url = LINKS[el.dataset.liveLink];
  if (url) {
    el.href = url;
  } else {
    el.setAttribute("aria-disabled", "true");
    el.removeAttribute("href");
    el.title = "Link not set yet — add it to LINKS in main.js";
  }
});

/* ---- split target text into per-word spans ------------------- */

document.querySelectorAll("[data-reveal-words]").forEach((el) => {
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((tok) => {
          if (!tok.trim()) return frag.appendChild(document.createTextNode(tok));
          const span = document.createElement("span");
          span.className = "word";
          span.style.setProperty("--i", i++);
          span.textContent = tok;
          frag.appendChild(span);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR") {
        walk(child);
      }
    });
  };
  walk(el);
  el.setAttribute("data-reveal", "");
});

/* ---- scroll reveal ------------------------------------------- */

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
);
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

/* ---- time machine -------------------------------------------- */

const TIMELINE = {
  2018: {
    role: "Undergraduate",
    org: "UNITAR International University — Kuala Lumpur",
    copy: "Started a BSc in Information Technology, specialising in Software Engineering. Made the Dean's List every year of the programme, 2018 through 2021, and finished with a 3.38 GPA."
  },
  2020: {
    role: "Software Engineering Intern",
    org: "Jann Properties — Kuala Lumpur",
    copy: "First taste of shipping. Built web applications in ReactJS and wrote test automation with CodeceptJS, Puppeteer and TestCafe. Learned that the documentation, the flowcharts and the test plans are the part that survives you."
  },
  2021: {
    role: "IT Service Desk Analyst",
    org: "ATOS Services (M) Sdn Bhd — Cyberjaya",
    copy: "Tier-level support, logging hardware and software defects into ServiceNow so engineering could run root-cause analysis later. Active Directory rights, machine setups, network connectivity, VOIP. Learned what infrastructure actually breaks like."
  },
  2022: {
    role: "Quality Analyst + MSc Candidate",
    org: "ATOS Services & Universiti Malaya",
    copy: "Moved into quality auditing — mining performance data from the Quality Analyst Tool and turning it into process improvements that raised first point of contact resolution and CSAT. Enrolled in the Master in Data Science at Universiti Malaya the same year."
  },
  2023: {
    role: "IT Operations Associate",
    org: "Evernex Malaysia Sdn. Bhd. — Kuala Lumpur",
    copy: "Enterprise hardware maintenance across APAC, ANZ and NORAM — IBM, DELL, HP, NETAPP. Analysed incident and performance telemetry to find recurring bottlenecks, and held service delivery to its SLAs. This is where the predictive maintenance idea came from."
  },
  2026: {
    role: "Master in Data Science",
    org: "Universiti Malaya — CGPA 3.33",
    copy: "Graduating March 2026 with two deployed machine learning applications behind me: a Random Forest engine that reads S.M.A.R.T. telemetry for early drive failure, and a deep learning match predictor. Looking for the role where infrastructure fluency and data science stop being two separate jobs."
  }
};

const panel = document.querySelector(".tl__panel");

if (panel) {
  const ghost = panel.querySelector(".tl__ghost");
  const role = panel.querySelector(".tl__role");
  const org = panel.querySelector(".tl__org");
  const copy = panel.querySelector(".tl__copy");
  const tabs = [...document.querySelectorAll(".tl__year")];

  const paint = (year) => {
    const d = TIMELINE[year];
    if (!d) return;
    ghost.textContent = year;
    role.textContent = d.role;
    org.textContent = d.org;
    copy.textContent = d.copy;
  };

  const select = (btn) => {
    tabs.forEach((t) => {
      const on = t === btn;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });
    panel.classList.add("is-swap");
    setTimeout(() => {
      paint(btn.dataset.year);
      panel.classList.remove("is-swap");
    }, 180);
  };

  tabs.forEach((btn, idx) => {
    btn.addEventListener("click", () => select(btn));
    btn.addEventListener("keydown", (e) => {
      const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      const next = tabs[(idx + step + tabs.length) % tabs.length];
      next.focus();
      select(next);
    });
  });

  paint(tabs[0].dataset.year);
}

/* ---- pointer parallax on project posters --------------------- */

const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (fine && !still) {
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.015)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
}

/* ---- footer year --------------------------------------------- */

document.getElementById("year").textContent = new Date().getFullYear();
