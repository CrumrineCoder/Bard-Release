import { useState, useEffect, useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false);
    /*
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  */
    const handleOnDocumentBottom = useCallback(() => {
      //  console.log('I am at bottom! ' + Math.round(performance.now()))
        setIsFetching(true);
        if (callback) {
        //      alert('Bottom hit! Too slow? Reduce "debounce" value in props')
            
        }
    }, [callback])
    useBottomScrollListener(handleOnDocumentBottom);
    useEffect(() => {
        if (!isFetching) return;
        callback(() => {
     //       console.log('called back');
        });
    }, [isFetching]);
    /*
    function handleScroll() {
        console.log("equation");
        console.log(window.innerHeight)
        console.log(document.documentElement.scrollTop)   
        console.log(document.documentElement.offsetHeight )
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
      console.log("true");
      setIsFetching(true);
    } */


    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;