var simpleCaptchaRibbon = document.createElement("div");

simpleCaptchaRibbon.id = "simple-captcha-ribbon";
simpleCaptchaRibbon.className = "simple-captcha-ribbon";

var captchaImage = document.createElement("img");
captchaImage.src = "/wp-content/plugins/simple-captcha/assets/img/simple-recaptcha.png"; // Provide the path to your image

var ribbonText = document.createElement("a");
ribbonText.href = 'https://github.com/iietmoon/simple-captcha'
ribbonText.target = '_blank'
ribbonText.textContent = "Protected by Simple CAPTCHA!";

simpleCaptchaRibbon.appendChild(captchaImage);
simpleCaptchaRibbon.appendChild(ribbonText);

var body = document.getElementsByTagName("body")[0];
body.insertBefore(simpleCaptchaRibbon, body.firstChild);
