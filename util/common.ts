import * as readline from 'readline';

export function rollDice(): number {
    return (Math.floor(Math.random() * 6) + 1);
}

export function inputStringFromUser(prompt: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise<string>((resolve) => {
        rl.question(prompt, (inputString: string) => {
            rl.close();
            resolve(inputString);
        });
    });
}

export function inputIntegerFromUser(promptMessage: string): Promise<number> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise<number>((resolve) => {
        rl.question(promptMessage, (inputString: string) => {
            rl.close();
            const userInput = parseInt(inputString.trim(), 10);
            if (!isNaN(userInput)) {
                resolve(userInput);
            } else {
                console.log("Invalid input. Please enter a valid integer.");
                resolve(inputIntegerFromUser(promptMessage));
            }
        });
    });
}