'use strict'

import { promisify } from 'util'

import Redis from '../conn/redis'

const config = {
  host: 'localhost'
}

class Rank extends Redis {
  static async getScore (rank, key) {
    try {
      const conn = await this.getConn(config)
      const res = await promisify(conn.zscore).bind(conn)([rank, key])
      return res
    } catch (e) {
      throw e
    }
  }
  static async getRank (rank, start, end) {
    try {
      const conn = await this.getConn(config)
      const res = await promisify(conn.zrevrange).bind(conn)([rank, start, end, 'withscores'])
      return res
    } catch (e) {
      throw e
    }
  }
  static async putRank (rank, key ,value) {
    try {
      const conn = await this.getConn(config)
      const res = await promisify(conn.zadd).bind(conn)([rank, value, key])
    } catch (e) {
      throw e
    }
  }
}

export default Rank
