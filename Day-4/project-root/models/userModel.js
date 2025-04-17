let users = []; // Stockage des utilisateurs

const getUsers = () => users; //Renvoie tous les utilisateurs enregistrés

//Ajoute un nouvel utilisateur au tableau et le retourne
const addUser = (user) => {
    users.push(user);
    return user;
};

const findUserByEmail = (email) => users.find(user => user.email === email);

const getUserById = (id) => users.find(user => user.id === id);

const removeUserById = (id) => {
    users = users.filter(user => user.id !== id);
};

module.exports = {
    getUsers,
    addUser,
    findUserByEmail,
    getUserById,
    removeUserById
};
