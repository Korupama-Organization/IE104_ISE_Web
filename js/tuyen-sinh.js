// /tuyển-sinh.js
document.addEventListener("DOMContentLoaded", () => {
    const btnUndergrad = document.getElementById("btn-undergrad");
    const btnPostgrad = document.getElementById("btn-postgrad");
    const undergrad = document.getElementById("undergrad-section");
    const postgrad = document.getElementById("postgrad-section");
    if (!btnUndergrad || !btnPostgrad || !undergrad || !postgrad) return;

    const activate = (showBtn, hideBtn, showPanel, hidePanel) => {
        // vì: đồng bộ trạng thái khi responsive
        showBtn.classList.add("active-tab");
        hideBtn.classList.remove("active-tab");
        showBtn.setAttribute("aria-selected", "true");
        hideBtn.setAttribute("aria-selected", "false");
        showPanel.classList.add("active");
        hidePanel.classList.remove("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    btnUndergrad.addEventListener("click", (e) => { e.preventDefault(); activate(btnUndergrad, btnPostgrad, undergrad, postgrad); });
    btnPostgrad.addEventListener("click", (e) => { e.preventDefault(); activate(btnPostgrad, btnUndergrad, postgrad, undergrad); });
});

    (function () {
  const PAGES = ["thpt", "đgnl"];  // id hai "trang" trong cùng file

    function showFromHash() {
    const hash = decodeURIComponent(location.hash || "#thpt");
    PAGES.forEach(id => {
      const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("is-active", ("#" + id) === hash);
    });
  }

    window.addEventListener("hashchange", showFromHash);
    // Lần đầu vào trang
    showFromHash();
})();

// /tuyển-sinh.js

