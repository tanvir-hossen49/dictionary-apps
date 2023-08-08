const userInputEl = document.getElementById("input-field");

//find targeted object
const findTargetObject = userInput => {
  const matchingWord = dictionary.find(word => userInput === word.en);

  if (matchingWord) {
    showDOM(matchingWord);
  } else {
    showError(userInput);
  }
};

// show user search value into dom
const showDOM = targetOBJ => {
  const meaningEL = document.getElementById("meaning"),
    sentenceEle = document.getElementById("example"),
    banglaSynonyms = document.getElementById("synonymsBangla"),
    englishSynonyms = document.getElementById("synonymsEnglish"),
    errorContainer = document.querySelector(".error"),
    showDetailsEl = document.querySelector(".show-details"),
    userInputEl = document.getElementById("input-field");

  errorContainer.style.display = "none";
  showDetailsEl.classList.add("active");

  meaningEL.innerHTML = targetOBJ.bn;
  sentenceEle.innerHTML = targetOBJ.sents
    .map(sentence => `${sentence} <br>`)
    .join("");

  banglaSynonyms.innerHTML = targetOBJ.bn_syns
    .map(syns => `<p>${syns} <br> </p>`)
    .join("");

  englishSynonyms.innerHTML = targetOBJ.en_syns
    .map(syns => `<p><a href='#'>${syns}</a> <br> </p>`)
    .join("");

  englishSynonyms.querySelectorAll("a").forEach(ele => {
    ele.addEventListener("click", e => {
      e.preventDefault();

      let userText = ele.textContent.trim();
      userInputEl.value = userText;
      findTargetObject(userText);
    });
  });
};

// show error when data no found
const showError = userInput => {
  const errorContainer = document.querySelector(".error"),
    showDetailsEl = document.querySelector(".show-details");

  showDetailsEl.classList.remove("active");

  errorContainer.style.display = "block";
  errorContainer.innerHTML = `
        <span class='error-text'>"${userInput}" not found</span>
    `;
};

// chen user hit enter or not
const pressEnter = e => {
  if (e.key === "Enter") {
    let userValue = e.target.value.toLowerCase();
    findTargetObject(userValue);
    e.target.value = "";
  }
};

userInputEl.addEventListener("keyup", pressEnter);
