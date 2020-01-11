import { useState, useEffect } from 'react'

export default function useRequest(api) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const data = await api()
      setData(data)
      setLoading(false)
    }
    fetchData()
  }, [api])

  return [data, loading]
}
