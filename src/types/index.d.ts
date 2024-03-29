export interface DefaultCSSClasses {
  ribbon: Record<string, any>;
  captcha: {
    container: string;
    values: string;
    input: string;
    flag: string;
  };
}

export interface RibbonConfig {
  display?: boolean;
  title?: string;
  icon?: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  link?: string;
}

export interface CaptchaConfig {
  formId?: string;
}
