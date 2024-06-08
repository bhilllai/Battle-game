// @ts-nocheck
import { rollDice } from "../util/common";
import { Player } from "./Player";

export class Arena {
    total_players: number;
    private Players: Map<number, Player>;
    
    constructor() {
        this.total_players = 0;
        this.Players = new Map();
        console.log('Welcome to the arena!!!\n');
    }

    isPresent (id: number): bool {
        return this.Players.has(id);
    }

    getPlayerCount (): number {
        return this.Players.size;
    }

    addPlayer (name: string, health: number, strength: number, attack: number): number {
        if (health <= 0) {
            console.log("Health should be a positive integer.");
            return -1;
        }
        if (strength <= 0) {
            console.log("strength should be a positive integer.");
            return -1;
        }
        if (attack <= 0) {
            console.log("attack should be a positive integer.");
            return -1;
        }

        const id = this.total_players;
        const newPlayer = new Player(id, name, health, strength, attack);
        this.Players.set(id, newPlayer);
        this.total_players += 1;

        return id;
    }

    deletePlayer (id: number): void {
        if (this.Players.has(id)) {
            const player = this.Players.get(id);
            console.log(`${player?.name} has been defeated...\n`);
            this.Players.delete(id);
        }
        else {
            console.log(`No player with id = ${id} exists.\n`);
        }
    }

    displayPlayers (): void {
        const pad = (str: string | number, length: number) => {
            str = str.toString();
            return str.length >= length ? str : str + ' '.repeat(length - str.length);
        };
        
        const headers = ['Id', 'Name', 'Health', 'Strength', 'Attack'];
        const widths = [5, 10, 10, 10, 10];
        
        let headerRow = '|';
        headers.forEach((header, i) => {
            headerRow += ` ${pad(header, widths[i])} |`;
        });
        console.log(headerRow);
        
        for (const [id, player] of this.Players) {
            const {name, health, strength, attack} = player;
            let row = '|';
            [id, name, health, strength, attack].forEach((cell, i) => {
                row += ` ${pad(cell, widths[i])} |`;
            });
            console.log(row);
        }
        
        console.log('\n');
    }
    

    battle (id_first: number, id_second: number): any {
        if (id_first === id_second) {
            console.log('Id\'s can not be the same for both the players.\n');
            return {};
        }
        else if (this.Players.has(id_first) === false) {
            console.log(`No player with id = ${id_first} exists.\n`);
            return {};
        }
        else if (this.Players.has(id_second) === false) {
            console.log(`No player with id = ${id_second} exists.\n`);
            return {};
        }
        else {
            
            // extract the players from their ids
            let attacker = this.Players.get(id_first);
            let defender = this.Players.get(id_second);
            console.log(`\n____________${attacker.name} v/S ${defender.name}____________\n`);

            if (defender.health < attacker.health) {
                // Player with the lower health attacks first
                [attacker, defender] = [defender, attacker];
            }
            
            while (defender.health > 0) {

                const attacknumber=rollDice();
                const attacking_power = attacker.attack * attacknumber;
                const defendnumber=rollDice();                
                const defending_power = defender.strength * defendnumber;
                console.log(`die roll number for attack = ${attacknumber}\n`);
                console.log(`${attacker?.name} hits ${defender?.name} with power = ${attacking_power}\n`);
                console.log(`die roll number for defence = ${defendnumber}\n`);
                console.log(`${defender?.name} defends with power = ${defending_power}\n`);

                if (attacking_power > defending_power) {
                    defender.health -= (attacking_power - defending_power);
                    defender.health = Math.max(0, defender.health);
                }

                console.log(`${defender?.name}'s health: ${defender.health}\n`);
                
                if (defender.health > 0) {
                    [attacker, defender] = [defender, attacker];
                }
            }
            
            const res = {winner: attacker.id, loser: defender.id};
            console.log(`${attacker?.name} has emerged victorious!!!\n`);
            this.deletePlayer(defender.id);

            return res;
        }

    }
}
