var begDay = 8;
var endDay = 18;

// update current day at the top of the page
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// for loop to dynamically add timeblocks
for (var i = begDay; i < endDay; i++) {
    
    var rowDiv = $("<div class='row'>");

    var hourDiv= $("<div class='hour col-md-1'>").text((moment().hour(i).format("hA")));
    
    var timeBlock = $("<div class='time-block col-md-9'><textarea></textarea></div>").attr("id", i);

    var saveBtn = $("<div class='saveBtn col-md-1'>");
    var saveIcon = $("<i class='fas fa-save'>");
    
    $(".container").append(rowDiv.append(hourDiv, timeBlock, saveBtn.append(saveIcon)));
};

// variable to get current time
var currentTime = moment().hour();

// for loop to set properties of time blocks
for (var i = begDay; i < endDay; i++) {
    var id;
    if (currentTime < i) {
        $(".time-block").removeAttr("past present future");
        id = "future";
    } else if (currentTime > i) {
        $(".time-block").removeAttr("past present future");
        id = "past";
    } else if (currentTime = i) {
        $(".time-block").removeAttr("past present future");
        id = "present";
    }
    $("#" + i).attr("id", id);
    }

var storageEl = [];
var timeEl;
var textEl;
var content;
// event listener to get text from text areas
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    timeEl = parseInt($(this).parent().children(0).text());
    textEl = $(this).parent().find("textarea").val();
    content = {
        time: timeEl,
        text: textEl
    }
    storageEl = JSON.parse(localStorage.getItem("contents"));
    if (storageEl !== true) {
        localStorage.setItem("contents", JSON.stringify([{time: timeEl, text: textEl}]));
    } else {
        storageEl.push(content);
        localStorage.setItem("contents", JSON.stringify(storageEl));
    }
    });

// function to load saved information
var showItems;
function loadInfo() {
    var savedInfo = JSON.parse(localStorage.getItem("contents"));
    console.log(savedInfo);
    if (savedInfo !== null) {
        for (var i=0; i < savedInfo.length; i++) {
            showItems=savedInfo[i];
            text=showItems.text;
            time=showItems.time;
            if (text !== null) {
                $(".hour").parent().children(0).find("textarea").val(text);
            }
        }

    }

}

// function call 
loadInfo();