'use strict'

const redis = require('redis')

const connCache = {}

class RedisConn {
 static  __initConnect (config) {
    return new Promise((resolve, reject) => {
      const client = redis.createClient(config)

      client.on('ready', () => {
        console.log('Redis connected!')
        resolve(client)
      })

      client.on('error', (err) => {
        console.log('Redis connect errror!')
        resject(err)
      })
    })
  }

  static async getConn (config = {}) {
    const { host } = config
    if (host === undefined) throw new Error('Host is undefined!')

    let conn = connCache[host]
    if (conn === undefined) {
      try {
        conn = await this.__initConnect(config)
      } catch (e) {
        throw e
      }
      connCache[host] = conn
    }

    return conn
  }

  static async disconnect (config) {
    if (host === undefined) throw new Error('Host is undefined!')

    const conn = connCache[host]

    if (conn === undefined) {
      throw new Error(`No Connection ${host}`)
    }

    conn.end(true)
    console.log(`Disconnected ${host}!`)
  }
}

export default RedisConn
