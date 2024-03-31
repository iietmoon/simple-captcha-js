interface DefaultCSSClasses {
  main: string;
  ribbon: Record<string, any>;
  captcha: Record<string, any>;
}

interface RibbonConfig {
  display?: boolean;
  title?: string;
  icon?: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  link?: string;
}

interface CaptchaConfig {
  formId: string;
  display?: boolean;
  alghorithm?:
    | "text-based"
    | "image-recognition"
    | "audio-based"
    | "checkbox"
    | "mathematical"
    | "honeypot";
  difficulty?: "easy" | "medium" | "strong";
  classes?: any;
}

const defaultCSSClasses: DefaultCSSClasses = {
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
  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = this.getRandomNumber(0, characters.length - 1);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  static getRandomHexColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  static generateImageElement(value: string): HTMLImageElement {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const fontSize = 13;
    const fontFamily = "Arial";
    ctx.font = `${fontSize}px ${fontFamily}`;

    const textWidth = ctx.measureText(value).width;

    canvas.width = textWidth + 30;
    canvas.height = fontSize + 30;

    ctx.fillStyle = this.getRandomHexColor(); // Set background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000"; // Set text color
    ctx.textBaseline = "middle"; // Set text baseline to middle for vertical centering
    ctx.font = `${fontSize}px ${fontFamily}`; // Set font size again before drawing text
    ctx.fillText(value, 15, canvas.height / 2); // Adjust the x position for horizontal centering

    const dataURL = canvas.toDataURL(); // Convert canvas to data URL
    const imgElement = document.createElement("img");
    imgElement.src = dataURL;
    return imgElement;
  }
}

class CaptchaValue {
  static textCaptcha: string = "";
  static imageCaptcha: string = "";
  static audioCaptcha: any = "";
  static mathCaptcha: Record<string, any> = {};
  static checkboxCaptcha: boolean = false;
  static honeypot: boolean = false;

  static set(name: keyof CaptchaValue, value: any): void {
    (this as any)[name] = value;
  }

  static get(name: keyof CaptchaValue): any {
    return (this as any)[name];
  }
}

class CaptchaGenerator {
  static textCaptchaValue: string = "";
  static imageCaptchaValue: string = "";
  static audioCaptchaValue: any = "";
  static mathCaptchaValue: Object = {};
  static checkboxCaptchaValue: boolean = false;
  static honeypotValue: boolean = false;

  static textCaptcha(
    id: string,
    difficulty: "easy" | "medium" | "strong"
  ): string {
    const difficultyDispatcher = {
      easy: 6,
      medium: 10,
      strong: 14,
    };

    const generatedValue = Utils.generateRandomString(
      difficultyDispatcher[difficulty]
    );
    if(!generatedValue){
      return;
    }
    this.textCaptchaValue = generatedValue;

    const targetCaptcha = document.getElementById(id);

    if (targetCaptcha) {
      const captchaValueElement = document.createElement("span");
      captchaValueElement.id = id + "-value";
      captchaValueElement.className = defaultCSSClasses.captcha.values;
      const imgElement = Utils.generateImageElement(generatedValue);
      captchaValueElement.appendChild(imgElement);

      const captchaInputElement = document.createElement("input");
      captchaInputElement.id = id + "-input";
      captchaInputElement.className = defaultCSSClasses.captcha.input;
      captchaInputElement.type = "text";
      captchaInputElement.placeholder = "Type the answer!";

      const captchaRfresh = document.createElement("img");
      captchaRfresh.src = "/assets/img/icon.svg";
      captchaRfresh.alt = "CAPTCHA Icon";
      captchaRfresh.style.width = "15px"; // Changed from style to style.width

      targetCaptcha.appendChild(captchaValueElement);
      targetCaptcha.appendChild(captchaInputElement);
      targetCaptcha.appendChild(captchaRfresh);
    } else {
      console.error("Target captcha not found");
    }

    return this.textCaptchaValue;
  }
}

class captchaValidity {
  static textCaptcha(id: string): boolean {
    const targetCaptcha = document.getElementById(id);
    if (!targetCaptcha) {
      console.error("Can't valid the captcha since not found in target!");
    }
    //const captchaValue
    return false;
  }

  // Image Recognition CAPTCHA
  static imageCaptcha(width: number, height: number): boolean {
    // Logic to generate an image-based CAPTCHA with specified width and height
    return true;
  }

  // Audio CAPTCHA
  static audioCaptcha(length: number): boolean {
    // Logic to generate an audio-based CAPTCHA of specified length
    return true;
  }

  // Mathematical CAPTCHA
  static mathCaptcha(): boolean {
    // Logic to generate a mathematical CAPTCHA
    return true;
  }

  // Checkbox CAPTCHA
  static checkboxCaptcha(): boolean {
    // Logic to generate a checkbox-based CAPTCHA
    return true;
  }

  // Honeypot CAPTCHA
  static honeypot(): boolean {
    // Logic to generate a honeypot-based CAPTCHA
    return true;
  }
}

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
  captcha(config: CaptchaConfig) {
    const {
      formId,
      display,
      alghorithm,
      difficulty = "medium",
      classes,
    }: CaptchaConfig = config;
    if (display === false) {
      return;
    }
    const targetForm = document.getElementById(formId);
    if (!targetForm) {
      console.error(`Form (${formId}) not found!`);
      return;
    }
    const submitButton = targetForm.querySelector(
      'input[type="submit"], button[type="submit"]'
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
        (targetForm as HTMLFormElement).submit();
      }
      console.log("try to submit " + formId);
      return;
    });
  }
  validity(config: any){
    
  }

  init(config: any): void {
    this.ribbon(config?.ribbon);
    if (config?.captcha) {
      if (Array.isArray(config.captcha)) {
        config.captcha.forEach((element: CaptchaConfig) => {
          this.captcha(element);
          //console.log()
        });
      } else if (typeof config.captcha === "object") {
        this.captcha(config.captcha);
      } else {
        console.log("config.captcha is neither an array nor an object");
      }
    }
  }
}
