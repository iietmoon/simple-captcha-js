class SimpleCaptcha {
  constructor() {}

  ribbon(config) {
    const defaultConfig = {
      display: true,
      title: "Website protected!",
      icon: true,
      position: "bottom-left",
      link: "https://iietmoon.github.io/simple-captcha-js",
    };

    const ribbonConfig = { ...defaultConfig, ...config };

    const simpleCaptchaRibbon = document.createElement("div");
    simpleCaptchaRibbon.id = "simple-captcha-ribbon";
    simpleCaptchaRibbon.className = "simple-captcha-ribbon";
    simpleCaptchaRibbon.style.display = "flex";
    simpleCaptchaRibbon.style.alignItems = "center";
    simpleCaptchaRibbon.style.justifyContent = "center";
    simpleCaptchaRibbon.style.width = "fit-content";
    simpleCaptchaRibbon.style.padding = "10px";
    simpleCaptchaRibbon.style.backgroundColor = "#f0f0f0";
    simpleCaptchaRibbon.style.position = "absolute";
    simpleCaptchaRibbon.style.gap = "5px";
    simpleCaptchaRibbon.style.boxShadow =
      "-2px 1px 14px 0px rgba(151,151,151,0.75)";
    simpleCaptchaRibbon.style.webkitBoxShadow =
      "-2px 1px 14px 0px rgba(151,151,151,0.75)";
    simpleCaptchaRibbon.style.mozBoxShadow =
      "-2px 1px 14px 0px rgba(151,151,151,0.75)";

    switch (ribbonConfig.position) {
      case "top-left":
        simpleCaptchaRibbon.style.top = "0";
        simpleCaptchaRibbon.style.left = "25px";
        break;
      case "top-right":
        simpleCaptchaRibbon.style.top = "0";
        simpleCaptchaRibbon.style.right = "25px";
        break;
      case "bottom-left":
        simpleCaptchaRibbon.style.bottom = "0";
        simpleCaptchaRibbon.style.left = "25px";
        break;
      case "bottom-right":
        simpleCaptchaRibbon.style.bottom = "0";
        simpleCaptchaRibbon.style.right = "25px";
        break;
      default:
        simpleCaptchaRibbon.style.bottom = "0";
        simpleCaptchaRibbon.style.right = "25px";
    }

    const ribbonText = document.createElement("a");
    ribbonText.href = ribbonConfig.link;
    ribbonText.target = "_blank";
    ribbonText.textContent = ribbonConfig.title;
    ribbonText.style.color = "black";
    ribbonText.style.fontFamily = "sans-serif";
    ribbonText.style.fontWeight = "700";
    ribbonText.style.textDecoration = "none";
    ribbonText.style.fontSize = "13px";

    simpleCaptchaRibbon.appendChild(ribbonText);

    if (ribbonConfig.icon) {
      const captchaImage = document.createElement("img");
      captchaImage.src = "/assets/img/icon.svg";
      captchaImage.alt = "CAPTCHA Icon";
      captchaImage.style.width = "15px"; // Changed from style to style.width
      simpleCaptchaRibbon.appendChild(captchaImage);
    }

    const body = document.body;
    if (ribbonConfig.display) {
      if (
        ribbonConfig.position === "bottom-right" ||
        ribbonConfig.position === "bottom-left"
      ) {
        body.insertBefore(simpleCaptchaRibbon, body.firstChild);
      } else {
        body.appendChild(simpleCaptchaRibbon);
      }
    }
  }
}
