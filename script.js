let canPlay = true;
let availableMoney;

function updateMoney(money) {
    availableMoney = money;
    document.getElementById("money").innerHTML = `${availableMoney}`;
}


function startSpinning(element, maxSpinCount) {
    return new Promise(function(resolve, reject) {
        const form = Math.floor(Math.random() * 7);

        let elementWidth = element.getBoundingClientRect().width; 

        let spinProgress = 0;
        let spinCount = 0;

        let interval = setInterval(
            function() {

                if (spinProgress >= elementWidth * 7) {
                    spinProgress -= elementWidth * 7;
                    spinCount++;
                }

                if (spinCount >= maxSpinCount && spinProgress >= form * elementWidth) {
                    spinProgress = form * elementWidth;
                    clearInterval(interval);
                    resolve(form);
                }
            
                element.style.transform = `translateY(  -${spinProgress}px )`;
                spinProgress += 1;

            }, 1
        );
    });
}

function convertToForm(form) {
    if (form == 0) 
        return "seven";
    if (form == 1 || form == 4)
        return "cherry";
    if (form == 2 || form == 5)
        return "diamond";
    if (form == 3 || form == 6)
        return "lemon";

}

function computeResult(slot1, slot2, slot3, bet) {
    console.log(slot1, slot2, slot3);

    let diamondCount = 0;
    if (slot1 == "diamond")
        diamondCount++;
    if (slot2 == "diamond")
        diamondCount++;
    if (slot3 == "diamond")
        diamondCount++;
    

    if ( slot1 == "lemon" && slot1 == slot2 && slot2 == slot3 )
        return bet * 1.25;

    if ( slot1 == "cherry" && slot1 == slot2 && slot2 == slot3 )
        return bet * 1.5;

    if ( slot1 == "seven" && slot1 == slot2 && slot2 == slot3 )
        return bet * 10;

    if ( diamondCount == 1 )
        return bet * 0.5;
    if ( diamondCount == 2 )
        return bet * 1;
    if ( diamondCount == 3 )
        return bet * 2.5;

    return 0;
}

function spinRoulette(bet) {
    if (!canPlay || bet > availableMoney) return;
    canPlay = false;

    let resultText = document.getElementById("result");
    resultText.innerHTML = "";

    updateMoney(availableMoney - bet);

    let slot1;
    let slot2;
    let slot3;

    startSpinning(document.getElementById("slot1"), 3).then((form) => {
        slot1 = convertToForm(form);
    });
    startSpinning(document.getElementById("slot2"), 6).then((form) => {
        slot2 = convertToForm(form);
    });
    startSpinning(document.getElementById("slot3"), 9).then((form) => {
        slot3 = convertToForm(form);

        let result = computeResult(slot1, slot2, slot3, bet);
        if (result > 0)
            resultText.innerHTML = `Vous avez gagné ${result} !`;
        else 
            resultText.innerHTML = `Vous n'avez rien gagné :/`;

        updateMoney(availableMoney + result);
        canPlay = true;
    });


}

document.addEventListener("DOMContentLoaded", function() {

    updateMoney(500);

    

} );












// function startSpinning(element, maxSpinCount) {
//     const form = Math.floor(Math.random() * 7);

//     let elementWidth = element.getBoundingClientRect().width; 

//     let spinProgress = 0;
//     let spinCount = 0;

//     let interval = setInterval(
//         function() {

//             if (spinProgress >= elementWidth * 7) {
//                 spinProgress -= elementWidth * 7;
//                 spinCount++;
//             }

//             if (spinCount >= maxSpinCount && spinProgress == form * elementWidth) {
//                 clearInterval(interval);
//             }
        
//             element.style.transform = `translateY(  -${spinProgress}px )`;
//             spinProgress += 1;

//         }, 1
//     );
    
//     return form;
// }

// function convertToResult(form) {
//     if (form == 0) 
//         return "seven";
//     if (form == 1 || form == 4)
//         return "cherry";
//     if (form == 2 || form == 5)
//         return "diamond";
//     if (form == 3 || form == 6)
//         return "lemon";

// }

// function spinRoulette(bet) {

//     let slot1Form = startSpinning(document.getElementById("slot1"), 3);
//     let slot2Form = startSpinning(document.getElementById("slot2"), 6);
//     let slot3Form = startSpinning(document.getElementById("slot3"), 9);

//     let slot1 = convertToResult(slot1Form);
//     let slot2 = convertToResult(slot2Form);
//     let slot3 = convertToResult(slot3Form);

//     console.log(slot1, slot2, slot3);

//     let diamondCount = 0;
//     if (slot1 == "diamond")
//         diamondCount++;
//     if (slot2 == "diamond")
//         diamondCount++;
//     if (slot3 == "diamond")
//         diamondCount++;
    

//     if ( slot1 == "lemon" && slot1 == slot2 && slot2 == slot3 )
//         return bet * 1.25;

//     if ( slot1 == "cherry" && slot1 == slot2 && slot2 == slot3 )
//         return bet * 1.5;

//     if ( slot1 == "seven" && slot1 == slot2 && slot2 == slot3 )
//         return bet * 10;

//     if ( diamondCount == 1 )
//         return bet * 0.5;
//     if ( diamondCount == 2 )
//         return bet * 1;
//     if ( diamondCount == 3 )
//         return bet * 2.5;

//     return 0;

// }

// document.addEventListener("DOMContentLoaded", function() {

//     console.log( spinRoulette(100) ) ;
    

// } );