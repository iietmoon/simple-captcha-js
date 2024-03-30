const defaultCSSClasses = {
  main: "scjs",
  ribbon: {
    container: "scjs-ribbon-container",
  },
  captcha: {
    main: "scjs",
    container: "scjs-captcha-container",
    values: "scjs-captcha-value",
    input: "scjs-captcha-input",
    flag: "scjs-captcha-flag",
  },
};
class Utils {
  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = this.getRandomNumber(0, characters.length - 1);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
}
class CaptchaGenerator {
  static textCaptcha(id, difficulty) {
    console.log(difficulty);
    const difficultyDispatcher = {
      easy: 6,
      medium: 10,
      strong: 14,
    };
    const targetCaptcha = document.getElementById(id);
    if (targetCaptcha) {
      const captchaValueElement = document.createElement("span");
      captchaValueElement.id = id + "-value";
      captchaValueElement.className = defaultCSSClasses.captcha.values;
      captchaValueElement.textContent = Utils.generateRandomString(
        difficultyDispatcher[difficulty],
      );
      const captchaInputElement = document.createElement("input");
      captchaInputElement.id = id + "-input";
      captchaInputElement.className = defaultCSSClasses.captcha.input;
      captchaInputElement.type = "text";
      targetCaptcha.appendChild(captchaValueElement);
      targetCaptcha.appendChild(captchaInputElement);
    } else {
      console.error("Target captcha not found");
    }
    return "GeneratedTextCaptcha";
  }
  // Image Recognition CAPTCHA
  static imageCaptcha(width, height) {
    // Logic to generate an image-based CAPTCHA with specified width and height
    return "GeneratedImageCaptcha";
  }
  // Audio CAPTCHA
  static audioCaptcha(length) {
    // Logic to generate an audio-based CAPTCHA of specified length
    return "GeneratedAudioCaptcha";
  }
  // Mathematical CAPTCHA
  static mathCaptcha() {
    // Logic to generate a mathematical CAPTCHA
    return "GeneratedMathCaptcha";
  }
  // Checkbox CAPTCHA
  static checkboxCaptcha() {
    // Logic to generate a checkbox-based CAPTCHA
    return "GeneratedCheckboxCaptcha";
  }
  // Honeypot CAPTCHA
  static honeypot() {
    // Logic to generate a honeypot-based CAPTCHA
    return "GeneratedHoneypotCaptcha";
  }
}
class captchaValidity {
  static textCaptcha(id) {
    const targetCaptcha = document.getElementById(id);
    if (!targetCaptcha) {
      console.error("Can't valid the captcha since not found in target!");
    }
    //const captchaValue
    return false;
  }
  // Image Recognition CAPTCHA
  static imageCaptcha(width, height) {
    // Logic to generate an image-based CAPTCHA with specified width and height
    return true;
  }
  // Audio CAPTCHA
  static audioCaptcha(length) {
    // Logic to generate an audio-based CAPTCHA of specified length
    return true;
  }
  // Mathematical CAPTCHA
  static mathCaptcha() {
    // Logic to generate a mathematical CAPTCHA
    return true;
  }
  // Checkbox CAPTCHA
  static checkboxCaptcha() {
    // Logic to generate a checkbox-based CAPTCHA
    return true;
  }
  // Honeypot CAPTCHA
  static honeypot() {
    // Logic to generate a honeypot-based CAPTCHA
    return true;
  }
}
class SimpleCaptcha {
  constructor() {}
  ribbon(config) {
    const defaultConfig = {
      display: true,
      title: "Website protected!",
      icon: true,
      position: "bottom-right",
      link: "https://iietmoon.github.io/simple-captcha-js",
    };
    const ribbonConfig = Object.assign(
      Object.assign({}, defaultConfig),
      config,
    );
    const simpleCaptchaRibbon = document.createElement("div");
    simpleCaptchaRibbon.id = "simple-captcha-ribbon";
    simpleCaptchaRibbon.className = defaultCSSClasses.main;
    simpleCaptchaRibbon.classList.add(defaultCSSClasses.ribbon.container);
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
  captcha(config) {
    const {
      formId,
      display,
      alghorithm,
      difficulty = "medium",
      classes,
    } = config;
    if (display === false) {
      return;
    }
    const targetForm = document.getElementById(formId);
    if (!targetForm) {
      console.error(`Form (${formId}) not found!`);
      return;
    }
    const submitButton = targetForm.querySelector(
      'input[type="submit"], button[type="submit"]',
    );
    if (!submitButton) {
      console.error(`Submit button not found in (${formId})`);
      return;
    }
    const captchaId = Utils.generateRandomString(8);
    const captchaContainer = document.createElement("div");
    captchaContainer.className = defaultCSSClasses.main;
    captchaContainer.id = captchaId;
    captchaContainer.classList.add(defaultCSSClasses.captcha.container);
    targetForm.insertBefore(captchaContainer, submitButton);
    CaptchaGenerator.textCaptcha(captchaId, difficulty);
    submitButton.addEventListener("click", function (event) {
      event.preventDefault();
      if (captchaValidity.textCaptcha(captchaId)) {
        targetForm.submit();
      }
      console.log("try to submit " + formId);
      return;
    });
  }
  init(config) {
    this.ribbon(config === null || config === void 0 ? void 0 : config.ribbon);
    if (config === null || config === void 0 ? void 0 : config.captcha) {
      if (Array.isArray(config.captcha)) {
        config.captcha.forEach((element) => {
          this.captcha(element);
        });
      } else if (typeof config.captcha === "object") {
        this.captcha(config.captcha);
      } else {
        console.log("config.captcha is neither an array nor an object");
      }
    }
  }
}
