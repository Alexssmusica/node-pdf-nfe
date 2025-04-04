const { execSync } = require('child_process');
require('dotenv').config();

try {
    if (!process.env.GH_TOKEN) {
        throw new Error('GH_TOKEN não encontrado no arquivo .env');
    }
    console.log('Iniciando processo de release...');
    execSync('semantic-release --no-ci', {
        stdio: 'inherit',
        env: {
            ...process.env,
            GITHUB_TOKEN: process.env.GH_TOKEN,
            GH_TOKEN: process.env.GH_TOKEN
        }
    });
    console.log('Release concluído com sucesso!');
} catch (error) {
    console.error('Erro durante o processo de release:', error.message);
    process.exit(1);
} 
