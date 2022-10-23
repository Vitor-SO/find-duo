"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertHourtoHourString(hourString) {
    const hour = Math.floor(hourString / 60);
    const minutes = hourString % 60;
    return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
exports.default = convertHourtoHourString;
