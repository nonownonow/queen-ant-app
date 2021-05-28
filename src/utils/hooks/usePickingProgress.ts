import React from 'react'
import pickingService from 'services/Picking'
import actionLogger from 'utils/actionLogger'
import { notification } from 'utils/index'
import WorkStoreOld from 'store/WorkStoreOld'
const service = new pickingService()

export default function (work: WorkStoreOld) {
  const { workBatchNumber, pickingBatchNumber, groupNumber } = work

  const [progress, setProgress] = React.useState({
    targetPickingTotalQuantity: 0,
    taskPickingTotalQuantity: 0
  })

  React.useLayoutEffect(() => {
    const vars = {
      workBatchNumber,
      pickingBatchNumber,
      groupNumber
    }
    actionLogger.setLogs('pickingProgress', JSON.stringify(vars))
    service
      .pickingProgress(vars)
      .then(response => {
        actionLogger.setLogs(
          'pickingProgressResponse',
          JSON.stringify(response)
        )
        setProgress(response)
      })
      .catch(error => {
        actionLogger.setLogs(
          'pickingProgressResponseError',
          JSON.stringify(error)
        )
        notification.danger({
          title: '진행률 확인불가.',
          message: error?.message
        })
      })
  }, [work])

  return progress
}
