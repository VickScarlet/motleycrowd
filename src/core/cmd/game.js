const commands = new Map();
export default commands;

commands.set('random', (command, ) => {
    return command('game.random');
});

commands.set('create', (command, limit) => {
    return command('game.create', {limit});
});

commands.set('join', (command, room) => {
    return command('game.join', {room});
});

commands.set('leave', (command) => {
    return command('game.leave');
});

commands.set('answer', (command, answer, question) => {
    return command('game.answer', {answer, question});
});
