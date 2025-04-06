import { ConfigSingleton } from "./GetProfile.js";

// Load profile data and update About page
(async () => {
  try {
    const configInstance = await ConfigSingleton.getInstance();
    updateHTML(configInstance.getConfig());
  } catch (error) {
    console.error('Error:', error);
  }
})();

function updateHTML(configData) {
  document.querySelector("#pfThumbnail").src = "Content/".concat(configData.About.Thumbnail);
  document.querySelector("#pfLinkedIn").href = configData.Contact.LinkedIn;
  document.querySelector("#pfGitHub").href = configData.Contact.GitHub;

  document.querySelector("#pfHeadshot").src = "Content/".concat(configData.About.Headshot);
  document.querySelector("#pfAboutName").innerHTML = configData.About.Name;
  // New: Display Major and Graduation as subtitle
  document.querySelector("#pfAboutSubTitle").innerHTML = configData.About.Major + " | Expected Graduation: " + configData.About.Graduation;
  document.querySelector("#pfAboutTitle").innerHTML = configData.About.Currently;
  document.querySelector("#pfAboutDesc").innerHTML = configData.About.AboutText;
  document.querySelector("#pfEmail").href = "mailto:".concat(configData.Contact.EMail);
  document.querySelector("#pfEmail").innerHTML = configData.Contact.EMail;
  if (configData.Contact.Phone) {
    document.querySelector("#pfPhone").href = "tel:".concat(configData.Contact.Phone);
    document.querySelector("#pfPhone").innerHTML = configData.Contact.Phone;
  } else {
    document.querySelector("#elPhone").style.display = "none";
  }

  // Add fade-in animation to about header and sections
  document.querySelectorAll('.about-header, .about-section').forEach(el => {
    el.classList.add('fade-in');
  });
}
