import { Arena } from "../modules/Arena";

describe('Arena class', () => {
    
    describe('addPlayer method', () => {
        let A: Arena;
    
        beforeEach(() => {
            A = new Arena();
        });

        test('A player\'s health can\'t be negative or zero.', () => {
            let id = A.addPlayer('A', -2, 200, 100);
            expect(id).toEqual(-1);
            
            id = A.addPlayer('A', 0, 200, 100);
            expect(id).toEqual(-1);
        });
        
        test('A player\'s strength can\'t be negative or zero.', () => {
            let id = A.addPlayer('A', 2, -200, 100);
            expect(id).toEqual(-1);
            
            id = A.addPlayer('A', 10, 0, 100);
            expect(id).toEqual(-1);
        });

        test('A player\'s attack can\'t be negative or zero.', () => {
            let id = A.addPlayer('A', 2, 200, -100);
            expect(id).toEqual(-1);
            
            id = A.addPlayer('A', 10, 120, 0);
            expect(id).toEqual(-1);
        });

        test('A newly added player to be present in the Arena.', () => {
            const id = A.addPlayer('A', 100, 200, 100);
            expect(A.isPresent(id)).toEqual(true);
        });
        
        test('Player count should increase after addition of a new player.', () => {
            const oldPlayerCount = A.getPlayerCount();
            A.addPlayer('A', 100, 200, 100);
            const newPlayerCount = A.getPlayerCount();
        
            expect(newPlayerCount).toEqual(oldPlayerCount + 1);
        });
    });

    describe('deletePlayer method', () => {
        let A : Arena;
    
        beforeEach(() => {
            A = new Arena();
        });

        test('The deleted player should not be present in the Arena.', () => {
            const id = A.addPlayer('A', 100, 200, 100);
            A.deletePlayer(id);
            expect(A.isPresent(id)).toEqual(false);
        });
        
        test('Player count should decrease after deletion of a player.', () => {
            const id = A.addPlayer('A', 100, 200, 100);
            const oldPlayerCount = A.getPlayerCount();
            
            A.deletePlayer(id);
            const newPlayerCount = A.getPlayerCount();
        
            expect(newPlayerCount).toEqual(oldPlayerCount - 1);
        });
        
        test('Player who is not in the Arena should not be deleted.', () => {
            const id = A.addPlayer('A', 100, 200, 100);
            
            const oldPlayerCount = A.getPlayerCount();
            A.deletePlayer(id+123);
            const newPlayerCount = A.getPlayerCount();
        
            expect(newPlayerCount).toEqual(oldPlayerCount);
        });
    });

    describe('battle method', () => {
        let A : Arena;
    
        beforeEach(() => {
            A = new Arena();
        });

        test('Battle with empty arena.', () => {
            expect(A.battle(0,1)).toEqual({});
        });
        
        test('Players have the same id.', () => {
            A.addPlayer('A', 100, 200, 100);
            A.addPlayer('B', 200, 300, 100);
        
            expect(A.battle(0, 0)).toEqual({});
        });
        
        test('One of the Player\'s id does not exist.', () => {
            A.addPlayer('A', 100, 200, 100);
            A.addPlayer('B', 200, 300, 100);
        
            expect(A.battle(0, 10)).toEqual({});
        });

        test('Normal battle', () => {
            A.addPlayer('A', 100, 200, 100);
            A.addPlayer('B', 200, 300, 100);
            
            const possibleOutcomes = [{ winner: 0, loser: 1 }, { winner: 1, loser: 0 }];
        
            const res = A.battle(0, 1);
            expect(possibleOutcomes).toContainEqual(res);
            
            const {winner, loser} = res;

            // the winner should be present in the Arena
            expect(A.isPresent(winner)).toBe(true);
            // the loser should not be present in the Arena
            expect(A.isPresent(loser)).toBe(false);
            
        });

    });

});
