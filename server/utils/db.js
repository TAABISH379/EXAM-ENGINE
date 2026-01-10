const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

const readUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading users db:", err);
        return [];
    }
};

const writeUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        return true;
    } catch (err) {
        console.error("Error writing users db:", err);
        return false;
    }
};

const findUserByEmail = (email) => {
    const users = readUsers();
    return users.find(u => u.email === email);
};

const createUser = (user) => {
    const users = readUsers();
    users.push(user);
    return writeUsers(users);
};

const PAPERS_FILE = path.join(DATA_DIR, 'papers.json');

if (!fs.existsSync(PAPERS_FILE)) {
    fs.writeFileSync(PAPERS_FILE, JSON.stringify([]));
}

const readPapers = () => {
    try {
        const data = fs.readFileSync(PAPERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading papers db:", err);
        return [];
    }
};

const writePapers = (papers) => {
    try {
        fs.writeFileSync(PAPERS_FILE, JSON.stringify(papers, null, 2));
        return true;
    } catch (err) {
        console.error("Error writing papers db:", err);
        return false;
    }
};

const savePaper = (paper) => {
    const papers = readPapers();
    papers.push(paper);
    return writePapers(papers);
};

const getPapersByUserId = (userId) => {
    const papers = readPapers();
    // Sort by created date descending
    return papers.filter(p => p.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

module.exports = {
    findUserByEmail,
    createUser,
    savePaper,
    getPapersByUserId
};
