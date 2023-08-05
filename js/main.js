const userInputEl = document.getElementById("input-field");

//find targeted object
const findTargetObject = userInput => {
  for (let word of dictionary) {
    if (userInput === word.en) {
      showDOM(word);
      return;
    } else {
      showError(userInput);
    }
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
  sentenceEle.innerHTML = "";

  targetOBJ.sents.forEach(sentence => {
    sentenceEle.innerHTML += `${sentence} <br>`;
  });

  targetOBJ.bn_syns.forEach(syns => {
    banglaSynonyms.innerHTML += `
            <p>${syns} <br> </p>
        `;
  });

  targetOBJ.en_syns.forEach(syns => {
    englishSynonyms.innerHTML += `
            <p><a href='#'>${syns}</a> <br> </p>
        `;
  });

  [...englishSynonyms.children].forEach(ele => {
    ele.addEventListener("click", e => {
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
