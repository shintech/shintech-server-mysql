import express from 'express'
import {users} from './queries'

export default function getRouter (options) {
  const router = express.Router()

// users

  router.route('/users')
    .get(users(options).getAllUsers)
    .post(users(options).createUser)

  router.route('/users/:id')
    .get(users(options).getSingleUser)
    .put(users(options).updateSingleUser)
    .delete(users(options).removeUser)

  return router
}
