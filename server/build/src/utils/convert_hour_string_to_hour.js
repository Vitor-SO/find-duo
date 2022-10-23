"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHourStringToHour = void 0;
function convertHourStringToHour(hourString) {
    const [hour, minutes] = hourString.split(":").map(Number);
    const newHour = (hour * 60) + minutes;
    return newHour;
}
exports.convertHourStringToHour = convertHourStringToHour;
