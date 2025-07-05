import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'

const crons = cronJobs()

crons.cron('clear messages table', '0,20,40 * * * *', internal.board.clear)

// Clean up expired sessions every 6 hours
crons.interval('cleanup expired sessions', { hours: 6 }, internal.sessions.cleanupExpiredSessions, {})

export default crons
