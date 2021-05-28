import actionLogger from 'utils/actionLogger'

const KAFKA_END_POINT_ERROR = process.env.REACT_APP_API_PATH_KAFKA_ERROR
const KAFKA_END_POINT_INFO = process.env.REACT_APP_API_PATH_KAFKA_INFO

export function sendErrorTextToKafka (fullErrorText: string) {
  fetch(KAFKA_END_POINT_ERROR, {
    headers: {
      'Content-Type': 'application/vnd.kafka.json.v2+json'
    },
    method: 'POST',
    body: JSON.stringify({
      records: [
        {
          key: `${KAFKA_END_POINT_ERROR} - pickingApp`,
          value: { fullErrorText }
        }
      ]
    })
  })
    .then(response =>
      localStorage.setItem('kafkaError res', JSON.stringify(response))
    )
    .catch(error =>
      localStorage.setItem('kafkaError error', JSON.stringify(error))
    )
}

export function sendInfoTextToKafka (fullInfoText) {
  fetch(KAFKA_END_POINT_INFO, {
    headers: {
      'Content-Type': 'application/vnd.kafka.json.v2+json'
    },
    method: 'POST',
    body: JSON.stringify({
      records: [
        {
          key: `${KAFKA_END_POINT_INFO} - pickingApp`,
          value: fullInfoText
        }
      ]
    })
  })
    .then(response =>
      localStorage.setItem('kafkaInfo res', JSON.stringify(response))
    )
    .catch(error =>
      localStorage.setItem('kafkaInfo error', JSON.stringify(error))
    )
}
