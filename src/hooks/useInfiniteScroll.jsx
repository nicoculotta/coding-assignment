import { useCallback, useEffect, useRef } from 'react'

const useInfiniteScroll = ({
  targetRef,
  IntersactionObserverOptions,
  handler,
}) => {
  const observer = useRef(null)

  const handleIntersection = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        // Check if the target element is intersecting with the viewport
        if (entry.isIntersecting) {
          // Call the provided getData function to fetch more data
          handler()
        }
      })
    },
    [handler]
  )

  useEffect(() => {
    if (targetRef.current) {
      // Create a new IntersectionObserver instance
      observer.current = new IntersectionObserver(
        handleIntersection,
        IntersactionObserverOptions
      )
      observer.current.observe(targetRef.current)
    }

    // Clean up
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [targetRef, IntersactionObserverOptions, handleIntersection])

  return observer.current
}

export default useInfiniteScroll
