class SimpleCaptcha {
  constructor() {
    // Initialize SimpleCaptcha instance
  }

  ribbon(config) {
    // Create a new div element for the protection ribbon
    const simpleCaptchaRibbon = document.createElement("div");

    simpleCaptchaRibbon.id = "simple-captcha-ribbon";
    simpleCaptchaRibbon.className = "simple-captcha-ribbon";

    // Create an anchor element for the text
    const ribbonText = document.createElement("a");
    ribbonText.href = config.link;
    ribbonText.target = "_blank";
    ribbonText.textContent = config.title;

    // Append the text element to the protection ribbon div
    simpleCaptchaRibbon.appendChild(ribbonText);

    if (config.icon) {
      // Create an img element for the image
      const captchaImage = document.createElement("img");
      captchaImage.src = "/assets/img/icon.svg";
      captchaImage.alt = "CAPTCHA Icon";
      // Append the image element to the protection ribbon div
      simpleCaptchaRibbon.appendChild(captchaImage);
    }

    // Determine position for the protection ribbon
    const body = document.getElementsByTagName("body")[0];
    if (config.position === "bottom-left") {
      body.insertBefore(simpleCaptchaRibbon, body.firstChild);
    } else {
      body.appendChild(simpleCaptchaRibbon);
    }
  }
}
