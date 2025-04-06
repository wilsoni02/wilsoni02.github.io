import { ConfigSingleton } from "./GetProfile.js";

// Load profile data and update Experience page
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

  // General Experience Text
  document.querySelector("#pfExpText").innerHTML = configData.Experience.ExperienceText;

  // Education Section
  document.querySelector("#expEdu > h2").innerHTML = "Education";
  document.querySelector("#pfSchool").innerHTML = configData.Experience.School;
  document.querySelector("#pfMajor").innerHTML = configData.Experience.Major;
  document.querySelector("#pfGraduation").innerHTML = configData.Experience.Graduation;
  document.querySelector("#pfEducationText").innerHTML = configData.Experience.EducationText;

  // Employment Section
  document.querySelector("#expEmp > h2").innerHTML = "Employment";
  document.querySelector("#pfEmployment").innerHTML = configData.Experience.Employment;
  document.querySelector("#pfRole").innerHTML = configData.Experience.Role;
  document.querySelector("#pfEmploymentText").innerHTML = configData.Experience.EmploymentText;

  // Internship Section (Certification & Training)
  if (configData.Experience.Internship) {
    document.querySelector("#pfInternshipCompany").innerHTML = configData.Experience.Internship.Company;
    document.querySelector("#pfInternshipRole").innerHTML = configData.Experience.Internship.Role;
    document.querySelector("#pfInternshipDesc").innerHTML = configData.Experience.Internship.Description;
  } else {
    document.querySelector("#expInternship").style.display = "none";
  }

  // Skills Section
  document.querySelector("#expSkills > h2").innerHTML = "Skills";
  document.querySelector("#pfSkills").innerHTML = configData.Experience.Skills.toString();
  document.querySelector("#pfSkillsText").innerHTML = configData.Experience.SkillsText;

  // Resume Button
  document.querySelector("#pfResume").onclick = () => {
    let url = "./Content/".concat(configData.Experience.Resume);
    window.open(url, "_blank");
  }

  // Add fade-in animation to experience sections and page title
  document.querySelectorAll('.experience-section, .page-title').forEach(el => {
    el.classList.add('fade-in');
  });
}
