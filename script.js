const services = [
  {
    index: "01",
    kicker: "Innovation Capital",
    title: "产业创新投资平台",
    description:
      "以产业需求为起点，围绕募资、投资、招商、并购与过桥服务，挖掘并培育具备产业化潜力的硬科技项目。",
    image: "assets/chip-technology.jpg",
    alt: "科技产业与芯片",
    tags: ["新能源科技", "AI 与算力", "航空航天", "先进材料"],
  },
  {
    index: "02",
    kicker: "Enterprise Incubation",
    title: "央国企创新孵化平台",
    description:
      "挖掘央国企创新需求，匹配创新人才与技术团队，对接创新资本并共同策划机制，推动创新项目进入真实应用场景。",
    image: "assets/industry-partnership.jpg",
    alt: "产业伙伴协同合作",
    tags: ["需求挖掘", "人才匹配", "资本对接", "机制策划"],
  },
  {
    index: "03",
    kicker: "Regional Strategy",
    title: "区域产业规划平台",
    description:
      "以产业集群为目标，整合稀缺资源、培育科技龙头，提供重大项目策划、产业研究、生态招商与区域发展方案。",
    image: "assets/ningbo-city.jpg",
    alt: "现代城市与区域产业发展",
    tags: ["产业规划", "龙头培育", "生态招商", "重大项目"],
  },
  {
    index: "04",
    kicker: "Technology Transfer",
    title: "院所创新能力转化平台",
    description:
      "聚焦市场真实需求，以项目主体、变现通道和产业伙伴为基础，让科研人才、试错资本与制造能力协同参与成果转化。",
    image: "assets/technology-transfer-lab.jpg",
    alt: "科研人员在实验室分析实验数据",
    tags: ["成果验证", "科研人才", "试错资本", "产业转化"],
  },
  {
    index: "05",
    kicker: "Corporate Venture Capital",
    title: "产业龙头 CVC 咨询平台",
    description:
      "为产业龙头提供发展战略、赛道竞争分析、资金配置、优质科创项目推介及投资回报测算，提升产业投资效率。",
    image: "assets/capital-services.jpg",
    alt: "资本市场与投资分析",
    tags: ["战略咨询", "赛道分析", "标的推荐", "回报测算"],
  },
  {
    index: "06",
    kicker: "Industrial Cluster",
    title: "产业集群整合平台",
    description:
      "面向龙头企业和区域集群，连接一手核心资源，构建集采、集储、集融、集销、集研的一体化产业协同体系。",
    image: "assets/industrial-cluster-logistics.jpg",
    alt: "仓储与供应链协同作业",
    tags: ["核心资源", "集采平台", "供应链", "生态协同"],
  },
  {
    index: "07",
    kicker: "Business Transformation",
    title: "企业六维升级平台",
    description:
      "针对二代接班与产业升级，在资本、订单、智造、生态、科研、人才六个维度联合交付，打造科技型产业新龙头。",
    image: "assets/advanced-manufacturing.jpg",
    alt: "智能制造与企业升级",
    tags: ["资本创新", "订单增长", "智能制造", "人才组织"],
  },
  {
    index: "08",
    kicker: "Global Expansion",
    title: "产业出海服务平台",
    description:
      "围绕新能源、电船、循环再制造、电解铝、物流、职业教育与基础设施，提供产业出海与全球资源协同服务。",
    image: "assets/global-port-logistics.jpg",
    alt: "港口、集装箱与全球物流网络",
    tags: ["新能源出海", "全球物流", "职业教育", "基础设施"],
  },
];

function preloadServiceImages() {
  services.slice(1).forEach(({ image }) => {
    const preload = new Image();
    preload.decoding = "async";
    preload.src = image;
  });
}

window.addEventListener("load", preloadServiceImages, { once: true });

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const navLinks = document.querySelector("[data-nav-links]");
const sectionLinks = [...document.querySelectorAll("[data-section-link]")];
const backToTop = document.querySelector("[data-back-to-top]");
const servicePanel = document.querySelector(".service-panel");
const tabs = [...document.querySelectorAll("[data-service]")];
const serviceImage = document.querySelector("[data-service-image]");
const serviceIndex = document.querySelector("[data-service-index]");
const serviceKicker = document.querySelector("[data-service-kicker]");
const serviceTitle = document.querySelector("[data-service-title]");
const serviceDescription = document.querySelector("[data-service-description]");
const serviceTags = document.querySelector("[data-service-tags]");
let serviceChangeTimer;

function syncActiveNavigation() {
  const marker = window.innerHeight * 0.38;
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

function syncHeader() {
  const scrolled = window.scrollY > 24;
  header.classList.toggle("is-scrolled", scrolled);
  backToTop.classList.toggle("is-visible", window.scrollY > 720);
  syncActiveNavigation();
}

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "打开菜单");
  navLinks.classList.remove("is-open");
  header.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  syncHeader();
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "打开菜单" : "关闭菜单");
  navLinks.classList.toggle("is-open", !isOpen);
  header.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("scroll", syncHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 960) closeMenu();
  syncActiveNavigation();
});

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

function activateService(tab, moveFocus = false) {
  const nextIndex = Number(tab.dataset.service);
  const service = services[nextIndex];

  tabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  servicePanel.setAttribute("aria-labelledby", tab.id);
  servicePanel.classList.add("is-changing");
  window.clearTimeout(serviceChangeTimer);

  serviceChangeTimer = window.setTimeout(() => {
    serviceImage.src = service.image;
    serviceImage.alt = service.alt;
    serviceIndex.textContent = service.index;
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
    servicePanel.classList.remove("is-changing");
  }, 180);

  if (moveFocus) {
    tab.focus({ preventScroll: true });
    tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateService(tab));
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

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -5%" },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
document.querySelector("[data-year]").textContent = new Date().getFullYear();
syncHeader();
