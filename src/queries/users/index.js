import bcrypt from 'bcryptjs'

const queries = {}

export default function getAllRoutes (options) {
  const { db, logger } = options

  queries.getAllUsers = (req, res, next) => {
    db.query('SELECT * FROM users', (err, results, fields) => {
      if (err) {
        handleError(err, logger)
        return next(err)
      }

      res.status(200)
      .json({
        status: 'success',
        body: results
      })
    })
  }

  queries.createUser = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return next(new Error('Invalid input data'))
    }
    const encryptedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)

    var post = {username: req.body.username, password: encryptedPassword}

    db.query('INSERT INTO users SET ?', post, (err, results, fields) => {
      if (err) {
        handleError(err, logger)
        return next(err)
      }

      res.status(200)
      .json({
        status: 'success',
        message: 'Inserted ' + results.affectedRows + ' rows'
      })
    })
  }

  queries.getSingleUser = (req, res, next) => {
    const modelId = parseInt(req.params.id)

    db.query('SELECT * FROM users WHERE id = ?', db.escape(modelId), (err, results, fields) => {
      if (err) {
        handleError(err, logger)
        return next(err)
      }

      if (results === undefined || results.length === 0) {
        res.statusCode = 404
        res.send('404 - Not Found')
        return next(new Error('404 - Not Found'))
      }

      res.status(200)
      .json({
        status: 'success',
        body: results
      })
    })
  }

  queries.updateSingleUser = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return next(new Error('Invalid input data'))
    }

    const modelId = parseInt(req.params.id)
    const encryptedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)

    db.query('UPDATE users SET username=?, password=? WHERE id = ?', [req.body.username, encryptedPassword, db.escape(modelId)], (err, results, fields) => {
      if (err) {
        handleError(err, logger)
        return next(err)
      }

      if (results.affectedRows === 0) {
        res.send('Error updating model')
        return next(new Error('Error updating model'))
      }

      res.status(200)
      .json({
        status: 'success',
        message: 'updated ' + results.affectedRows + ' rows'
      })
    })
  }

  queries.removeUser = (req, res, next) => {
    const modelId = parseInt(req.params.id)

    db.query('DELETE FROM users WHERE id = ?', db.escape(modelId), (err, results, fields) => {
      if (err) {
        handleError(err, logger)
        return next(err)
      }

      if (results.affectedRows === 0) {
        res.send('Unable to delete model')
        return next(new Error('Unable to delete model'))
      }

      res.status(200)
      .json({
        status: 'success',
        results: 'deleted ' + results.affectedRows + ' rows'
      })
    })
  }

  return queries
}

function handleError (err, logger) {
  logger.error(err.stack)
}
