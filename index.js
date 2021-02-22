import {
  actionSetA, actionSetB, animalSetA, animalSetB,
  setFood, setClothes, setEmotions, setMovement, cards,
} from './module.js';

const setCards = [actionSetA, actionSetB, animalSetA,
  animalSetB, setFood, setClothes, setEmotions, setMovement];
const categoriesCard = ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Food', 'Clothes', 'Emotions', 'Movement'];
let firstNameCardList;
let soundsGame = [];
let soundCounter = 0;
let gameMistakes = 0;
let gameSounds = [];
let correctCard = false;
const table = document.querySelector('table');
let collectionRepetitions = [];
let countStatistic = false;
const statTable = document.querySelector('.stat-table');
const options = document.querySelector('.options');

const container = document.querySelector('.container');
const header = document.querySelector('.header');
function createHeader() {
  header.innerHTML = `<div class="menu-btn"><div class = "burger-btn"> </div></div>
        <h1 class= "logo"><a href = "#">English for kids</a></h1>
        <div class = "toggler-wrapper"><lable class = "toggle">Train</lable>
        <div><input type="checkbox" id="switch" /><label for="switch">Toggle</label></div>
        <lable class = "toggler">Play</lable></div>
        <ul class ="navigation"></ul> <div class = "burger-overlay"></div>
        <audio class = "correct" src = "./assets/audio/correct.mp3"></audio><audio class = "incorrect" src = "./assets/audio/incorrect.mp3"></audio>`;
}
createHeader();

const scale = document.querySelector('.scale');

const burgerBtn = document.querySelector('.menu-btn');

const navigation = document.querySelector('.navigation');
const fragment = document.createDocumentFragment();
const menuItems = ['Main page', 'Action (set A)', 'Action (set B)',
  'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions', 'Food', 'Movement', 'Statistic'];

menuItems.forEach((menuItem) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  li.appendChild(a);
  a.textContent = menuItem;
  fragment.appendChild(li);
});
navigation.appendChild(fragment);
document.querySelector('.navigation').firstChild.classList.add('active');

const navigationItem = navigation.querySelectorAll('li');
const navigationLink = navigation.querySelectorAll('a');
const burgerOverlay = document.querySelector('.burger-overlay');
const checkbox = document.querySelector('#switch');
const togle = document.querySelector('.toggle');
const toggler = document.querySelector('.toggler');
const btnNewGame = document.querySelector('.btn-play-game');

for (let i = 0; i < navigationItem.length; i += 1) {
  navigationItem[i].classList.add('navigation-item');
}
for (let i = 0; i < navigationLink.length; i += 1) {
  navigationLink[i].classList.add('navigation-link');
}

function setNavigation() {
  header.classList.toggle('open');
  burgerOverlay.classList.toggle('burger-overlay');
  burgerOverlay.classList.toggle('burger-overlay-hidden');
  document.querySelector('body').classList.toggle('stop-scroll');
}
const cardsList = document.querySelector('.cards-list');

function createElements(mycards) {
  for (let i = 0; i < mycards.length; i += 1) {
    cardsList.innerHTML += `<li class = "category"> <div class = "category-img-wrap"><img src="${mycards[i].img}"></div> 
            <div class = "category-content">${mycards[i].name}</div></li>`;
  }
}
createElements(cards);
function createCard(event) {
  if (cardsList.classList.value === 'cards-list') {
    scale.classList.add('hidden');
    btnNewGame.classList.add('hidden');
    btnNewGame.innerHTML = 'New game';
    for (let i = 0; i < event.length; i += 1) {
      cardsList.innerHTML += `<li class = "category"> <div class = "front"> <div class = "category-img-wrap"><img src="${event[i].img}"></div> 
              <div class = "category-content"><span>${event[i].name}</span><audio class = "audio" src = "${event[i].audioSrc}"></audio><button class = "btn-cars-rotate"></button></div></div>`
              + `<div class = "back"><div class = "category-img-wrap"><img src="${event[i].img}"></div> 
              <div class = "category-content"><span>${event[i].translation}</span></div></div></li> `;
    }
  } else {
    for (let i = 0; i < event.length; i += 1) {
      cardsList.innerHTML += `<li class = "category"> <div class = "category-img-wrap"><img src="${event[i].img}"></div><div class = "category-content">
        <audio class = "audio" src = "${event[i].audioSrc}"></audio> <span class = "hidden">${event[i].name}</span></div></li>`;
      if (i === (event.length - 1)) {
        btnNewGame.classList.remove('hidden');
      }
    }
    soundsGame = document.querySelectorAll('.category');
  }
  if (event[0] !== undefined) {
    firstNameCardList = event[0].name;
  }
}

let counter = true;
function playSound(e) {
  const audio = e.querySelector('audio');
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}
const navigationItems = document.querySelectorAll('.navigation-item');
const logo = document.querySelector('.logo');

function setActiveMenuItem(event) {
  for (let i = 0; i < navigationItems.length; i += 1) {
    navigationItems[i].classList.remove('active');
    if (navigationItem[i].lastElementChild.innerHTML === event) {
      navigationItems[i].classList.add('active');
    }
  }
}
function setSoundsGame(event) {
  const audioEvent = event.querySelector('.audio');
  if (counter) {
    cardsList.innerHTML = '';
    const categotyCardValue = event.lastElementChild.innerHTML;
    for (let i = 0; i < cards.length; i += 1) {
      if (cards[i].name === categotyCardValue) {
        createCard(setCards[i]);
        setActiveMenuItem(categotyCardValue);
      }
    }
  } else if (event.querySelector('.audio') !== null && audioEvent.classList.value === 'audio pause') {
    audioEvent.pause();
  } else if (checkbox.checked && (cardsList.querySelector('.category-content').innerHTML !== 'Action (set A)')) {
    audioEvent.pause();
  } else {
    playSound(event);
  }
  counter = false;
}

cardsList.addEventListener('click', (event) => {
  const btn = event.target.closest('button');
  if (!btn) return;
  const li = event.target.closest('li');
  li.classList.add('active');
  li.querySelector('.audio').classList.add('pause');

  li.addEventListener('mouseleave', () => {
    li.classList.remove('active');
    li.querySelector('.audio').classList.remove('pause');
  });
});

burgerBtn.addEventListener('click', () => {
  setNavigation();
});

burgerOverlay.addEventListener('click', () => {
  setNavigation();
});

function clearGameData() {
  btnNewGame.innerHTML = 'New game';
  scale.classList.add('hidden');
  counter = true;
  gameSounds = [];
  soundCounter = 0;
  gameMistakes = 0;
  btnNewGame.classList.add('hidden');
  cardsList.innerHTML = '';
  scale.innerHTML = '';
  btnNewGame.innerHTML = 'New game';
  statTable.classList.add('hidden');
  options.classList.add('hidden');
}
logo.addEventListener('click', () => {
  clearGameData();
  createElements(cards);
  for (let i = 0; i < navigationItems.length; i += 1) {
    navigationItems[i].classList.remove('active');
    if (navigationItems[i].firstChild.innerHTML === 'Main page') {
      navigationItems[i].classList.add('active');
    }
  }
  if (checkbox.checked) {
    btnNewGame.classList.add('hidden');
  }
});

function setNavigationItem(li) {
  for (let i = 0; i < navigationItems.length; i += 1) {
    navigationItems[i].classList.remove('active');
  }
  li.classList.add('active');
  counter = true;
  if (li.firstChild.innerHTML === 'Main page') {
    cardsList.innerHTML = '';
    createElements(cards);
    statTable.classList.add('hidden');
    options.classList.add('hidden');
  } else if (li.firstChild.innerHTML === 'Statistic') {
    clearGameData();
    statTable.classList.remove('hidden');
    options.classList.remove('hidden');
  } else {
    setSoundsGame(li);
    statTable.classList.add('hidden');
    options.classList.add('hidden');
  }
  setNavigation();
}

navigation.addEventListener('click', (event) => {
  clearGameData();
  const li = event.target.closest('li');
  if (li !== null) {
    setNavigationItem(li);
  }
});

togle.classList.add('toggler-wrapper-passive');
toggler.classList.add('toggler-wrapper-active');

checkbox.addEventListener('click', () => {
  togle.classList.toggle('toggler-wrapper-active');
  togle.classList.toggle('toggler-wrapper-passive');
  toggler.classList.toggle('toggler-wrapper-active');
  toggler.classList.toggle('toggler-wrapper-passive');
  countStatistic = true;

  if (checkbox.checked) {
    cardsList.classList.add('mode-game');

    for (let i = 0; i < setCards.length; i += 1) {
      if (cardsList.querySelector('span') !== null) {
        if (cardsList.querySelector('span').innerHTML === setCards[i][0].name) {
          countStatistic = false;

          firstNameCardList = cardsList.querySelector('span').innerHTML;
          cardsList.innerHTML = '';
          createCard(setCards[i]);
          break;
        }
      }
    }
  } else {
    cardsList.classList.remove('mode-game');
    for (let i = 0; i < setCards.length; i += 1) {
      if (cardsList.querySelector('.category-content').innerHTML !== 'Action (set A)') {
        if (firstNameCardList === setCards[i][0].name) {
          countStatistic = false;

          cardsList.innerHTML = '';
          createCard(setCards[i]);
          break;
        }
      }
    }
  }
  if (collectionRepetitions && countStatistic && cardsList.querySelector('.category-content').innerHTML !== 'Action (set A)') {
    cardsList.innerHTML = '';
    createCard(collectionRepetitions);
    countStatistic = false;
  }
});
let tableTrain = [];
statTable.innerHTML = `<table class="stat-table">
    <thead> <tr> <th>categories</th> <th>words</th> <th>translation</th> <th>trained</th>
    <th>correct</th> <th>incorrect</th><th>%</th></tr> </thead> <tbody> </tbody> </table>`;

const statTableBody = document.querySelector('tbody');
function createStatistic() {
  let createstatTableBody = [];
  if (!localStorage.getItem('tableTrain')) {
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        createstatTableBody += `<tr> <td data-type = "${i}">${categoriesCard[i]}</td> <td class = "findCard">${setCards[i][j].name}</td> <td>${setCards[i][j].translation}</td> 
        <td data-title = "trainClick">${Number(0)}</td> <td data-title = "playClick">${Number(0)}</td>
        <td data-title = "errors">${Number(0)}</td> <td data-title = "percent">${Number(0)}</td></tr>`;
      }
    }
  } else {
    tableTrain = JSON.parse(localStorage.getItem('tableTrain'));
    for (let i = 0; i < 64; i += 1) {
      createstatTableBody += `<tr> <td data-type = "${i + 8}">${tableTrain[i].categories}</td> <td class = "findCard">${tableTrain[i].words}</td> <td>${tableTrain[i].translation}</td> 
      <td data-title = "trainClick">${tableTrain[i].trained}</td> <td data-title = "playClick">${tableTrain[i].correct}</td>
      <td data-title = "errors">${tableTrain[i].incorrect}</td> <td data-title = "percent">${tableTrain[i].percent}</td></tr>`;
    }
  }
  statTableBody.innerHTML = createstatTableBody;
}

createStatistic();
function getStatistic() {
  const { rows } = table;

  let categories;
  let words;
  let translation;
  let trained;
  let correct;
  let incorrect;
  let percent;
  for (let i = 1; i < rows.length; i += 1) {
    categories = rows[i].cells[0].innerHTML;
    words = rows[i].cells[1].innerHTML;
    translation = rows[i].cells[2].innerHTML;
    trained = rows[i].cells[3].innerHTML;
    correct = rows[i].cells[4].innerHTML;
    incorrect = rows[i].cells[5].innerHTML;
    percent = rows[i].cells[6].innerHTML;
    tableTrain.push({
      categories,
      words,
      translation,
      trained,
      correct,
      incorrect,
      percent,
    });
  }
}

function setStatistic(event) {
  const { rows } = table;
  if (event.querySelector('span') !== null) {
    if (checkbox.checked) {
      for (let i = 0; i < 64; i += 1) {
        if (correctCard && event.querySelector('span').innerHTML === tableTrain[i].words) {
          let correctTable = Number(rows[i + 1].cells[4].innerHTML);
          correctTable += 1;
          rows[i + 1].cells[4].innerHTML = correctTable;

          if (Number(rows[i + 1].cells[5].innerHTML) !== 0) {
            rows[i + 1].cells[6].innerHTML = Math.round((Number(rows[i + 1].cells[4].innerHTML)
               / (Number(rows[i + 1].cells[4].innerHTML)
               + Number(rows[i + 1].cells[5].innerHTML))) * 100);
          } else {
            rows[i + 1].cells[6].innerHTML = 100;
          }
        } else if (!correctCard && event.querySelector('span').innerHTML === tableTrain[i].words) {
          let incorrectTable = Number(rows[i + 1].cells[5].innerHTML);
          incorrectTable += 1;
          rows[i + 1].cells[5].innerHTML = incorrectTable;
          if (Number(rows[i + 1].cells[5].innerHTML) !== 0) {
            rows[i + 1].cells[6].innerHTML = Math.round((Number(rows[i + 1].cells[4].innerHTML)
              / (Number(rows[i + 1].cells[4].innerHTML)
              + Number(rows[i + 1].cells[5].innerHTML))) * 100);
          } else {
            rows[i + 1].cells[6].innerHTML = 100;
          }
        }
      }
    } else {
      for (let i = 0; i < 64; i += 1) {
        if (event.querySelector('span').innerHTML === tableTrain[i].words) {
          let trainedTable = Number(rows[i + 1].cells[3].innerHTML);
          trainedTable += 1;
          rows[i + 1].cells[3].innerHTML = trainedTable;
        }
      }
    }
  }
  tableTrain = [];
  getStatistic();
}

function setLocalStorage() {
  localStorage.setItem('tableTrain', JSON.stringify(tableTrain));
}

function sortTable(event) {
  for (let i = 0; i < 7; i += 1) {
    const th = table.querySelectorAll('th');
    th[i].classList.remove('active');
    th[i].classList.remove('passive');
  }
  if (event.classList.contains('sort')) {
    event.classList.remove('passive');
    event.classList.add('active');
    event.classList.remove('sort');
    if (event.innerHTML === 'trained') {
      tableTrain.sort((prev, next) => next.trained - prev.trained);
    } else if (event.innerHTML === 'correct') {
      tableTrain.sort((prev, next) => next.correct - prev.correct);
    } else if (event.innerHTML === 'incorrect') {
      tableTrain.sort((prev, next) => next.incorrect - prev.incorrect);
    } else if (event.innerHTML === '%') {
      tableTrain.sort((prev, next) => next.percent - prev.percent);
    } else if (event.innerHTML === 'translation') {
      tableTrain.sort((prev, next) => prev.translation.localeCompare(next.translation));
    } else if (event.innerHTML === 'words') {
      tableTrain.sort((prev, next) => prev.words.localeCompare(next.words));
    } else if (event.innerHTML === 'categories') {
      tableTrain.sort((prev, next) => prev.categories.localeCompare(next.categories));
    }
  } else {
    event.classList.remove('active');
    event.classList.add('passive');
    event.classList.add('sort');
    if (event.innerHTML === 'trained') {
      tableTrain.sort((prev, next) => prev.trained - next.trained);
    } else if (event.innerHTML === 'correct') {
      tableTrain.sort((prev, next) => prev.correct - next.correct);
    } else if (event.innerHTML === 'incorrect') {
      tableTrain.sort((prev, next) => prev.incorrect - next.incorrect);
    } else if (event.innerHTML === '%') {
      tableTrain.sort((prev, next) => prev.percent - next.percent);
    } else if (event.innerHTML === 'translation') {
      tableTrain.sort((prev, next) => prev.translation.localeCompare(next.translation)).reverse();
    } else if (event.innerHTML === 'words') {
      tableTrain.sort((prev, next) => prev.words.localeCompare(next.words)).reverse();
    } else if (event.innerHTML === 'categories') {
      tableTrain.sort((prev, next) => prev.categories.localeCompare(next.categories)).reverse();
    }
  }
  statTableBody.innerHTML = '';
  for (let i = 0; i < 64; i += 1) {
    statTableBody.innerHTML += `<tr> <td data-type = "${i + 8}">${tableTrain[i].categories}</td> <td class = "findCard">${tableTrain[i].words}</td> <td>${tableTrain[i].translation}</td> 
    <td data-title = "trainClick">${tableTrain[i].trained}</td> <td data-title = "playClick">${tableTrain[i].correct}</td>
    <td data-title = "errors">${tableTrain[i].incorrect}</td> <td data-title = "percent">${tableTrain[i].percent}</td></tr>`;
  }
  localStorage.clear();
  setLocalStorage();
}

document.querySelector('thead').addEventListener('click', (event) => {
  const th = event.target.closest('th');
  sortTable(th);
});
const repeatStat = document.querySelector('.repeat-stat');
repeatStat.addEventListener('click', () => {
  const repeatTableTrain = tableTrain;
  repeatTableTrain.sort((prev, next) => next.percent - prev.percent);

  const namberRepetitions = [];
  for (let i = 0; i < repeatTableTrain.length; i += 1) {
    if (repeatTableTrain[i].percent !== '0' && repeatTableTrain[i].percent !== '100') {
      if (namberRepetitions.length < 8) {
        namberRepetitions.push(repeatTableTrain[i]);
      } else {
        namberRepetitions.shift();
        namberRepetitions.push(repeatTableTrain[i]);
      }
    }
  }
  collectionRepetitions = [];
  for (let i = 0; i < 8; i += 1) {
    for (let j = 0; j < 8; j += 1) {
      setCards.forEach((element) => {
        if (namberRepetitions[i] !== undefined && element[j].name === namberRepetitions[i].words) {
          collectionRepetitions.push(element[j]);
        }
      });
    }
  }
  countStatistic = true;
  clearGameData();
  counter = false;
  createCard(collectionRepetitions);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function gameNow(event) {
  if (event.classList.contains('disabled')) {
    return;
  }
  if (soundCounter < gameSounds.length && event.querySelector('audio') === gameSounds[soundCounter]) {
    soundCounter += 1;
    scale.innerHTML += '<div class = "star"><img src = \'./assets/images/stargold.png\'></div>';
    header.querySelector('.correct').play();
    correctCard = true;
    await sleep(2000);
    if (gameSounds[soundCounter] !== undefined) {
      gameSounds[soundCounter].play();
    }
    event.classList.add('disabled');
  } else {
    gameMistakes += 1;
    header.querySelector('.incorrect').play();
    correctCard = false;
    await sleep(1000);
    scale.innerHTML += '<div class = "star"><img src = \'./assets/images/starempty.jpg\'></div>';
  }
  if (soundCounter === gameSounds.length) {
    if (gameMistakes !== 0) {
      container.querySelector('.gameover').play();
      document.querySelector('.mistakes').innerHTML = `${gameMistakes} errors`;
      document.querySelector('.game-finish').style.display = 'block';
      document.querySelector('.game-over').style.display = 'block';
      await sleep(5000);
      document.querySelector('.game-finish').style.display = 'none';
      document.querySelector('.game-over').style.display = 'none';
    } else if (gameSounds.length !== 0) {
      container.querySelector('.gamewin').play();
      document.querySelector('.game-finish').style.display = 'block';
      document.querySelector('.game-win').style.display = 'block';
      await sleep(5000);
      document.querySelector('.game-finish').style.display = 'none';
      document.querySelector('.game-win').style.display = 'none';
    }
    for (let i = 0; i < navigationItems.length; i += 1) {
      navigationItems[i].classList.remove('active');
    }
    navigationItems[0].classList.add('active');
    clearGameData();
    createElements(cards);
  }
}

function playSoundGame(soundsGameAudio) {
  if (soundCounter === 0 && gameSounds.length === 0) {
    btnNewGame.innerHTML = 'Repeat';
    for (let i = 0; i < soundsGameAudio.length; i += 1) {
      gameSounds.push(soundsGameAudio[i].querySelector('audio'));
    }

    gameSounds.sort(() => Math.random() - 0.5);
  }
  gameSounds[soundCounter].play();
}

btnNewGame.addEventListener('click', () => {
  playSoundGame(soundsGame);
  scale.classList.remove('hidden');
});
const resetStat = document.querySelector('.reset-stat');
resetStat.addEventListener('click', () => {
  const th = table.querySelectorAll('th');
  for (let i = 0; i < th.length; i += 1) {
    th[i].classList.remove('active');
    th[i].classList.remove('passive');
  }
  statTableBody.innerHTML = '';
  for (let i = 0; i < 8; i += 1) {
    for (let j = 0; j < 8; j += 1) {
      statTableBody.innerHTML += `<tr> <td data-type = "${i}">${categoriesCard[i]}</td> <td class = "findCard">${setCards[i][j].name}</td> <td>${setCards[i][j].translation}</td> 
      <td data-title = "trainClick">${Number(0)}</td> <td data-title = "playClick">${Number(0)}</td>
      <td data-title = "errors">${Number(0)}</td> <td data-title = "percent">${Number(0)}</td></tr>`;
    }
  }
  localStorage.clear();
  tableTrain = [];
  getStatistic();
  setLocalStorage();
});
cardsList.addEventListener('click', (event) => {
  const li = event.target.closest('li');
  if (!li) return;
  setSoundsGame(li);
  if (checkbox.checked && (cardsList.querySelector('.category-content').innerHTML !== 'Action (set A)') && (gameSounds.length !== 0)) {
    gameNow(li);
  }
  setStatistic(li);
  localStorage.clear();
  setLocalStorage();
});
