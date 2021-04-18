import getSecret from 'docker-secret'

// constants
const DEV = 'development'

// configurations
const PORT = process.env.PORT || 8080
const NODE_ENV = process.env.NODE_ENV || DEV
const MY_SECRET = NODE_ENV === DEV ? process.env.MY_SECRET : getSecret(process.env.MY_SECRET_FILE)

export default {
  PORT,
  NODE_ENV,
  MY_SECRET,
}
