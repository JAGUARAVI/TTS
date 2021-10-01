// Imports
const { exec } = require('child_process');
const fs = require('fs').promises;

module.exports = async (string, voice = true) => {
    const process = exec(
        "python " + __dirname + "\\tts.py",
        {
            stdio: ['pipe', 'pipe', 'pipe']
        }
    );
    const file = `${Math.floor(Math.random() * 1000)}.wav`;

    await new Promise((res) => {
        process.stdout.on('data', () => res());
    });

    process.stdin.write(string + "\n");
    process.stdin.write(file + "\n");
    process.stdin.write((voice == true ? 2 : 0) + "\n");

    await new Promise((res) => {
        process.stdout.on('data', () => res());
    });

    const result = await fs.readFile(file);
    fs.unlink(file);
    return result;
}