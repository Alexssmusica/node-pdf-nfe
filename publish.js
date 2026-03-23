const { execSync } = require('child_process');
require('dotenv').config({ quiet: true });

try {
  if (!process.env.NPM_TOKEN) {
    throw new Error('NPM_TOKEN não encontrado no arquivo .env');
  }
  console.log('Publicando no npm...');
  execSync('npm publish --access public', {
    stdio: 'inherit',
    env:{
      ...process.env,
      NPM_TOKEN: process.env.NPM_TOKEN
    }
  });
  console.log('Publicação concluída com sucesso!');
} catch (error) {
  if (typeof error.status === 'number') {
    process.exit(error.status);
  }
  console.error('Erro durante a publicação:', error.message);
  process.exit(1);
}
