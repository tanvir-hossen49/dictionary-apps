window.onload = () => {
    main()
}

//main function
function main() {
    const userInputEl = document.getElementById('input-field');

    userInputEl.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            let userValue = e.target.value.toLowerCase();
            findTargetObject(userValue);
            e.target.value = '';
        }
    });
}

//find targeted object 
function findTargetObject(userInput) {
    for (let i = 0; i < dictionary.length; i++) {
        if (userInput === dictionary[i].en) {
            showDOM(dictionary[i]);
            return;
        } else {
            showError(userInput);
        }
    }
}
// show user search value into dom
function showDOM(targetOBJ) {
    console.log(targetOBJ)
    const meaningEL = document.getElementById('meaning'),
        senteceEl = document.getElementById('example'),
        banglaSynonyms = document.getElementById('synonymsBangla'),
        englishSynonyms = document.getElementById('synonymsEnglish'),
        errorContainer = document.querySelector('.error');
    showDetailsEl = document.querySelector('.show-details'),
        userInputEl = document.getElementById('input-field');

    errorContainer.style.display = 'none';
    showDetailsEl.classList.add('active');

    meaningEL.innerHTML = targetOBJ.bn;
    senteceEl.innerHTML = '';

    targetOBJ.sents.forEach(sentence => {
        senteceEl.innerHTML += `${sentence} <br>`;
    });

    targetOBJ.bn_syns.forEach(syns => {
        banglaSynonyms.innerHTML += `
            <p>${syns} <br> </p>
        `;
    })

    targetOBJ.en_syns.forEach(syns => {
        englishSynonyms.innerHTML += `
            <p><a href='#'>${syns}</a> <br> </p>
        `;
    });

    [...englishSynonyms.children].forEach(ele => {
        ele.addEventListener('click', function (e) {
            let userText = ele.textContent.trim();
            userInputEl.value = userText;
            findTargetObject(userText)
        })
    })
}
// show error when data no found
function showError(userInput) {
    const errorContainer = document.querySelector('.error'),
        showDetailsEl = document.querySelector('.show-details');

    showDetailsEl.classList.remove("active")

    errorContainer.style.display = 'block'
    errorContainer.innerHTML = `
        <span class='error-text'>"${userInput}" not found</span>
    `;
}