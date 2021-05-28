import moment from 'moment'
import { sendInfoTextToKafka } from 'utils/logs'

const ACTION_LOGS = 'ACTION_LOGS'
const LOGS_LIMIT = 1000
const LOGS_BEFORE = 7
let actionLogs: any = []
const version = process.env.REACT_APP_VERSION
const user = JSON.parse(sessionStorage.getItem('user'))
const userId = user?.userId

function createActionLogger () {
  const actionLogsRaw = localStorage.getItem(ACTION_LOGS)
  try {
    actionLogs = JSON.parse(actionLogsRaw) ?? []
  } catch (e) {}

  const save = () => {
    localStorage.setItem(ACTION_LOGS, JSON.stringify(actionLogs))
  }

  return {
    getLogs () {
      return actionLogs
    },
    setLogs (...log) {
      const now = moment().format('YYYY-MM-DD hh:mm:ss')
      const beforeLog = actionLogs.slice(-1 * LOGS_BEFORE).join(', ')
      const logText = `${userId}- ${version} - ${now} ::: ${log.join(' :: ')}`
      const logTextWithBeforeLog = `${logText} **BEFORE_LOGS :: ${beforeLog}`
      let obj
      try {
        obj = JSON.parse(log[1])
      } catch {
        obj = {
          result: log[1]
        }
      }
      const logObj = {
        userId,
        version,
        beforeLog,
        apiName: log[0],
        ...obj
      }
      actionLogs.push(logText)
      sendInfoTextToKafka(logTextWithBeforeLog)
      if (actionLogs.length > LOGS_LIMIT) {
        actionLogs.shift()
      }
      save()
    },
    initLogs () {
      actionLogs = []
      save()
    }
  }
}

export default createActionLogger()
