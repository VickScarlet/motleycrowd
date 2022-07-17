const commands = new Map();
export default commands;

commands.set('authenticate', (command, username, password) => {
    return command('user.authenticate', {username, password});
});

commands.set('register', (command, username, password) => {
    return command('user.register', {username, password});
});

commands.set('guest', (command) => {
    return command('user.guest');
});

commands.set('logout', (command) => {
    return command('user.logout');
});

