const dayStart="07:30";
const dayEnd="17:45";

function scheduleMeeting(startTime, durationMinutes) {
  var[ , meetingStartHour, meetingStartMinutes ]=startTime.match(/^(\d{1,2}):(\d{2})$/)||[];

    let durationHours = durationMinutes > 60 ? 1 : 0;
    durationMinutes = durationMinutes-(durationHours*60);
    let meetingEndHour = Number(meetingStartHour)+durationHours;
    let meetingEndMinutes = Number(meetingStartMinutes)+durationMinutes;
    if (meetingEndMinutes >= 60) {
      meetingEndHour = meetingEndHour + 1;
      meetingEndMinutes = meetingEndMinutes - 60;
    }

    let meetingStart=`${meetingStartHour.padStart(2,"0")}:${meetingStartMinutes.padStart(2,"0")}`;
    let meetingEnd=`${String(meetingEndHour).padStart(2,"0")}:${String(meetingEndMinutes).padStart(2,"0")}`;

    console.log(meetingStart >= dayStart && meetingEnd <= dayEnd);
    return meetingStart >= dayStart &&  meetingEnd <= dayEnd
}


scheduleMeeting("7:00",15);// false
scheduleMeeting("07:15",30);// false
scheduleMeeting("7:30",30);// true
scheduleMeeting("11:30",60);// true
scheduleMeeting("17:00",45);// true
scheduleMeeting("17:30",30);// false
scheduleMeeting("18:00",15);