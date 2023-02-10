const sequelize = require('./db/database')
const app = require('./app')

async function start() {
  try {
    await sequelize.sync(
      { force: false }
    );

    app.listen(3000);
  } catch (error) {
    console.error(error);
  }
}
start()