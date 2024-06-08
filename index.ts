import { Arena } from "./modules/Arena";
import { inputIntegerFromUser, inputStringFromUser } from "./util/common";

const inputNewPlayerDetails = async() => {
    const name = await inputStringFromUser("Enter the player's name: ");
    const health = await inputIntegerFromUser(`Enter ${name}'s health: `);
    const attack = await inputIntegerFromUser(`Enter ${name}'s attack: `);
    const strength = await inputIntegerFromUser(`Enter ${name}'s strength: `);

    return {name, health, attack, strength};
}

const mainExecuter = async() => {

    const A = new Arena();
    while (1) {
        A.displayPlayers();
        console.log("Options: \n\t1> Add new player\n\t2> Battle\n\t3> End game\n");
        const option = await inputIntegerFromUser("Enter your choice (integer): ");
        if (option === 1) {
            const {name, health, attack, strength} = await inputNewPlayerDetails();
            A.addPlayer(name, health, strength, attack);
        }
        else if (option === 2) {
            if (A.getPlayerCount() < 2) {
                console.log('There should be atleast two players in the Arena.\nPlease add more players.\n');
            }
            else {
                const id_first = await inputIntegerFromUser("Enter the first player's id: ");
                const id_second = await inputIntegerFromUser("Enter the second player's id: ");
                A.battle(id_first, id_second);
            }
        }
        else {
            console.log('Bye Bye...\n');
            break;
        }

        console.log('\n____________________________________________________________________________________________________\n\n');
        
    }
    
};

mainExecuter();