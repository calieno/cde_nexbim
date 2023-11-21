// Classe para tratar o tempo Time.ts

class Time {
    static generateTimestamp(): number {
        return Math.floor(Date.now() / 1000); // Converte milissegundos para segundos
    }

    static convertToDateTime(timestamp: number): Date {
        return new Date(timestamp * 1000); // Converte segundos para milissegundos
    }
    
    static formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // meses começam do zero
        const year = date.getFullYear().toString();
        
        return `${day}/${month}/${year}`;
        
    }

    static formatDateFromTimestamp(timestamp: number): string {
        return Time.formatDate(Time.convertToDateTime(timestamp))
    }

    static convertToTimestamp(dateString: string): number | null {
        const [day, month, year] = dateString.split('/').map(Number);

        // Validar se os componentes da data são numéricos
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            console.error('Formato de data inválido. Use o formato dd/mm/yyyy.');
            return null;
        }

        const dateObject: Date = new Date(year, month - 1, day); // Mês é baseado em zero
        const timestamp: number = dateObject.getTime() / 1000; // Converter para segundos

        return timestamp;
    }

    static calculateTimeDifference(startTimestamp: number, endTimestamp: number, unit: string = 'seconds'): number {
        const millisecondsPerSecond = 1000;
        const millisecondsPerMinute = 60 * millisecondsPerSecond;
        const millisecondsPerHour = 60 * millisecondsPerMinute;
        const millisecondsPerDay = 24 * millisecondsPerHour;

        const timeDifferenceInMilliseconds = endTimestamp * 1000 - startTimestamp * 1000;

            switch (unit) {
                case 'seconds':
                return timeDifferenceInMilliseconds / millisecondsPerSecond;
                case 'minutes':
                return timeDifferenceInMilliseconds / millisecondsPerMinute;
                case 'hours':
                return timeDifferenceInMilliseconds / millisecondsPerHour;
                case 'days':
                return timeDifferenceInMilliseconds / millisecondsPerDay;
                default:
                console.error('Unidade de tempo inválida. Use "seconds", "minutes", "hours" ou "days".');
                return NaN;
            }
        }

    static convertToDuration(seconds: number): string {
        const secondsPerMinute = 60;
        const minutesPerHour = 60;
        const hoursPerDay = 24;
        const daysPerYear = 365.25; // Considerando um ano bissexto a cada 4 anos

        const totalMinutes = seconds / secondsPerMinute;
        const totalHours = totalMinutes / minutesPerHour;
        const totalDays = totalHours / hoursPerDay;
        const totalYears = totalDays / daysPerYear;

        const years = Math.floor(totalYears);
        const remainingDays = Math.floor((totalYears - years) * daysPerYear);
        const remainingHours = Math.floor((totalDays - Math.floor(totalDays)) * hoursPerDay);
        const remainingMinutes = Math.floor((totalHours - Math.floor(totalHours)) * minutesPerHour);
        const remainingSeconds = Math.floor((totalMinutes - Math.floor(totalMinutes)) * secondsPerMinute);

        const durationArray = [];

        if (years > 0) {
            durationArray.push(`${years} anos`);
        }

        if (remainingDays > 0) {
            durationArray.push(`${remainingDays} dias`);
        }

        if (remainingHours > 0) {
            durationArray.push(`${remainingHours} horas`);
        }

        if (remainingMinutes > 0) {
            durationArray.push(`${remainingMinutes} minutos`);
        }

        if (remainingSeconds > 0) {
            durationArray.push(`${remainingSeconds} segundos`);
        }

        return durationArray.join(', ');
        }
    }

export { Time }

//// ***************  Exemplos de Utilização *****************

// import { Time } from "./Time.ts"

// //Gerar o timestamp
// const timestamp: number = Time.generateTimestamp();
// console.log(`\nTimestamp Unix gerado: ${timestamp}`);

// //Gerar a Date a partir do timestamp
// const dateObject: Date = Time.convertToDateTime(timestamp);
// console.log(`\n\nData convertida: ${dateObject}`);

// //Gerar data simplificada BR
// const dateObjectFormated: String = Time.formatDateFromTimestamp(timestamp);
// console.log(`\n\nData convertida dd/mm/yyyy: ${dateObjectFormated}`);

// //Transforma uma data dd/mm/yyyy em timestamp
// const myDate: string = '30/10/1978'
// const timestampMyDate: number | null = Time.convertToTimestamp(myDate);
// console.log('\n\nMeu aniversario: ' + timestampMyDate)

// //faz a diferença entre o tempo atual e o tempo fornecido da função anterior
// const secondsDifference: number = Time.calculateTimeDifference(timestampMyDate, timestamp, 'seconds');
// console.log('\n\n' + secondsDifference)

// //Converte o timestamp em segundos
// const seconds = secondsDifference;
// const durationString = Time.convertToDuration(seconds);

// //retorna o valor em Anos, dias, horas, minutos e segundos
// console.log(`\n\nDuração formatada: ${durationString}`);