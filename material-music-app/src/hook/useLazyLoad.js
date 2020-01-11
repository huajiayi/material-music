import { useEffect, useRef } from 'react'
import useIO from '@/hook/useIO'

export default function useLazyLoad(loading, option) {
  const opt = option || {}

  const ref = useRef(null)
  const [observer, setElements, entries] = useIO({
    threshold:  0.25,
    root: null,
    ...opt
  })

  useEffect(() => {
    if (!loading && ref) {
      let imgs = Array.from(ref.current.getElementsByClassName('lazy'))
      setElements(imgs)
    }
  }, [loading, setElements])

  useEffect(() => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target
        lazyImage.src = lazyImage.dataset.src
        lazyImage.classList.remove("lazy")
        observer.unobserve(lazyImage)
      }
    })
  }, [entries, observer])

  return ref
}