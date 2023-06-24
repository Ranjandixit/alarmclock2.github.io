//selecting html elements for modification from Name,Class-Name and Id-Name
const currentTime = document.querySelector("h1");
const content = document.querySelector(".content");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");
const ringtone = new Audio("./audio/audiofile.wav");

let alarmTime,isAlarmSet = false;


//setting values for options in select list
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value= ${i}>${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value= ${i}>${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value= ${ampm}>${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}




setInterval(() => {
  //getting hours,minutes,seconds
  let date = new Date();
  hours = date.getHours();
  minutes = date.getMinutes();
  seconds = date.getSeconds();
  ampm = "AM";

  if (hours >= 12) {
    hours = hours - 12;
    ampm = "PM";
  }

  //if hour value is 0 then set it to 12
  hours = hours == 0 ? (hours = 12) : hours;

  //adding 0 before hours,minutes,secconds if value is less than 10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  //displaying time  
  currentTime.innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;

  //comparing alarmtime with time to alarm
  if (alarmTime == `${hours}:${minutes} ${ampm}`) {
    console.log("alarm ringing...");
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);//1000 refers to 1seconds,and updating time value with every second.

function setAlarm() {
  if (isAlarmSet) {
    //if isAlarmSet is true
    alarmTime = ""; //clear the value of alarm time
    ringtone.pause(); //pause the rintone
    setAlarmBtn.innerHTML = "Set Alarm";
    return (isAlarmSet = false); //return isAlarmSet value to false
  }
  //getting hours,minutes,am/pm tag values
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  
  if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
    return alert("please select valid time");
  }


  isAlarmSet = true;
  alarmTime = time;
  setAlarmBtn.innerHTML = "Clear Alarm";

  
  var alarmsHistory= document.querySelector("#history");
  alarmsHistory.classList.add("history");
  alarmsHistory.textContent="Alarms";

//creating list to display Alarm history
  var alarmsList = document.getElementById("alarms");
  var li = document.createElement("li");
  li.textContent = alarmTime;
  

  //creating delete button
  var deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn")
  deleteBtn.innerHTML= `<i class="fa-solid fa-trash-can"></i>`;
  deleteBtn.addEventListener("click", function() {
    this.parentElement.remove();
  });

  li.appendChild(deleteBtn);
  alarmsList.appendChild(li);

}

//adding functionality to set-alarm button when clicked
setAlarmBtn.addEventListener("click", setAlarm);
