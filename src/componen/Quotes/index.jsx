import { useState } from 'react';
import Button from '../Button';
import Style from './quote.module.css';
import { useEffect } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

function Quotes() {
  const [quote, setQuote] = useState({});
  const [isLoading, setIsloading] = useState();
  async function getQuote(controller) {
    setIsloading(true);
    const signal = controller.signal;
    const res = await fetch('https://api.quotable.io/random', { signal });
    const data = await res.json();
    setQuote(data);
    setIsloading(false);
  }

  useEffect(() => {
    const controller = new AbortController();
    getQuote(controller);
    return () => {
      controller.abort();
    };
  }, []);

  function randomQuote() {
    const controller = new AbortController();
    getQuote(controller);
  }

  return (
    <div className={Style.container}>
      <h2 className={Style.title}>quote History</h2>
      {isLoading ? (
        <PuffLoader
          color='blue'
          size={40}
          cssOverride={{ marginBlock: '1rem' }}
        />
      ) : (
        <>
          <h4 className={Style.quote}>{`"${quote.content}"`}</h4>
        </>
      )}

      <Button onClick={randomQuote} disabled={isLoading}>
        {' '}
        Generates
      </Button>
    </div>
  );
}
export default Quotes;
