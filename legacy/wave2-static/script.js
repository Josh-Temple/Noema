const navConfig = {
  home: { page: "homePage", title: "ホーム" },
  search: { page: "searchPage", title: "検索" },
  compare: { page: "comparePage", title: "比較" },
  saved: { page: "savedPage", title: "保存済み" },
};

const seedData = {
  comparisons: [
    "デカルト vs ヒューム",
    "プラトン vs アリストテレス",
    "ヒューム vs カント",
  ],
  thinkers: ["イマヌエル・カント", "デイヴィッド・ヒューム", "ジャン=ジャック・ルソー"],
  themes: ["知識", "自由", "正義", "倫理"],
  questions: [
    "疑えない知識は存在するか？",
    "自由は自然法則と両立するか？",
    "正義は普遍か、それとも時代依存か？",
  ],
};

const searchData = {
  comparisons: [
    "デカルト vs ヒューム",
    "ヒューム vs カント",
    "ルソー vs ホッブズ",
    "プラトン vs アリストテレス",
  ],
  thinkers: ["プラトン", "デカルト", "ヒューム", "カント", "ルソー", "ロールズ"],
  themes: ["知識とは何か", "自由", "幸福", "正義", "科学と哲学"],
};

const pageTitle = document.getElementById("pageTitle");
const pages = document.querySelectorAll(".page");
const overlayPages = document.querySelectorAll(".overlay-page");
const navButtons = document.querySelectorAll("#bottomNav [data-nav]");
const openPageButtons = document.querySelectorAll("[data-open-page]");
const closeOverlayButtons = document.querySelectorAll("[data-close-overlay]");
const searchInput = document.getElementById("searchInput");

function dailyIndex(size, offset = 0) {
  const now = new Date();
  const base = now.getFullYear() * 1000 + now.getMonth() * 40 + now.getDate() + offset;
  return base % size;
}

function renderDailyPicks() {
  const thinker = seedData.thinkers[dailyIndex(seedData.thinkers.length)];
  const comparison = seedData.comparisons[dailyIndex(seedData.comparisons.length, 1)];
  const question = seedData.questions[dailyIndex(seedData.questions.length, 2)];

  document.getElementById("dailyThinker").innerHTML = `<p>今日の思想家</p><strong>${thinker}</strong>`;
  document.getElementById("dailyComparison").innerHTML = `<p>今日の比較</p><strong>${comparison}</strong>`;
  document.getElementById("dailyQuestion").innerHTML = `<p>今日の問い</p><strong>${question}</strong>`;
}

function switchNav(tab) {
  const config = navConfig[tab];
  if (!config) {
    return;
  }

  overlayPages.forEach((overlay) => overlay.classList.remove("active"));
  pages.forEach((page) => page.classList.remove("active"));
  document.getElementById(config.page).classList.add("active");
  pageTitle.textContent = config.title;

  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.nav === tab);
  });
}

function openOverlay(type) {
  pages.forEach((page) => page.classList.remove("active"));
  overlayPages.forEach((overlay) => overlay.classList.remove("active"));
  const overlayId = type === "theme" ? "themePage" : "thinkerPage";
  document.getElementById(overlayId).classList.add("active");
  pageTitle.textContent = type === "theme" ? "テーマ" : "思想家";
  navButtons.forEach((button) => button.classList.remove("active"));
}

function getSavedItems() {
  try {
    return JSON.parse(localStorage.getItem("noema-saved") || "[]");
  } catch {
    return [];
  }
}

function setSavedItems(items) {
  localStorage.setItem("noema-saved", JSON.stringify(items));
}

function toggleSavedItem(label) {
  const current = getSavedItems();
  const exists = current.includes(label);
  const next = exists ? current.filter((item) => item !== label) : [...current, label];
  setSavedItems(next);
  renderSavedList();
  renderSearchResults(searchInput.value.trim());
}

function renderSavedList() {
  const container = document.getElementById("savedList");
  const items = getSavedItems();

  if (items.length === 0) {
    container.innerHTML = `<div class="section-card"><p>まだ保存はありません。検索や比較ページから保存できます。</p></div>`;
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `<div class="search-item"><span>${item}</span><button class="save-button" data-remove-save="${item}">削除</button></div>`,
    )
    .join("");

  document.querySelectorAll("[data-remove-save]").forEach((button) => {
    button.addEventListener("click", () => toggleSavedItem(button.dataset.removeSave));
  });
}

function resultMarkup(label) {
  const saved = getSavedItems().includes(label);
  return `<div class="search-item"><span>${label}</span><button class="save-button" data-save-item="${label}">${saved ? "保存済み" : "保存"}</button></div>`;
}

function renderSearchResults(keyword = "") {
  const matcher = (value) => value.includes(keyword);
  const grouped = {
    comparisons: searchData.comparisons.filter(matcher),
    thinkers: searchData.thinkers.filter(matcher),
    themes: searchData.themes.filter(matcher),
  };

  document.getElementById("comparisonResults").innerHTML = grouped.comparisons.map(resultMarkup).join("");
  document.getElementById("thinkerResults").innerHTML = grouped.thinkers.map(resultMarkup).join("");
  document.getElementById("themeResults").innerHTML = grouped.themes.map(resultMarkup).join("");

  document.querySelectorAll("[data-save-item]").forEach((button) => {
    button.addEventListener("click", () => toggleSavedItem(button.dataset.saveItem));
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => switchNav(button.dataset.nav));
});

document.querySelectorAll("[data-nav-target]").forEach((button) => {
  button.addEventListener("click", () => switchNav(button.dataset.navTarget));
});

openPageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.openPage;
    if (target === "compare") {
      switchNav("compare");
      return;
    }
    if (target === "thinker" || target === "theme") {
      openOverlay(target);
      return;
    }
    if (target === "saved") {
      switchNav("saved");
    }
  });
});

closeOverlayButtons.forEach((button) => {
  button.addEventListener("click", () => switchNav("home"));
});

searchInput.addEventListener("input", () => {
  renderSearchResults(searchInput.value.trim());
});

renderDailyPicks();
renderSearchResults();
renderSavedList();
switchNav("home");
