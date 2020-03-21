import { useState, useEffect, useCallback, useRef } from 'react'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

export default function useRequest(api, option) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  const apiRef = useRef(api)

  option = {...option}

  const run = useCallback(async (...arg) => {
    const data = await apiRef.current(...arg)
    console.log(data)
    if (data) setData(data)
    setLoading(false)
  }, []) 

  useEffect(() => {
    if (option.debounceInterval) {
      apiRef.current = debounce(api, option.debounceInterval)
    }

    if (option.throttleInterval) {
      apiRef.current = throttle(api, option.throttleInterval)
    }
  }, [api, option.debounceInterval, option.throttleInterval])

  // 组件销毁时取消调用
  useEffect(() => () => {
    console.log('销毁')
    if (api.cancel) api.cancel()
  })

  return [data, loading, run]
}
