const code = "982YR5";
const inviteLink = "https://minara.ai/home?code=982YR5&from=user";

const toast = document.getElementById("toast");
const copyCodeBtn = document.getElementById("copyCode");
const copyLinkBtn = document.getElementById("copyLink");
const shareBtn = document.getElementById("shareBtn");
const inviteInput = document.getElementById("inviteLink");

function showToast(msg){
  toast.textContent = msg;
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => {
    toast.textContent = "";
  }, 2200);
}

async function copyText(txt){
  try{
    await navigator.clipboard.writeText(txt);
    return true;
  }catch(e){
    try{
      const ta = document.createElement("textarea");
      ta.value = txt;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    }catch(err){
      return false;
    }
  }
}

copyCodeBtn.addEventListener("click", async () => {
  const ok = await copyText(code);
  showToast(ok ? "Referral code copied." : "Copy failed. Please copy manually.");
});

copyLinkBtn.addEventListener("click", async () => {
  const ok = await copyText(inviteLink);
  showToast(ok ? "Sign-up link copied." : "Copy failed.");
});

document.querySelectorAll("[data-copy]").forEach(el => {
  el.addEventListener("click", async () => {
    const txt = el.getAttribute("data-copy");
    const ok = await copyText(txt);
    showToast(ok ? "Copied." : "Copy failed.");
  });
});

shareBtn.addEventListener("click", async () => {
  if (navigator.share){
    try{
      await navigator.share({
        title: "Minara AI Referral Code",
        text: `Minara AI referral code: ${code}`,
        url: inviteLink
      });
      showToast("Shared.");
      return;
    }catch(e){}
  }
  const ok = await copyText(inviteLink);
  showToast(ok ? "Sharing not available — link copied." : "Share failed.");
});

inviteInput?.addEventListener("focus", () => inviteInput.select());
