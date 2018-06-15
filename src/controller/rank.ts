import Base from './base'

import Rank from '../dal/rank'

export default class extends Base {
  async putRankAction () {
    const { ctx } = this

    const { rank, key, value } = ctx.request.body.post

    if (rank === undefined || key === undefined || value === undefined) {
      ctx.status = 400
      return
    }

    try {
      await Rank.putRank(rank, key, parseFloat(value, 10))
      ctx.status = 202
    } catch (e) {
      ctx.status = 500
      ctx.body = {
        msg: e.toString()
      }
    }
  }

  async getRankAction () {
    const { ctx } = this

    const { rank } = ctx.query

    if (rank === undefined) {
      ctx.status = 400
      return
    }

    try {
      const ranks = await Rank.getRank(rank, 0, -1)
      ctx.body = ranks
    } catch (e) {
      ctx.status = 500
      ctx.body = {
        msg: e.toString()
      }
    }
  }
}
