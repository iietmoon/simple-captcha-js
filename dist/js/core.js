var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function captchaValues() {
  var value1 = getRandomNumber(1, 9);
  var value2 = getRandomNumber(1, 9);
  return { value1: value1, value2: value2 };
}
function captchaValidity() {
  return true;
}
var defaultCSSClasses = {
  ribbon: {},
  captcha: {
    container: "simple-captcha-container",
    values: "simple-captcha-value",
    input: "simple-captcha-input",
    flag: "simple-captcha-flag",
  },
};
var SimpleCaptcha = /** @class */ (function () {
  function SimpleCaptcha() {}
  SimpleCaptcha.prototype.ribbon = function (config) {
    var defaultConfig = {
      display: true,
      title: "Website protected!",
      icon: true,
      position: "bottom-right",
      link: "https://iietmoon.github.io/simple-captcha-js",
    };
    var ribbonConfig = __assign(__assign({}, defaultConfig), config);
    var simpleCaptchaRibbon = document.createElement("div");
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
    var ribbonText = document.createElement("a");
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
      var captchaImage = document.createElement("img");
      captchaImage.src = "/assets/img/icon.svg";
      captchaImage.alt = "CAPTCHA Icon";
      captchaImage.style.width = "15px"; // Changed from style to style.width
      simpleCaptchaRibbon.appendChild(captchaImage);
    }
    var body = document.body;
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
  };
  SimpleCaptcha.prototype.captcha = function (config) {
    var form = document.getElementById(
      config === null || config === void 0 ? void 0 : config.formId,
    );
    if (!form) {
      console.error("Form not found");
      return;
    }
    var submitButton = form.querySelector('input[type="submit"]');
    if (!submitButton) {
      console.error("Submit button not found");
      return;
    }
    var captchaContainer = document.createElement("div");
    captchaContainer.className = defaultCSSClasses.captcha.container;
    var spanElement = document.createElement("span");
    var captchaValuesResult = captchaValues(); // Call captchaValues() once
    spanElement.textContent = ""
      .concat(captchaValuesResult.value1, " + ")
      .concat(captchaValuesResult.value2, " = ");
    spanElement.className = defaultCSSClasses.captcha.values;
    var inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.className = defaultCSSClasses.captcha.input;
    var refreshElement = document.createElement("img");
    refreshElement.src = "/assets/img/arrow-clockwise.svg";
    refreshElement.width = 20;
    refreshElement.style.cursor = "pointer";
    refreshElement.addEventListener("click", function () {
      var newValues = captchaValues();
      inputElement.value = "";
      spanElement.textContent = ""
        .concat(newValues.value1, " + ")
        .concat(newValues.value2, " = ");
    });
    var flagElement = document.createElement("span");
    flagElement.className = defaultCSSClasses.captcha.flag;
    flagElement.textContent = "Please verify that you're not a robot!";
    captchaContainer.appendChild(spanElement);
    captchaContainer.appendChild(inputElement);
    captchaContainer.appendChild(refreshElement);
    captchaContainer.appendChild(flagElement);
    form.insertBefore(captchaContainer, submitButton);
    submitButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
      if (captchaValidity()) {
        // @ts-ignore
        form.submit();
      }
    });
  };
  SimpleCaptcha.prototype.init = function (config) {
    console.log(config);
    this.ribbon(config === null || config === void 0 ? void 0 : config.ribbon);
    if (config === null || config === void 0 ? void 0 : config.captcha) {
      this.captcha(
        config === null || config === void 0 ? void 0 : config.captcha,
      );
    }
  };
  return SimpleCaptcha;
})();
