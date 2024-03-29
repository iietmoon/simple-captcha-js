
interface DefaultCSSClasses {
  ribbon: Record<string, any>;
  captcha: {
    container: string;
    values: string;
    input: string;
    flag: string;
  };
}

interface RibbonConfig {
  display?: boolean;
  title?: string;
  icon?: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  link?: string;
}

interface CaptchaConfig {
  formId?: string;
}

console.log("This test from typescript")
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function captchaValues(): { value1: number, value2: number } {
  const value1: number = getRandomNumber(1, 9);
  const value2: number = getRandomNumber(1, 9);
  return { value1, value2 };
}

function captchaValidity():boolean {
  return true;
}

const defaultCSSClasses: DefaultCSSClasses = {
  ribbon: {},
  captcha: {
    container: "simple-captcha-container",
    values: "simple-captcha-value",
    input: "simple-captcha-input",
    flag: "simple-captcha-flag",
  },
};

class SimpleCaptcha {
  constructor() {}

  ribbon(config: RibbonConfig): void {
    const defaultConfig: RibbonConfig = {
      display: true,
      title: "Website protected!",
      icon: true,
      position: "bottom-right",
      link: "https://iietmoon.github.io/simple-captcha-js",
    };

    const ribbonConfig: RibbonConfig = { ...defaultConfig, ...config };

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

  captcha(config: CaptchaConfig): void {
    const form = document.getElementById(config?.formId);
    if (!form) {
      console.error("Form not found");
      return;
    }

    const submitButton = form.querySelector('input[type="submit"]');
    if (!submitButton) {
      console.error("Submit button not found");
      return;
    }

    const captchaContainer = document.createElement("div");
    captchaContainer.className = defaultCSSClasses.captcha.container;

    const spanElement = document.createElement("span");
    const captchaValuesResult = captchaValues(); // Call captchaValues() once
    spanElement.textContent = `${captchaValuesResult.value1} + ${captchaValuesResult.value2} = `;
    spanElement.className = defaultCSSClasses.captcha.values;

    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.className = defaultCSSClasses.captcha.input;

    const refreshElement = document.createElement("img");
    refreshElement.src = "/assets/img/arrow-clockwise.svg";
    refreshElement.width = 20;
    refreshElement.style.cursor = "pointer";
    refreshElement.addEventListener("click", function () {
      const newValues = captchaValues();
      inputElement.value = "";
      spanElement.textContent = `${newValues.value1} + ${newValues.value2} = `;
    });

    const flagElement = document.createElement("span");
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
  }

  init(config: any): void {
    console.log(config);
    this.ribbon(config?.ribbon);
    if (config?.captcha) {
      this.captcha(config?.captcha);
    }
  }
}