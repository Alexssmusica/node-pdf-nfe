const { execSync } = require('child_process');
require('dotenv').config({ quiet: true });

try {
  if (!process.env.NPM_TOKEN) {
    throw new Error('NPM_TOKEN não encontrado no arquivo .env');
  }
  console.log('Publicando no npm...');
  execSync('npm publish --access public', {
    stdio: 'inherit',
    env: {
      ...process.env,
    }
  });
  console.log('Publicação concluída com sucesso!');
} catch (error) {
  console.error('Erro durante a publicação:', error.message);
  process.exit(1);
}
