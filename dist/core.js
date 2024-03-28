class SimpleCaptcha {
  constructor() {}

  ribbon(config) {
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
    simpleCaptchaRibbon.style.bottom = "0";
    simpleCaptchaRibbon.style.right = "15px";
    simpleCaptchaRibbon.style.gap = "5px";
    simpleCaptchaRibbon.style.boxShadow =
      "-2px 1px 14px 0px rgba(151,151,151,0.75)";
    simpleCaptchaRibbon.style.webkitBoxShadow =
      "-2px 1px 14px 0px rgba(151,151,151,0.75)";
    simpleCaptchaRibbon.style.mozBoxShadow =
      "-2px 1px 14px 0px rgba(151,151,151,0.75)";

    const ribbonText = document.createElement("a");
    ribbonText.href = config.link;
    ribbonText.target = "_blank";
    ribbonText.textContent = config.title;
    ribbonText.style.color = "black";
    ribbonText.style.fontFamily = "sans-serif";
    ribbonText.style.fontWeight = "700";
    ribbonText.style.textDecoration = "none";
    ribbonText.style.fontSize = "13px";

    simpleCaptchaRibbon.appendChild(ribbonText);

    if (config.icon) {
      const captchaImage = document.createElement("img");
      captchaImage.src = "/assets/img/icon.svg";
      captchaImage.alt = "CAPTCHA Icon";
      captchaImage.style = "width: 15px";
      simpleCaptchaRibbon.appendChild(captchaImage);
    }

    const body = document.getElementsByTagName("body")[0];
    if (config.position === "bottom-left") {
      body.insertBefore(simpleCaptchaRibbon, body.firstChild);
    } else {
      body.appendChild(simpleCaptchaRibbon);
    }
  }
}
