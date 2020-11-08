import React, { useEffect, useState } from 'react';
import { useRouteData } from '@remix-run/react';
import { matchSorter } from 'match-sorter';

import type { Cask } from '../../@types/cask-response';

function meta() {
  return {
    title: 'Homebrew Cask Search',
    description: 'Search homebrew casks',
  };
}

// Our hook
function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}

const Index: React.VFC = () => {
  const casks = useRouteData<Cask[]>();
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Cask[]>([]);
  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const matches = matchSorter(casks, debouncedSearchTerm, {
        keys: ['token', 'name'],
      });

      setResults(matches);
    } else {
      setResults([]);
    }
  }, [casks, debouncedSearchTerm]);

  return (
    <div className="flex flex-col items-center min-h-full py-4">
      <h1 className="text-2xl">Homebrew Cask Search</h1>
      <p>
        Quickly search for a cask in the{' '}
        <a
          className="text-indigo-400 transition-colors duration-75 ease-in-out hover:text-indigo-200 dark:hover:text-indigo-600 hover:underline"
          href="https://github.com/Homebrew/homebrew-cask"
        >
          homebrew
        </a>{' '}
        repo.
      </p>
      <form
        onSubmit={event => event.preventDefault()}
        className="w-full max-w-screen-sm mx-auto"
      >
        <label>
          <span className="block">Search for a Cask</span>
          <input
            className="w-full px-4 py-1 text-black border border-current rounded dark:border-white"
            type="text"
            name="cask-search"
            id="cask-search"
            placeholder="Visual Studio Code"
            onChange={event => setSearch(event.target.value)}
            value={search}
          />
        </label>
      </form>

      <div className="w-full max-w-screen-lg pt-4 mx-auto">
        {results.length > 0 && (
          <ul className="grid grid-cols-4 gap-4 auto-rows-fr">
            {results.map(cask => {
              const websiteUrl = new URL(cask.homepage).hostname;

              const website = websiteUrl.startsWith('www.')
                ? websiteUrl.slice(4)
                : websiteUrl;

              return (
                <li key={cask.token}>
                  <div className="flex flex-col h-full p-2 duration-75 ease-in-out bg-gray-200 rounded dark:bg-gray-900 transform-gpu hover:scale-105">
                    <a
                      href={cask.homepage}
                      className="flex flex-col flex-auto space-y-2"
                    >
                      <h2>{cask.name[0]}</h2>
                      {cask.desc && <p>{cask.desc}</p>}
                      <span className="mt-auto truncate">{website}</span>
                    </a>
                    <a
                      href={`https://formulae.brew.sh/cask/${cask.token}#default`}
                    >
                      View on brew.sh
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Index;
export { meta };
