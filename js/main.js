
// MAIN MENU ELEMENTS
const mainMenu = document.getElementById("mainMenu");
const characterSelection = document.getElementById("characterSelection");
const gameScreen = document.getElementById("gameScreen");

// BUTTONS
const newGameBtn = document.getElementById("newGameBtn");
const characterBackBtn = document.getElementById("characterBackBtn");
const startAdventureBtn = document.getElementById("startAdventureBtn");
const backBtn = document.getElementById("backBtn");

// BATTLE MENU ELEMENTS
const battleMenuPanel = document.getElementById("battleMenuPanel");
const resumeBtn = document.getElementById("resumeBtn");
const battleSettingsBtn = document.getElementById("battleSettingsBtn");
const exitGameBtn = document.getElementById("exitGameBtn");

// SETTINGS ELEMENTS
const settingsScreen = document.getElementById("settingsScreen");
const settingsBackBtn = document.getElementById("settingsBackBtn");

// PLAYER INPUT
const playerNameInput = document.getElementById("playerNameInput");
const playerNameDisplay = document.getElementById("playerName");

// CHARACTER SELECTION
const characterButtons = document.querySelectorAll(".select-character");
const characterOptions = document.querySelectorAll(".character-option");

// SELECTED CHARACTER
let selectedCharacter = null;


// OPEN CHARACTER SELECTION
newGameBtn.addEventListener("click", function() {

    mainMenu.style.display = "none";
    characterSelection.style.display = "block";

    document.body.classList.add("character-selection-active");

    // Reset selection for a new game
    selectedCharacter = null;
    playerNameInput.value = "";

    characterButtons.forEach(function(button) {
        button.textContent = "Select";
    });

    characterOptions.forEach(function(option) {
        option.classList.remove("selected");
    });

});


// OPEN AND CLOSE BATTLE MENU
backBtn.addEventListener("click", function() {

    if (battleMenuPanel.style.display === "block") {
        battleMenuPanel.style.display = "none";
    } else {
        battleMenuPanel.style.display = "block";
    }

});


// SELECT CHARACTER
characterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Get selected character
        selectedCharacter = button.dataset.character;

        // Reset all character buttons and cards
        characterButtons.forEach(function(otherButton) {
            otherButton.textContent = "Select";
        });

        characterOptions.forEach(function(option) {
            option.classList.remove("selected");
        });

        // Highlight selected character
        button.textContent = "Selected";
        button.parentElement.classList.add("selected");

    });

});


// START ADVENTURE
startAdventureBtn.addEventListener("click", function() {

    const playerName = playerNameInput.value.trim();

    // Check player name
    if (playerName === "") {
        alert("Please enter your player name.");
        playerNameInput.focus();
        return;
    }

    // Check selected character
    if (selectedCharacter === null) {
        alert("Please select your character.");
        return;
    }

    // SAVE PLAYER DATA
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerCharacter", selectedCharacter);

    // DISPLAY PLAYER NAME
    playerNameDisplay.textContent = playerName;
    // DISPLAY PLAYER MONSTER DATA
    updatePlayerMonsterUI();
    updateEnemyMonsterUI();

    // CHANGE SCREEN
    characterSelection.style.display = "none";
    battleMenuPanel.style.display = "none";
    gameScreen.style.display = "block";

    document.body.classList.remove("character-selection-active");

    document.body.classList.add("battle-active");
    gameScreen.classList.remove("battle-started");

});


// START BATTLE
const startBattleBtn = document.getElementById("startBattleBtn");

startBattleBtn.addEventListener("click", function() {
    gameScreen.classList.add("battle-started");
});

// RESUME BATTLE
resumeBtn.addEventListener("click", function() {

    battleMenuPanel.style.display = "none";

});


// OPEN SETTINGS FROM BATTLE
battleSettingsBtn.addEventListener("click", function() {

    gameScreen.style.display = "none";
    settingsScreen.style.display = "block";

    battleMenuPanel.style.display = "none";

});


// BACK TO BATTLE FROM SETTINGS
settingsBackBtn.addEventListener("click", function() {

    settingsScreen.style.display = "none";
    gameScreen.style.display = "block";

});


// EXIT GAME TO MAIN MENU
exitGameBtn.addEventListener("click", function() {

    gameScreen.style.display = "none";
    settingsScreen.style.display = "none";
    mainMenu.style.display = "block";

    document.body.classList.remove("battle-active");

    battleMenuPanel.style.display = "none";

});


//CHARACTERS NATEN MONSTER DATA
const monsters = {
    tarsela: {
        name: "Tarsela",
        element: "Light",
        level: 1,
        maxHp: 100,
        attack: 15,
        defense: 10,
        sprite: "ASSETS/monsters/tarsela/idle.png"
    },

    dagtwig: {
        name: "Dagtwig",
        element: "Nature",
        level: 1,
        maxHp: 90,
        attack: 13,
        defense: 12,
        sprite: "ASSETS/monsters/dagtwig/idle.png"
    }
};

// PLAYER AND ENEMY MONSTERS
let playerMonster = {
    ...monsters.tarsela,
    currentHp: monsters.tarsela.maxHp
};

let enemyMonster = {
    ...monsters.dagtwig,
    currentHp: monsters.dagtwig.maxHp
};


// PLAYER MONSTER STATUS ELEMENTS
const playerMonsterName = document.getElementById("playerMonsterName");
const playerMonsterLevel = document.getElementById("playerMonsterLevel");
const playerHpText = document.getElementById("playerHpText");
const playerHealthFill = document.getElementById("playerHealthFill");

// ENEMY MONSTER STATUS ELEMENTS
const enemyMonsterName = document.getElementById("enemyMonsterName");
const enemyMonsterLevel = document.getElementById("enemyMonsterLevel");
const enemyHpText = document.getElementById("enemyHpText");
const enemyHealthFill = document.getElementById("enemyHealthFill");

// ENEMY MONSTER SPRITE
const enemyMonsterSprite = document.getElementById("enemyMonsterSprite");


// UPDATE PLAYER MONSTER DISPLAY
function updatePlayerMonsterUI() {

    playerMonsterName.textContent = playerMonster.name;

    playerMonsterLevel.textContent = playerMonster.level;

    playerHpText.textContent =
        "HP: " + playerMonster.currentHp + " / " + playerMonster.maxHp;

    const hpPercentage =
        (playerMonster.currentHp / playerMonster.maxHp) * 100;

    playerHealthFill.style.width = hpPercentage + "%";

}


// UPDATE ENEMY MONSTER DISPLAY
function updateEnemyMonsterUI() {

    enemyMonsterName.textContent = enemyMonster.name;

    enemyMonsterLevel.textContent = enemyMonster.level;

    enemyHpText.textContent =
        "HP: " + enemyMonster.currentHp + " / " + enemyMonster.maxHp;

    const hpPercentage =
        (enemyMonster.currentHp / enemyMonster.maxHp) * 100;

    enemyHealthFill.style.width = hpPercentage + "%";

    enemyMonsterSprite.src = enemyMonster.sprite;

}
