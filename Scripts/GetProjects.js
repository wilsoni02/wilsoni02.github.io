import { ConfigSingleton } from "./GetProfile.js";

let configData;

(async () => {
  try {
    const configInstance = await ConfigSingleton.getInstance();
    configData = configInstance.getConfig();
    updateHTML(configData);
  } catch (error) {
    console.error('Error:', error);
  }
})();

function updateHTML(configData) {
  document.querySelector("#pfThumbnail").src = "Content/".concat(configData.About.Thumbnail);
  document.querySelector("#pfLinkedIn").href = configData.Contact.LinkedIn;
  document.querySelector("#pfGitHub").href = configData.Contact.GitHub;

  // Project 1 - WinterArk
  if (configData.Project1.Title) {
    document.querySelector("#pfProject1Img").src = "Content/".concat(configData.Project1.MainImage);
    document.querySelector("#pfProject1Title").innerHTML = configData.Project1.Title;
    document.querySelector("#pfProject1Course").textContent = configData.Project1.Course;
    document.querySelector("#pfProject1Period").textContent = configData.Project1.Period;
    const proj1DescEl = document.querySelector("#pfProject1Desc");
    const shortDesc = configData.Project1.Desc;
    const fullDesc  = configData.Project1.FullDesc;
    proj1DescEl.textContent = shortDesc;
    const readMoreBtn = document.createElement("button");
    readMoreBtn.textContent = "Read More";
    readMoreBtn.classList.add("read-more-btn");
    readMoreBtn.onclick = () => {
      proj1DescEl.textContent = fullDesc;
      readMoreBtn.style.display = "none";
    };
    proj1DescEl.after(readMoreBtn);

    if (configData.Project1.ProjectType) {
      let metaText = configData.Project1.ProjectType;
      if (configData.Project1.ProjectType.toLowerCase() === "team" && configData.Project1.TeamRole) {
        metaText += " - Role: " + configData.Project1.TeamRole;
      }
      document.querySelector("#pfProject1Meta").innerHTML = metaText;
    }
    document.querySelector("#pfProject1Repo").href = configData.Project1.GitHubRepo;
    if (!configData.Project1.GitHubRepo) {
      document.querySelector("#pfProject1Repo").style.display = "none";
    }
    if (configData.Project1.DetailImages.length < 1) {
      document.querySelector("#openProject1").style.display = "none";
    }
  } else {
    document.querySelector("#project1").style.display = "none";
  }

  // Project 2
  if (configData.Project2.Title) {
    document.querySelector("#pfProject2Img").src = "Content/".concat(configData.Project2.MainImage);
    document.querySelector("#pfProject2Title").innerHTML = configData.Project2.Title;
    document.querySelector("#pfProject2Course").textContent = configData.Project2.Course;
    document.querySelector("#pfProject2Period").textContent = configData.Project2.Period;
    document.querySelector("#pfProject2Desc").innerHTML = configData.Project2.Desc;
    if (configData.Project2.ProjectType) {
      let metaText = configData.Project2.ProjectType;
      if (configData.Project2.ProjectType.toLowerCase() === "team" && configData.Project2.TeamRole) {
        metaText += " - Role: " + configData.Project2.TeamRole;
      }
      document.querySelector("#pfProject2Meta").innerHTML = metaText;
    }
    document.querySelector("#pfProject2Repo").href = configData.Project2.GitHubRepo;
    if (!configData.Project2.GitHubRepo) {
      document.querySelector("#pfProject2Repo").style.display = "none";
    }
    // Hide the "See More..." button
    document.querySelector("#openProject2").style.display = "none";
  } else {
    document.querySelector("#project2").style.display = "none";
  }

  // Project 3
  if (configData.Project3.Title) {
    document.querySelector("#pfProject3Img").src = "Content/".concat(configData.Project3.MainImage);
    document.querySelector("#pfProject3Title").innerHTML = configData.Project3.Title;
    document.querySelector("#pfProject3Course").textContent = configData.Project3.Course;
    document.querySelector("#pfProject3Period").textContent = configData.Project3.Period;
    document.querySelector("#pfProject3Desc").innerHTML = configData.Project3.Desc;
    if (configData.Project3.ProjectType) {
      let metaText = configData.Project3.ProjectType;
      if (configData.Project3.ProjectType.toLowerCase() === "team" && configData.Project3.TeamRole) {
        metaText += " - Role: " + configData.Project3.TeamRole;
      }
      document.querySelector("#pfProject3Meta").innerHTML = metaText;
    }
    document.querySelector("#pfProject3Repo").href = configData.Project3.GitHubRepo;
    if (!configData.Project3.GitHubRepo) {
      document.querySelector("#pfProject3Repo").style.display = "none";
    }
    // Hide the "See More..." button
    document.querySelector("#openProject3").style.display = "none";
  } else {
    document.querySelector("#project3").style.display = "none";
  }

  // Project 4
  if (configData.Project4.Title) {
    document.querySelector("#pfProject4Img").src = "Content/".concat(configData.Project4.MainImage);
    document.querySelector("#pfProject4Title").innerHTML = configData.Project4.Title;
    document.querySelector("#pfProject4Course").textContent = configData.Project4.Course;
    document.querySelector("#pfProject4Period").textContent = configData.Project4.Period;
    document.querySelector("#pfProject4Desc").innerHTML = configData.Project4.Desc;
    if (configData.Project4.ProjectType) {
      let metaText = configData.Project4.ProjectType;
      if (configData.Project4.ProjectType.toLowerCase() === "team" && configData.Project4.TeamRole) {
        metaText += " - Role: " + configData.Project4.TeamRole;
      }
      document.querySelector("#pfProject4Meta").innerHTML = metaText;
    }
    document.querySelector("#pfProject4Repo").href = configData.Project4.GitHubRepo;
    if (!configData.Project4.GitHubRepo) {
      document.querySelector("#pfProject4Repo").style.display = "none";
    }
    // Hide the "See More..." button
    document.querySelector("#openProject4").style.display = "none";
  } else {
    document.querySelector("#project4").style.display = "none";
  }

  // Add fade-in animation to each project element
  document.querySelectorAll('.project').forEach(el => {
    el.classList.add('fade-in');
  });
}

// Carousel functions
function addImages(imgs) {
  const il = document.querySelector("#imgList");
  while (il.firstChild) {
    il.removeChild(il.firstChild);
  }
  imgs.forEach(img => {
    addListItem(img);
  });
}

function addListItem(newImg) {
  const newElem = document.createElement("img");
  newElem.setAttribute("src", "Content/".concat(newImg));
  const il = document.querySelector("#imgList");
  il.appendChild(newElem);
}

let slideIdx = 1;
document.querySelector("#next").onclick = () => {
  showImages(++slideIdx);
}
document.querySelector("#prev").onclick = () => {
  showImages(--slideIdx);
}

function showImages(n) {
  const slides = document.querySelectorAll("#imgList > img");
  if (n > slides.length) { slideIdx = 1; }
  if (n < 1) { slideIdx = slides.length; }
  slides.forEach(slide => slide.style.display = "none");
  if (slides[slideIdx - 1]) {
    slides[slideIdx - 1].style.display = "block";
  }
}

document.querySelector("#openProject1").onclick = () => {
  addImages(configData.Project1.DetailImages);
  document.querySelector("#modalPage").style.display = "block";
  slideIdx = 1;
  showImages(slideIdx);
}

document.querySelector("#openProject2").onclick = () => {
  // This function will not be called since the button is hidden.
  addImages(configData.Project2.DetailImages);
  document.querySelector("#modalPage").style.display = "block";
  slideIdx = 1;
  showImages(slideIdx);
}

document.querySelector("#openProject3").onclick = () => {
  // This function will not be called since the button is hidden.
  addImages(configData.Project3.DetailImages);
  document.querySelector("#modalPage").style.display = "block";
  slideIdx = 1;
  showImages(slideIdx);
}

document.querySelector("#openProject4").onclick = () => {
  // This function will not be called since the button is hidden.
  addImages(configData.Project4.DetailImages);
  document.querySelector("#modalPage").style.display = "block";
  slideIdx = 1;
  showImages(slideIdx);
}

document.querySelector("#XOut").onclick = () => {
  document.querySelector("#modalPage").style.display = "none";
}

window.onclick = (event) => {
  if (event.target == document.querySelector("#modalPage")) {
    document.querySelector("#modalPage").style.display = "none";
  }
}
