const services = [
  {
    index: "01",
    kicker: "INNOVATION CAPITAL",
    title: "产业创新投资平台",
    description:
      "以产业需求为起点，围绕募资、投资、招商、并购与过桥服务，挖掘并培育具备产业化潜力的硬科技项目。",
    image: "assets/chip-technology.jpg",
    alt: "科技产业与芯片",
    tags: ["新能源科技", "AI 与算力", "航空航天", "先进材料"],
    accent: "#147ce5",
  },
  {
    index: "02",
    kicker: "ENTERPRISE INCUBATION",
    title: "央国企创新孵化平台",
    description:
      "挖掘央国企创新需求，匹配创新人才与技术团队，对接创新资本并共同策划机制，推动创新项目进入真实应用场景。",
    image: "assets/industry-partnership.jpg",
    alt: "产业伙伴协同合作",
    tags: ["需求挖掘", "人才匹配", "资本对接", "机制策划"],
    accent: "#147ce5",
  },
  {
    index: "03",
    kicker: "REGIONAL STRATEGY",
    title: "区域产业规划平台",
    description:
      "以产业集群为目标，整合稀缺资源、培育科技龙头，提供重大项目策划、产业研究、生态招商与区域发展方案。",
    image: "assets/ningbo-city.jpg",
    alt: "现代城市与区域产业发展",
    tags: ["产业规划", "龙头培育", "生态招商", "重大项目"],
    accent: "#147ce5",
  },
  {
    index: "04",
    kicker: "TECHNOLOGY TRANSFER",
    title: "院所创新能力转化平台",
    description:
      "聚焦市场真实需求，以项目主体、变现通道和产业伙伴为基础，让科研人才、试错资本与制造能力协同参与成果转化。",
    image: "assets/technology-transfer-lab.jpg",
    alt: "科研人员在实验室分析实验数据",
    tags: ["成果验证", "科研人才", "试错资本", "产业转化"],
    accent: "#147ce5",
  },
  {
    index: "05",
    kicker: "CORPORATE VENTURE CAPITAL",
    title: "产业龙头 CVC 咨询平台",
    description:
      "为产业龙头提供发展战略、赛道竞争分析、资金配置、优质科创项目推介及投资回报测算，提升产业投资效率。",
    image: "assets/capital-services.jpg",
    alt: "资本市场与投资分析",
    tags: ["战略咨询", "赛道分析", "标的推荐", "回报测算"],
    accent: "#147ce5",
  },
  {
    index: "06",
    kicker: "INDUSTRIAL CLUSTER",
    title: "产业集群整合平台",
    description:
      "面向龙头企业和区域集群，连接一手核心资源，构建集采、集储、集融、集销、集研的一体化产业协同体系。",
    image: "assets/industrial-cluster-logistics.jpg",
    alt: "仓储与供应链协同作业",
    tags: ["核心资源", "集采平台", "供应链", "生态协同"],
    accent: "#147ce5",
  },
  {
    index: "07",
    kicker: "BUSINESS TRANSFORMATION",
    title: "企业六维升级平台",
    description:
      "针对二代接班与产业升级，在资本、订单、智造、生态、科研、人才六个维度联合交付，打造科技型产业新龙头。",
    image: "assets/advanced-manufacturing.jpg",
    alt: "智能制造与企业升级",
    tags: ["资本创新", "订单增长", "智能制造", "人才组织"],
    accent: "#147ce5",
  },
  {
    index: "08",
    kicker: "GLOBAL EXPANSION",
    title: "产业出海服务平台",
    description:
      "围绕新能源、电船、循环再制造、电解铝、物流、职业教育与基础设施，提供产业出海与全球资源协同服务。",
    image: "assets/global-port-logistics.jpg",
    alt: "港口、集装箱与全球物流网络",
    tags: ["新能源出海", "全球物流", "职业教育", "基础设施"],
    accent: "#147ce5",
  },
];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const navLinks = document.querySelector("[data-nav-links]");
const sectionLinks = [...document.querySelectorAll("[data-section-link]")];
const backToTop = document.querySelector("[data-back-to-top]");
const footer = document.querySelector(".site-footer");
const scrollProgress = document.querySelector("[data-scroll-progress]");
const hero = document.querySelector("[data-hero]");
const heroImage = document.querySelector("[data-hero-image]");
const servicesSection = document.querySelector("[data-service-section]");
const servicePanel = document.querySelector(".service-panel");
const serviceVisual = document.querySelector("[data-service-visual]");
const tabs = [...document.querySelectorAll("[data-service]")];
const serviceImage = document.querySelector("[data-service-image]");
const serviceCurrent = document.querySelector("[data-service-current]");
const serviceKicker = document.querySelector("[data-service-kicker]");
const serviceTitle = document.querySelector("[data-service-title]");
const serviceDescription = document.querySelector("[data-service-description]");
const serviceTags = document.querySelector("[data-service-tags]");
const orbitStage = document.querySelector("[data-orbit-stage]");
let serviceChangeTimer;
let scrollTicking = false;
let lastScrollY = window.scrollY;
let scrollVelocity = 0;

if (window.lucide) window.lucide.createIcons();

function preloadServiceImages() {
  services.slice(1).forEach(({ image }) => {
    const preload = new Image();
    preload.decoding = "async";
    preload.src = image;
  });
}

window.addEventListener("load", preloadServiceImages, { once: true });

function syncActiveNavigation() {
  const marker = window.innerHeight * 0.4;
  let currentSection = "";

  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    if (bounds.top <= marker && bounds.bottom >= marker) currentSection = section.id;
  });

  sectionLinks.forEach((link) => {
    const isCurrent = link.hash === `#${currentSection}`;
    link.classList.toggle("is-current", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function syncScrollScene() {
  const scrollY = window.scrollY;
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(scrollY / maxScroll, 1);
  scrollVelocity += (scrollY - lastScrollY - scrollVelocity) * 0.16;
  lastScrollY = scrollY;

  header?.classList.toggle("is-scrolled", scrollY > 28);
  const footerVisible = footer && footer.getBoundingClientRect().top < window.innerHeight;
  backToTop?.classList.toggle("is-visible", scrollY > 760 && !footerVisible);
  if (scrollProgress) scrollProgress.style.transform = `scaleX(${progress})`;

  if (!reducedMotion.matches && hero && heroImage) {
    const heroProgress = Math.min(scrollY / Math.max(hero.offsetHeight, 1), 1);
    heroImage.style.transform = `translate3d(0, ${heroProgress * 6}%, 0) scale(${1.02 + heroProgress * 0.05})`;
  }

  if (!reducedMotion.matches) {
    document.querySelectorAll("[data-parallax]").forEach((element) => {
      const image = element.querySelector("img");
      if (!image) return;
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      const centerDelta = bounds.top + bounds.height / 2 - window.innerHeight / 2;
      const offset = Math.max(-24, Math.min(24, centerDelta * -0.035));
      image.style.transform = `translate3d(0, calc(-7% + ${offset}px), 0) scale(1.08)`;
    });
  }

  syncActiveNavigation();
  scrollTicking = false;
}

function requestScrollSync() {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(syncScrollScene);
}

function closeMenu() {
  if (!menuButton || !navLinks || !header) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "打开菜单");
  navLinks.classList.remove("is-open");
  header.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  requestScrollSync();
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "打开菜单" : "关闭菜单");
  navLinks?.classList.toggle("is-open", !isOpen);
  header?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("scroll", requestScrollSync, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 960) closeMenu();
  requestScrollSync();
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
});

function updateServiceContent(service) {
  serviceImage.src = service.image;
  serviceImage.alt = service.alt;
  serviceCurrent.textContent = service.index;
  serviceKicker.textContent = service.kicker;
  serviceTitle.textContent = service.title;
  serviceDescription.textContent = service.description;
  serviceTags.replaceChildren(
    ...service.tags.map((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      return element;
    }),
  );
}

function activateService(tab, moveFocus = false) {
  const nextIndex = Number(tab.dataset.service);
  const service = services[nextIndex];
  if (!service || !servicePanel) return;

  tabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  servicesSection?.style.setProperty("--service-accent", service.accent);
  servicePanel.setAttribute("aria-labelledby", tab.id);
  servicePanel.classList.add("is-changing");
  window.clearTimeout(serviceChangeTimer);

  serviceChangeTimer = window.setTimeout(() => {
    updateServiceContent(service);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => servicePanel.classList.remove("is-changing"));
    });
  }, reducedMotion.matches ? 0 : 260);

  if (moveFocus) {
    tab.focus({ preventScroll: true });
    tab.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateService(tab));
  tab.addEventListener("pointerenter", () => {
    if (finePointer.matches) activateService(tab);
  });
  tab.addEventListener("keydown", (event) => {
    const currentIndex = tabs.indexOf(tab);
    let targetIndex;

    if (["ArrowRight", "ArrowDown"].includes(event.key)) targetIndex = (currentIndex + 1) % tabs.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") targetIndex = 0;
    if (event.key === "End") targetIndex = tabs.length - 1;
    if (targetIndex === undefined) return;

    event.preventDefault();
    activateService(tabs[targetIndex], true);
  });
});

if (serviceVisual && serviceImage && finePointer.matches && !reducedMotion.matches) {
  serviceVisual.addEventListener("pointermove", (event) => {
    const bounds = serviceVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    serviceImage.style.transform = `translate3d(${x * -14}px, calc(-5% + ${y * -14}px), 0) scale(1.07)`;
  });

  serviceVisual.addEventListener("pointerleave", () => {
    serviceImage.style.transform = "";
  });
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -6%" },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const countObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.count);

      if (reducedMotion.matches) {
        element.textContent = String(target);
      } else {
        const started = performance.now();
        const duration = 900;
        const animate = (time) => {
          const progress = Math.min((time - started) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = String(Math.round(target * eased));
          if (progress < 1) window.requestAnimationFrame(animate);
        };
        window.requestAnimationFrame(animate);
      }

      observer.unobserve(element);
    });
  },
  { threshold: 0.6 },
);

document.querySelectorAll("[data-count]").forEach((element) => countObserver.observe(element));

if (finePointer.matches && !reducedMotion.matches) {
  document.querySelectorAll(".magnetic:not(.hero-scroll)").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - (bounds.left + bounds.width / 2);
      const y = event.clientY - (bounds.top + bounds.height / 2);
      element.style.transform = `translate3d(${x * 0.16}px, ${y * 0.16}px, 0)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}

if (orbitStage && finePointer.matches && !reducedMotion.matches) {
  orbitStage.addEventListener("pointermove", (event) => {
    const bounds = orbitStage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    orbitStage.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  });

  orbitStage.addEventListener("pointerleave", () => {
    orbitStage.style.transform = "";
  });
}

function initializeNetworkCanvas() {
  const canvas = document.querySelector("[data-network-canvas]");
  if (!canvas || reducedMotion.matches) return;

  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  let width = 0;
  let height = 0;
  let nodes = [];
  let frame;
  let active = true;
  const pointer = { x: 0, y: 0, active: false };

  function resizeCanvas() {
    const bounds = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(bounds.width));
    height = Math.max(1, Math.round(bounds.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetCount = Math.max(24, Math.min(64, Math.round(width / 24)));
    nodes = Array.from({ length: targetCount }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      radius: index % 8 === 0 ? 2.2 : 1.2,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw(time) {
    if (!active) return;
    context.clearRect(0, 0, width, height);
    scrollVelocity *= 0.94;

    nodes.forEach((node, index) => {
      if (pointer.active) {
        const dx = node.x - pointer.x;
        const dy = node.y - pointer.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < 22500 && distanceSquared > 1) {
          const force = (22500 - distanceSquared) / 22500;
          const distance = Math.sqrt(distanceSquared);
          node.vx += (dx / distance) * force * 0.025;
          node.vy += (dy / distance) * force * 0.025;
        }
      }

      node.vx *= 0.995;
      node.vy *= 0.995;
      node.x += node.vx + scrollVelocity * 0.008;
      node.y += node.vy;

      if (node.x < -20) node.x = width + 20;
      if (node.x > width + 20) node.x = -20;
      if (node.y < -20) node.y = height + 20;
      if (node.y > height + 20) node.y = -20;

      for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex += 1) {
        const other = nodes[otherIndex];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const threshold = width < 680 ? 96 : 132;
        if (distance > threshold) continue;

        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(other.x, other.y);
        context.strokeStyle = `rgba(116, 178, 255, ${(1 - distance / threshold) * 0.22})`;
        context.lineWidth = 0.75;
        context.stroke();
      }

      const pulse = 0.72 + Math.sin(time * 0.0016 + node.phase) * 0.28;
      context.beginPath();
      context.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
      context.fillStyle = index % 8 === 0 ? "rgba(126, 188, 255, 0.9)" : "rgba(255, 255, 255, 0.62)";
      context.fill();
    });

    frame = window.requestAnimationFrame(draw);
  }

  hero?.addEventListener("pointermove", (event) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
    pointer.active = true;
  });

  hero?.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  const visibilityObserver = new IntersectionObserver((entries) => {
    const isVisible = entries[0]?.isIntersecting;
    if (isVisible && !active) {
      active = true;
      frame = window.requestAnimationFrame(draw);
    } else if (!isVisible && active) {
      active = false;
      window.cancelAnimationFrame(frame);
    }
  });

  visibilityObserver.observe(canvas);
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      active = false;
      window.cancelAnimationFrame(frame);
    } else if (canvas.getBoundingClientRect().bottom > 0) {
      active = true;
      frame = window.requestAnimationFrame(draw);
    }
  });

  resizeCanvas();
  frame = window.requestAnimationFrame(draw);
}

initializeNetworkCanvas();
document.querySelector("[data-year]").textContent = new Date().getFullYear();
syncScrollScene();
