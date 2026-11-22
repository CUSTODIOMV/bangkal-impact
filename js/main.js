
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

// BATTLE SKILL ELEMENTS
const skill1Btn = document.getElementById("skill1Btn");
const skill2Btn = document.getElementById("skill2Btn");
const skill3Btn = document.getElementById("skill3Btn");
const skill4Btn = document.getElementById("skill4Btn");

const ultimateCooldown = document.getElementById("ultimateCooldown");
const battleMessage = document.getElementById("battleMessage");

// BATTLE VARIABLES
let isPlayerTurn = true;
let playerGuard = false;
let parolCooldown = 0;

// TARSELA SKILL SETTINGS
const skills = {
    starSpark: {
        name: "Star Spark",
        power: 1,
        missChance: 0.10,
        critChance: 0.15
    },

    wingSlash: {
        name: "Wing Slash",
        power: 1.5,
        missChance: 0.15,
        critChance: 0.20
    },

    floralGuard: {
        name: "Floral Guard",
        power: 0,
        missChance: 0,
        critChance: 0
    },

    parolBurst: {
        name: "Parol Burst",
        power: 2.5,
        missChance: 0.10,
        critChance: 0.25
    }
};

// DAMAGE CALCULATION
function calculateDamage(attacker, defender, skill) {

    // Check if attack misses
    if (Math.random() < skill.missChance) {
        return {
            damage: 0,
            message: attacker.name + " missed!"
        };
    }

    // Calculate base damage
    let damage = attacker.attack * skill.power;

    // Apply defender's defense
    damage = damage - defender.defense;

    // Minimum damage is 1
    damage = Math.max(1, damage);

    // Check critical hit
    let isCritical = Math.random() < skill.critChance;

    if (isCritical) {
        damage = damage * 2;
    }

    // Randomize damage slightly
    damage = Math.floor(damage * (0.9 + Math.random() * 0.2));

    return {
        damage: damage,
        message: isCritical ? "CRITICAL HIT!" : "Direct hit!"
    };
}

// MONSTER SPRITE ELEMENTS
const playerMonsterSprite = document.getElementById("playerMonsterSprite");
const playerMonsterContainer = document.querySelector(".player-placeholder");

const enemyMonsterContainer = document.querySelector(".enemy-placeholder");


// PLAY MONSTER ANIMATION
function playMonsterAnimation(spriteElement, monster, spriteName, animationClass, duration) {

    return new Promise(function(resolve) {

        const monsterFolder = monster.sprite.substring(
            0,
            monster.sprite.lastIndexOf("/") + 1
        );

        const newSprite = monsterFolder + spriteName + ".png";

        // Change image
        spriteElement.src = newSprite;

        const monsterContainer = spriteElement.parentElement;

        // Restart CSS animation
        monsterContainer.classList.remove(animationClass);
        void monsterContainer.offsetWidth;
        monsterContainer.classList.add(animationClass);

        setTimeout(function() {

            monsterContainer.classList.remove(animationClass);

            // Return to idle image
            spriteElement.src = monster.sprite;

            resolve();

        }, duration);

    });
}

// BATTLE MESSAGE
function showBattleMessage(message) {
    battleMessage.textContent = message;
}


// ENABLE OR DISABLE SKILL BUTTONS
function setSkillButtons(enabled) {
    skill1Btn.disabled = !enabled;
    skill2Btn.disabled = !enabled;
    skill3Btn.disabled = !enabled;
    skill4Btn.disabled = !enabled || parolCooldown > 0;
}

// PLAYER ATTACK
async function playerUseSkill(skill, spriteName) {

    // Check if it is the player's turn
    if (!isPlayerTurn || enemyMonster.currentHp <= 0) {
        return;
    }

    // End player's turn
    isPlayerTurn = false;
    setSkillButtons(false);

    // FLORAL GUARD
    if (skill === skills.floralGuard) {

        showBattleMessage("Tarsela used Floral Guard!");

        await playMonsterAnimation(
            playerMonsterSprite,
            playerMonster,
            "skill-3",
            "attack-animation",
            500
        );

        playerGuard = true;

    } else {

        // PAROL BURST COOLDOWN
        if (skill === skills.parolBurst) {
            parolCooldown = 3;

            ultimateCooldown.textContent = "Cooldown: 3 turns";
        }

        // SHOW SKILL MESSAGE
        showBattleMessage(
            "Tarsela is preparing " + skill.name + "!"
        );

        // DASH ANIMATION
        await playMonsterAnimation(
            playerMonsterSprite,
            playerMonster,
            "dash",
            "dash-forward",
            400
        );

        // CALCULATE DAMAGE
        const damageResult = calculateDamage(
            playerMonster,
            enemyMonster,
            skill
        );

        // SKILL ANIMATION
        await playMonsterAnimation(
            playerMonsterSprite,
            playerMonster,
            spriteName,
            "attack-animation",
            500
        );

        // APPLY DAMAGE
        enemyMonster.currentHp -= damageResult.damage;

        if (enemyMonster.currentHp < 0) {
            enemyMonster.currentHp = 0;
        }

        // UPDATE ENEMY DISPLAY
        updateEnemyMonsterUI();

        // SHOW DAMAGE MESSAGE
        showBattleMessage(
            skill.name + "! " +
            damageResult.message +
            " Damage: " + damageResult.damage
        );
    }

    // CHECK IF ENEMY IS DEFEATED
    if (enemyMonster.currentHp <= 0) {

        showBattleMessage("Dagtwig was defeated!");

        setSkillButtons(false);

        return;
    }

    // WAIT BEFORE ENEMY TURN
    await new Promise(function(resolve) {
        setTimeout(resolve, 1000);
    });

    // DAGTWIG AUTOMATIC TURN
    await enemyTurn();

    // CHECK IF PLAYER IS STILL ALIVE
    if (playerMonster.currentHp <= 0) {
        return;
    }

    // RETURN TO PLAYER TURN
    isPlayerTurn = true;

    // REDUCE PAROL BURST COOLDOWN
    if (parolCooldown > 0) {
        parolCooldown--;
    }

    ultimateCooldown.textContent =
        parolCooldown > 0
        ? "Cooldown: " + parolCooldown + " turns"
        : "";

    // ENABLE AVAILABLE SKILLS
    setSkillButtons(true);

}

// ENEMY TURN
async function enemyTurn() {

    // Dito ilalagay ang buong enemyTurn() code

}

// SKILL BUTTON EVENTS

skill1Btn.addEventListener("click", function() {
    playerUseSkill(skills.starSpark, "skill-2");
});

skill2Btn.addEventListener("click", function() {
    playerUseSkill(skills.wingSlash, "skill-1");
});

skill3Btn.addEventListener("click", function() {
    playerUseSkill(skills.floralGuard, "skill-3");
});

skill4Btn.addEventListener("click", function() {

    if (parolCooldown > 0) {
        showBattleMessage("Parol Burst is still on cooldown!");
        return;
    }

    playerUseSkill(skills.parolBurst, "skill-4");

});

// ENEMY TURN
async function enemyTurn() {

    if (enemyMonster.currentHp <= 0 || playerMonster.currentHp <= 0) {
        return;
    }

    const enemySkills = [
        { name: "Twig Slash", power: 1, sprite: "skill-1" },
        { name: "Wooden Shot", power: 1.2, sprite: "skill-2" },
        { name: "Nature Spin", power: 1.5, sprite: "skill-3" },
        { name: "Forest Burst", power: 2, sprite: "skill-4" }
    ];

    const randomIndex = Math.floor(Math.random() * enemySkills.length);
    const chosenSkill = enemySkills[randomIndex];

    showBattleMessage("Dagtwig is preparing " + chosenSkill.name + "!");

    await playMonsterAnimation(
        enemyMonsterSprite,
        enemyMonster,
        "dash",
        "dash-forward",
        400
    );

    const enemySkillData = {
        name: chosenSkill.name,
        power: chosenSkill.power,
        missChance: 0.10,
        critChance: 0.10
    };

    const damageResult = calculateDamage(
        enemyMonster,
        playerMonster,
        enemySkillData
    );

    await playMonsterAnimation(
        enemyMonsterSprite,
        enemyMonster,
        chosenSkill.sprite,
        "attack-animation",
        500
    );

    if (playerGuard) {
        damageResult.damage = Math.floor(damageResult.damage * 0.5);
        playerGuard = false;
    }

    playerMonster.currentHp -= damageResult.damage;

    if (playerMonster.currentHp < 0) {
        playerMonster.currentHp = 0;
    }

    updatePlayerMonsterUI();

    showBattleMessage(
        "Dagtwig used " + chosenSkill.name + "! " +
        damageResult.message +
        " Damage: " + damageResult.damage
    );

    if (playerMonster.currentHp <= 0) {
        showBattleMessage("Tarsela was defeated!");
        setSkillButtons(false);
    }

    // SKILL BUTTON EVENTS

skill1Btn.addEventListener("click", function() {
    playerUseSkill(skills.starSpark, "skill-2");
});

skill2Btn.addEventListener("click", function() {
    playerUseSkill(skills.wingSlash, "skill-1");
});

skill3Btn.addEventListener("click", function() {
    playerUseSkill(skills.floralGuard, "skill-3");
});

skill4Btn.addEventListener("click", function() {

    if (parolCooldown > 0) {
        showBattleMessage("Parol Burst is still on cooldown!");
        return;
    }

    playerUseSkill(skills.parolBurst, "skill-4");

});
}