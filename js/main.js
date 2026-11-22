
// MAIN MENU ELEMENTS
const mainMenu = document.getElementById("mainMenu");
const characterSelection = document.getElementById("characterSelection");
const gameScreen = document.getElementById("gameScreen");

// BUTTONS
const newGameBtn = document.getElementById("newGameBtn");
const howToPlayBtn = document.getElementById("howToPlayBtn");
const characterBackBtn = document.getElementById("characterBackBtn");
const startAdventureBtn = document.getElementById("startAdventureBtn");
const backBtn = document.getElementById("backBtn");
const monsterBtn = document.getElementById("monsterBtn");
const monsterPanel = document.getElementById("monsterPanel");
const closeMonsterPanel = document.getElementById("closeMonsterPanel");
const monsterList = document.getElementById("monsterList");
const itemsBtn = document.getElementById("itemsBtn");
const inventoryPanel = document.getElementById("inventoryPanel");
const closeInventoryBtn = document.getElementById("closeInventoryBtn");
const inventoryGrid = document.getElementById("inventoryGrid");

// HOW TO PLAY ELEMENTS
const howToPlayScreen = document.getElementById("howToPlayScreen");
const howToPlayBackBtn = document.getElementById("howToPlayBackBtn");

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

const monsterInfoPanel =
    document.getElementById("monsterInfoPanel");

const closeMonsterInfo =
    document.getElementById("closeMonsterInfo");

const infoMonsterSprite =
    document.getElementById("infoMonsterSprite");

const infoMonsterName =
    document.getElementById("infoMonsterName");

const infoMonsterDescription =
    document.getElementById("infoMonsterDescription");

const infoMonsterElement =
    document.getElementById("infoMonsterElement");

const infoMonsterLevel =
    document.getElementById("infoMonsterLevel");

const infoMonsterHp =
    document.getElementById("infoMonsterHp");

const infoMonsterAttack =
    document.getElementById("infoMonsterAttack");

const infoMonsterDefense =
    document.getElementById("infoMonsterDefense");


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

// OPEN HOW TO PLAY
howToPlayBtn.addEventListener("click", function() {

    mainMenu.style.display = "none";
    howToPlayScreen.style.display = "block";

    document.body.classList.add("how-to-play-active");


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
        maxHp: 35,
        attack: 15,
        defense: 10,
        description: "A cheerful tarsier monster with magical wings and star-powered abilities.",
        sprite: "ASSETS/monsters/tarsela/idle.png"
    },

    dagtwig: {
        name: "Dagtwig",
        element: "Nature",
        level: 1,
        maxHp: 30,
        attack: 13,
        defense: 12,
        description: "A small woodland rat monster that uses branches and nature-based attacks.",
        sprite: "ASSETS/monsters/dagtwig/idle.png"
    },

    hushus: {
    name: "Hushus",
    element: "Nature",
    level: 2,
    maxHp: 40,
    attack: 4,
    defense: 10,
    description: "A playful dog monster wearing a bonnet. It uses howls, bones, and powerful bites in battle.",
    sprite: "ASSETS/monsters/hushus/idle.png"
}

};

// PLAYER MONSTER TEAM
let playerTeam = [
    {
        ...monsters.tarsela,
        currentHp: monsters.tarsela.maxHp,
        exp: 0
    }
];

// ACTIVE PLAYER MONSTER
let playerMonster = playerTeam[0];

// DISPLAY MY MONSTERS
function updateMyMonstersUI() {

    monsterList.innerHTML = "";

    playerTeam.forEach(function(monster, index) {

        const monsterCard = document.createElement("div");
        monsterCard.classList.add("my-monster-card");

        const isActive = monster === playerMonster;

        monsterCard.innerHTML = `
            <img src="${monster.sprite}" alt="${monster.name}">

            <div class="my-monster-details">
                <h3>${monster.name}</h3>
                <p>Lv. ${monster.level} · ${monster.element}</p>

                <div class="monster-card-buttons">
                    <button class="monster-info-button">ⓘ</button>

                    ${
                        isActive
                        ? '<span class="active-monster-label">Active</span>'
                        : '<button class="switch-monster-button">Switch</button>'
                    }
                </div>
            </div>
        `;

        // INFO BUTTON
        monsterCard.querySelector(".monster-info-button")
            .addEventListener("click", function() {
                showMonsterInfo(monster);
            });

        // SWITCH BUTTON
        const switchButton =
            monsterCard.querySelector(".switch-monster-button");

        if (switchButton) {

            switchButton.addEventListener("click", function() {

                playerMonster = monster;

                updatePlayerMonsterUI();
                updateMyMonstersUI();

                showBattleMessage(
                    playerMonster.name + " is now your active monster!"
                );

            });

        }

        monsterList.appendChild(monsterCard);

    });

}

// SHOW MONSTER INFORMATION
function showMonsterInfo(monster) {

    monsterInfoPanel.style.display = "block";

    infoMonsterSprite.src = monster.sprite;
    infoMonsterName.textContent = monster.name;
    infoMonsterDescription.textContent = monster.description;

    infoMonsterElement.textContent = monster.element;
    infoMonsterLevel.textContent = monster.level;
    infoMonsterHp.textContent =
        monster.currentHp + " / " + monster.maxHp;

    infoMonsterAttack.textContent = monster.attack;
    infoMonsterDefense.textContent = monster.defense;

}

// OPEN AND CLOSE MY MONSTERS
monsterBtn.addEventListener("click", function() {

    updateMyMonstersUI();

    if (monsterPanel.style.display === "block") {
        monsterPanel.style.display = "none";
    } else {
        monsterPanel.style.display = "block";
    }

    monsterInfoPanel.style.display = "none";
    inventoryPanel.style.display = "none";

});

// OPEN INVENTORY
itemsBtn.addEventListener("click", function() {

    // Close My Monsters panel
    monsterPanel.style.display = "none";
    monsterInfoPanel.style.display = "none";

    // Toggle inventory
    if (inventoryPanel.style.display === "block") {
        inventoryPanel.style.display = "none";
    } else {
        inventoryPanel.style.display = "block";
    }

});

// CLOSE INVENTORY
closeInventoryBtn.addEventListener("click", function() {

    inventoryPanel.style.display = "none";

});

// CREATE 16 INVENTORY SLOTS
for (let i = 0; i < 16; i++) {

    const slot = document.createElement("div");

    slot.classList.add("inventory-slot");

    inventoryGrid.appendChild(slot);

}

// CLOSE MY MONSTERS
closeMonsterPanel.addEventListener("click", function() {

    monsterPanel.style.display = "none";
    monsterInfoPanel.style.display = "none";

});

// CLOSE MONSTER INFORMATION
closeMonsterInfo.addEventListener("click", function() {

    monsterInfoPanel.style.display = "none";

});

// ENEMY MONSTER
let enemyMonster = {
    ...monsters.dagtwig,
    currentHp: monsters.dagtwig.maxHp
};

// MONSTER LEVEL SETTINGS
const maxMonsterLevel = 10;
const expToLevelUp = 100;


// PLAYER MONSTER STATUS ELEMENTS
const playerMonsterName = document.getElementById("playerMonsterName");
const playerMonsterLevel = document.getElementById("playerMonsterLevel");
const playerHpText = document.getElementById("playerHpText");
const playerHealthFill = document.getElementById("playerHealthFill");
const playerExpFill = document.getElementById("playerExpFill");
const playerExpText = document.getElementById("playerExpText");

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

    // UPDATE EXP BAR
const expPercentage =
    (playerMonster.exp / expToLevelUp) * 100;

playerExpFill.style.width = expPercentage + "%";

playerExpText.textContent =
    "EXP: " + playerMonster.exp + " / " + expToLevelUp;

    // UPDATE ACTIVE MONSTER SPRITE
    playerMonsterSprite.src = playerMonster.sprite;

    updatePlayerSkills();
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
let currentStage = 1;

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

// SKILL SETS FOR ALL MONSTERS
const playerSkillSets = {

    Tarsela: {
    skill1: {
        ...skills.starSpark,
        sprite: "skill-2"
    },

    skill2: {
        ...skills.wingSlash,
        sprite: "skill-1"
    },

    skill3: {
        ...skills.floralGuard,
        sprite: "skill-3",
        type: "guard"
    },

    skill4: {
        ...skills.parolBurst,
        sprite: "skill-4"
    }
},

    Dagtwig: {
        skill1: {
            name: "Twig Slash",
            power: 1,
            missChance: 0.10,
            critChance: 0.15,
            sprite: "skill-1"
        },

        skill2: {
            name: "Wooden Shot",
            power: 1.2,
            missChance: 0.10,
            critChance: 0.15,
            sprite: "skill-2"
        },

        skill3: {
            name: "Nature Spin",
            power: 1.5,
            missChance: 0.10,
            critChance: 0.20,
            sprite: "skill-3"
        },

        skill4: {
            name: "Forest Burst",
            power: 2,
            missChance: 0.10,
            critChance: 0.25,
            sprite: "skill-4"
        }
    },

    Hushus: {
        skill1: {
            name: "Howl",
            power: 1,
            missChance: 0.10,
            critChance: 0.15,
            sprite: "skill-1"
        },

        skill2: {
            name: "Throw Bone",
            power: 1.2,
            missChance: 0.10,
            critChance: 0.15,
            sprite: "skill-2"
        },

        skill3: {
            name: "Buff",
            power: 0,
            missChance: 0,
            critChance: 0,
            sprite: "skill-3",
            type: "guard"
        },

        skill4: {
            name: "Bite",
            power: 2,
            missChance: 0.10,
            critChance: 0.25,
            sprite: "skill-4"
        }
    }

};

// CURRENT ACTIVE MONSTER SKILLS
let currentSkills = skills;


// UPDATE SKILL BUTTON NAMES
function updatePlayerSkills() {

    currentSkills = playerSkillSets[playerMonster.name];

    skill1Btn.textContent = currentSkills.skill1.name;
    skill2Btn.textContent = currentSkills.skill2.name;
    skill3Btn.textContent = currentSkills.skill3.name;

    document.getElementById("skill4Name").textContent =
        currentSkills.skill4.name;

}

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

// BATTLE RESULT ELEMENTS
const battleResult = document.getElementById("battleResult");
const battleResultImage = document.getElementById("battleResultImage");
const battleResultMessage = document.getElementById("battleResultMessage");
const victoryChoices = document.getElementById("victoryChoices");
const absorbBtn = document.getElementById("absorbBtn");
const captureBtn = document.getElementById("captureBtn");

// CAPTURE BUTTON EVENT
captureBtn.addEventListener("click", function() {
    captureMonster();
});

// ABSORB BUTTON EVENT
absorbBtn.addEventListener("click", function() {
    absorbMonster();
});

// SHOW BATTLE RESULT
function showBattleResult(result) {

    battleResult.style.display = "flex";

    victoryChoices.style.display = "none";

    if (result === "victory") {

        gameScreen.classList.add("victory-state");
        gameScreen.classList.remove("defeat-state");

        battleResultImage.src = "ASSETS/victory.png";

        battleResultMessage.textContent =
            "You defeated Dagtwig! Choose your reward.";

        victoryChoices.style.display = "flex";

    } else {

        gameScreen.classList.add("defeat-state");
        gameScreen.classList.remove("victory-state");

        battleResultImage.src = "ASSETS/defeat.png";

        battleResultMessage.textContent =
            "Your monster was defeated. Your adventure will restart.";

    }

}

// CAPTURE MONSTER
function captureMonster() {

    // Check if team is already full
    if (playerTeam.length >= 3) {
        battleResultMessage.textContent =
            "Your monster team is already full!";
        return;
    }

    // Save defeated enemy to player team
    const capturedMonster = {
        ...enemyMonster,
        currentHp: enemyMonster.maxHp,
        exp: 0
    };

    playerTeam.push(capturedMonster);

    // Keep Tarsela as the active monster
    playerMonster = playerTeam[0];

    // Move to the next stage
    currentStage++;

    // Prepare Hushus as the next enemy
    enemyMonster = {
        ...monsters.hushus,
        currentHp: monsters.hushus.maxHp
    };

    // Update monster displays
    updatePlayerMonsterUI();
    updateEnemyMonsterUI();

    // Close victory screen
    battleResult.style.display = "none";
    victoryChoices.style.display = "none";

    gameScreen.classList.remove("victory-state");
    gameScreen.classList.remove("defeat-state");

    // Reset battle variables
    isPlayerTurn = true;
    playerGuard = false;
    parolCooldown = 0;

    ultimateCooldown.textContent = "";

    // Update stage heading
    document.querySelector(".stage-header").textContent =
        "STAGE " + currentStage + ": DIVISORIA";

    // Show next stage message
    showBattleMessage(
        "Dagtwig joined your team! Stage 2: Hushus approaches!"
    );

    // Make sure battle skills are ready
    setSkillButtons(true);
}

// ABSORB DEFEATED MONSTER
function absorbMonster() {

    // Give EXP to active monster
    playerMonster.exp += 50;

    let message = playerMonster.name + " gained 50 EXP!";

    // CHECK LEVEL UP
    if (playerMonster.exp >= expToLevelUp &&
        playerMonster.level < maxMonsterLevel) {

        playerMonster.exp -= expToLevelUp;

        playerMonster.level++;

        playerMonster.maxHp += 5;
        playerMonster.attack += 2;
        playerMonster.defense += 1;

        playerMonster.currentHp += 5;

        message += " Level Up!";

    }

    // UPDATE MONSTER DISPLAY
    updatePlayerMonsterUI();
    updateMyMonstersUI();

    // MOVE TO NEXT STAGE
    currentStage++;

    enemyMonster = {
        ...monsters.hushus,
        currentHp: monsters.hushus.maxHp
    };

    updateEnemyMonsterUI();

    // CLOSE VICTORY SCREEN
    battleResult.style.display = "none";
    victoryChoices.style.display = "none";

    gameScreen.classList.remove("victory-state");
    gameScreen.classList.remove("defeat-state");

    // RESET BATTLE VARIABLES
    isPlayerTurn = true;
    playerGuard = false;
    parolCooldown = 0;

    ultimateCooldown.textContent = "";

    // UPDATE STAGE
    document.querySelector(".stage-header").textContent =
        "STAGE " + currentStage + ": DIVISORIA";

    showBattleMessage(
        message + " Stage " + currentStage + ": Hushus approaches!"
    );

    setSkillButtons(true);

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
    if (skill.type === "guard") {

        showBattleMessage(
    playerMonster.name + " used " + skill.name + "!"
);

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
        if (skill.name === "Parol Burst") {
            parolCooldown = 3;

            ultimateCooldown.textContent = "Cooldown: 3 turns";
        }

        // SHOW SKILL MESSAGE
        showBattleMessage(
            playerMonster.name + " is preparing " + skill.name + "!"
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

    setSkillButtons(false);

    showBattleResult("victory");

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

// SKILL BUTTON EVENTS

skill1Btn.addEventListener("click", function() {
    playerUseSkill(currentSkills.skill1, currentSkills.skill1.sprite);
});

skill2Btn.addEventListener("click", function() {
    playerUseSkill(currentSkills.skill2, currentSkills.skill2.sprite);
});

skill3Btn.addEventListener("click", function() {
    playerUseSkill(currentSkills.skill3, currentSkills.skill3.sprite);
});

skill4Btn.addEventListener("click", function() {

    if (parolCooldown > 0) {
        showBattleMessage(
            currentSkills.skill4.name + " is still on cooldown!"
        );
        return;
    }

    playerUseSkill(currentSkills.skill4, currentSkills.skill4.sprite);

});

// ENEMY TURN
async function enemyTurn() {

    if (enemyMonster.currentHp <= 0 || playerMonster.currentHp <= 0) {
        return;
    }

    let enemySkills;

if (enemyMonster.name === "Dagtwig") {

    enemySkills = [
        { name: "Twig Slash", power: 1, sprite: "skill-1" },
        { name: "Wooden Shot", power: 1.2, sprite: "skill-2" },
        { name: "Nature Spin", power: 1.5, sprite: "skill-3" },
        { name: "Forest Burst", power: 2, sprite: "skill-4" }
    ];

} else if (enemyMonster.name === "Hushus") {

    enemySkills = [
        { name: "Howl", power: 1, sprite: "skill-1" },
        { name: "Throw Bone", power: 1.2, sprite: "skill-2" },
        { name: "Buff", power: 0, sprite: "skill-3" },
        { name: "Bite", power: 2, sprite: "skill-4" }
    ];

}

    const randomIndex = Math.floor(Math.random() * enemySkills.length);
    const chosenSkill = enemySkills[randomIndex];

    showBattleMessage(
    enemyMonster.name + " is preparing " + chosenSkill.name + "!"
);

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
        enemyMonster.name + " used " + chosenSkill.name + "! " +
        damageResult.message +
        " Damage: " + damageResult.damage
    );

    if (playerMonster.currentHp <= 0) {

    setSkillButtons(false);

    showBattleResult("defeat");

}
}