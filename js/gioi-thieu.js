function disableAllTabs() {
    document.getElementById("tab-data-science").classList.remove("active");
    document.getElementById("tab-mobile-web").classList.remove("active");
}
function showDataScience() {
    disableAllTabs();
    document.getElementById("mobileWeb").classList.add("hidden");
    document.getElementById("dataScience").classList.remove("hidden");

    document.getElementById("tab-data-science").classList.add("active");
    // document.getElementById("tab-data-science").style.backgroundColor =
    //   "#083344";
    // document.getElementById("tab-data-science").style.color = "white";
    // document.getElementById("tab-mobile-web").style.backgroundColor =
    //   "#e5e7eb";
    // document.getElementById("tab-mobile-web").style.color = "#1f2937";
}

function showMobileWeb() {
    disableAllTabs();
    document.getElementById("dataScience").classList.add("hidden");
    document.getElementById("mobileWeb").classList.remove("hidden");
    document.getElementById("tab-mobile-web").classList.add("active");

    // document.getElementById("tab-data-science").style.backgroundColor =
    //   "#e5e7eb";
    // document.getElementById("tab-data-science").style.color = "#1f2937";
    // document.getElementById("tab-mobile-web").style.backgroundColor =
    //   "#083344";
    // document.getElementById("tab-mobile-web").style.color = "white";
}

// Event listeners
document
    .getElementById("tab-data-science")
    .addEventListener("click", showDataScience);
document
    .getElementById("tab-mobile-web")
    .addEventListener("click", showMobileWeb);

// Default tab based on URL parameter
const params = new URLSearchParams(window.location.search);
const selectedTab = params.get("tab");

if (selectedTab === "dataScience") {
    showDataScience();
} else {
    showMobileWeb(); // fallback
}
