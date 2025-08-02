const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/**
 * JS toggle
 *
 * Cách dùng:
 * <button class="js-toggle" toggle-target="#box">Click</button>
 * <div id="box">Content show/hide</div>
 */
document.addEventListener("click", initJsToggle);

function initJsToggle() {
  $$(".js-toggle").forEach((button) => {
    const target = button.getAttribute("toggle-target");
    if (!target) {
      document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
    }
    button.onclick = (e) => {
      e.preventDefault();

      if (!$(target)) {
        return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
      }
      const isHidden = $(target).classList.contains("hide");

      requestAnimationFrame(() => {
        $(target).classList.toggle("hide", !isHidden);
        $(target).classList.toggle("show", isHidden);
      });
    };
    document.onclick = function (e) {
      if (!e.target.closest(target)) {
        const isHidden = $(target).classList.contains("hide");
        if (!isHidden) {
          button.click();
        }
      }
    };
  });
}

function formatDuration(duration) {
  if (typeof duration !== "number" || Number.isNaN(duration) || duration < 0)
    return "Invalid duration";
  let hour = Math.floor(duration / 3600);
  let minute = Math.floor((duration - hour * 3600) / 60);
  let second = duration - hour * 3600 - minute * 60;
  const formatTime = (time) => Math.floor(time).toString().padStart(2, "0");
  if (hour)
    return `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}`;
  return `${formatTime(minute)}:${formatTime(second)}`;
}
