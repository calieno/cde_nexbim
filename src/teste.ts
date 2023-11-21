import { Time } from "./lib/Time";

const timestamp: number = Time.generateTimestamp();
const experisIn = timestamp + 60

console.log(`Tmestamp: ${timestamp}\n\n expiresIn: ${experisIn}`)

//Gerar a Date a partir do timestamp
const dateObject: Date = Time.convertToDateTime(timestamp);
console.log(`\n\n${dateObject}`);
//Gerar a Date a partir do timestamp
const dateObjectAdd: Date = Time.convertToDateTime(experisIn);
console.log(`${dateObjectAdd}`);
