class SimpleCaptcha {
    constructor() {
        // Initialize SimpleCaptcha instance
    }

    ribbon(config) {
        // Create a new div element for the protection ribbon
        const simpleCaptchaRibbon = document.createElement("div");

        // Set attributes for the protection ribbon div
        simpleCaptchaRibbon.id = "simple-captcha-ribbon";
        simpleCaptchaRibbon.className = "simple-captcha-ribbon";

        // Create an img element for the image
        const captchaImage = document.createElement("img");
        captchaImage.src = config.iconSrc; // Provide the path to your image

        // Create an anchor element for the text
        const ribbonText = document.createElement("a");
        ribbonText.href = config.link;
        ribbonText.target = '_blank';
        ribbonText.textContent = config.title;

        // Append the image and text elements to the protection ribbon div
        simpleCaptchaRibbon.appendChild(captchaImage);
        simpleCaptchaRibbon.appendChild(ribbonText);

        // Determine position for the protection ribbon
        const body = document.getElementsByTagName("body")[0];
        if (config.position === 'bottom-left') {
            body.insertBefore(simpleCaptchaRibbon, body.firstChild);
        } else {
            body.appendChild(simpleCaptchaRibbon);
        }
    }
}

const captcha = new SimpleCaptcha();

captcha.ribbon({
    title: "Website protected!",
    iconSrc: "/wp-content/plugins/simple-captcha/assets/img/simple-recaptcha.png",
    link: 'https://github.com/iietmoon/simple-captcha',
    position: 'bottom-left'
});
