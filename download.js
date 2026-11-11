// Points the download buttons at the files of the latest published release (GitHub's public API).
// Without JavaScript, or if the API can't be reached, the buttons open the release page instead.
(async () => {
  const box = document.querySelector(".downloads");
  if (!box) return;
  try {
    const r = await fetch(`https://api.github.com/repos/${box.dataset.repo}/releases/latest`, { headers: { Accept: "application/vnd.github+json" } });
    if (!r.ok) return;
    const release = await r.json();
    const version = String(release.tag_name || "").replace(/^v/, "");
    if (version) document.getElementById("version").textContent = version;
    const set = (id, test) => {
      const asset = (release.assets || []).find((a) => test.test(a.name));
      const link = document.getElementById(id);
      if (!asset) {
        // Not in this release (yet): say so instead of sending people to a page without the file.
        link.textContent = id === "win" ? "Windows version: coming in a few days" : "Mac version: coming in a few days";
        link.setAttribute("aria-disabled", "true");
        link.removeAttribute("href");
        return;
      }
      // Only ever link to a file of this release on github.com.
      if (!String(asset.browser_download_url).startsWith(`https://github.com/${box.dataset.repo}/releases/download/`)) return;
      link.href = asset.browser_download_url;
      const sum = document.getElementById(`${id}-sum`);
      const mb = (asset.size / 1048576).toFixed(1);
      sum.textContent = `${asset.name} · ${mb} MB${asset.digest ? ` · ${asset.digest.replace("sha256:", "SHA-256 ")}` : ""}`;
    };
    set("mac", /\.dmg$/i);
    set("win", /-setup\.exe$/i);
  } catch {
    /* keep the fallback links */
  }
})();
