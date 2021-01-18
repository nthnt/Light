var goal = [];
var check, textInput;
var click = "here";

checkDate();
getProg();

chrome.storage.sync.get("goal1", value => {
    goal[0] = value.goal1;

    if(goal[0] == null) {
        document.getElementById("target1").innerHTML = "no goal yet!";
    } else {
        document.getElementById("target1").innerHTML = goal[0];
    }
});

chrome.storage.sync.get("goal2", value => {
    goal[1] = value.goal2;

    if(goal[1] == null) {
        document.getElementById("target2").innerHTML = "no goal yet!";
    } else {
        document.getElementById("target2").innerHTML = goal[1];
    }
});

chrome.storage.sync.get("goal3", value => {
    goal[2] = value.goal3;

    if(goal[2] == null) {
        document.getElementById("target3").innerHTML = "no goal yet!";
    } else {
        document.getElementById("target3").innerHTML = goal[2];
    }
});

chrome.storage.sync.get("nightmode", value => {
    check = value.nightmode;
    document.getElementById("night").checked = check;
    if (check) {
        nightScheme("colour", "format1", "format2", "format3", "goal");
    }
});

window.onload = function () {
    
    document.getElementById("target1").innerHTML = goal[0];
    document.getElementById("target2").innerHTML = goal[1];
    document.getElementById("target3").innerHTML = goal[2];

    var x = document.getElementById("night");
    x.addEventListener("click", function () {
        if (document.getElementById("night").checked == true) {
            check = true;
            nightScheme("colour", "format1", "format2", "format3", "goal");
        }
        else {
            check = false;
            dayScheme("colour", "format1", "format2", "format3", "goal");
        }
        
        chrome.storage.sync.set({"nightmode": check});
    });

    var z = document.getElementById("goal");
    z.addEventListener("click", function() {
        clear("error");
        textInput = document.getElementById("value").value;

        if (textInput == "") {
            document.getElementById("error").innerHTML = "Sorry, you didn't enter anything! Try again ✨";
        } else if(goal[0] == 'undefined' || goal[0] == null) {
            goal[0] = textInput;
            chrome.storage.sync.set({"goal1": goal[0]});
            document.getElementById("target1").innerHTML = goal[0];
        } else if (goal[1] == 'undefined' || goal[1] == null) {
            goal[1] = textInput;
            chrome.storage.sync.set({"goal2": goal[1]});
            document.getElementById("target2").innerHTML = goal[1];
        } else if (goal[2] == 'undefined' || goal[2] == null) {
            goal[2] = textInput;
            chrome.storage.sync.set({"goal3": goal[2]});
            document.getElementById("target3").innerHTML = goal[2];
        } else {
            document.getElementById("error").innerHTML = "🌧️ It's good to only focus on 3 intentions/goals a day! To read more about this, click ";
        }

        document.getElementById("value").value = "";
    });
}


function nightScheme(id, secondid, thirdid, fourthid, fifthid) {
    document.body.style.background = "black";
    document.body.style.color = "white";
    document.getElementById(id).style.color = "white";
    document.getElementById(secondid).style.backgroundColor = "white";
    document.getElementById(thirdid).style.backgroundColor = "white";
    document.getElementById(fourthid).style.backgroundColor = "white";
    document.getElementById(fifthid).style.backgroundColor = "white";
}

function dayScheme(id, secondid, thirdid, fourthid, fifthid) {
    document.body.style.background = "white";
    document.body.style.color = "grey";
    document.getElementById(id).style.color = "grey";
    document.getElementById(secondid).style.backgroundColor = "lightblue";
    document.getElementById(thirdid).style.backgroundColor = "lightblue";
    document.getElementById(fourthid).style.backgroundColor = "lightblue";
    document.getElementById(fifthid).style.backgroundColor = "lightblue";
}

function clear(id) { 
    document.getElementById(id).innerHTML = ""; 
} 

function checkDate() {
    var date = new Date();
    var hour = date.getHours();
    
    if (hour == 0) {
        chrome.storage.sync.set({"goal1": null});
        chrome.storage.sync.set({"goal2": null});
        chrome.storage.sync.set({"goal3": null});
    }
}

function getProg() {
    var date = new Date();
    var total = (date.getHours()*3600) + (date.getMinutes()*60) + date.getSeconds();
    var percent = Math.trunc(total/86400*100);
    document.getElementById("bar").value = percent;
    document.getElementById("percent").innerHTML = percent + "%";
}

