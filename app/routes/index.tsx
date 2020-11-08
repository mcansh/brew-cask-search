import React from 'react';
import { useRouteData } from '@remix-run/react';
import { matchSorter } from 'match-sorter';

import type { Cask } from '../../@types/cask-response';

function meta() {
  return {
    title: 'Homebrew Cask Search',
    description: 'Search homebrew casks',
  };
}

const Index: React.VFC = () => {
  const casks = useRouteData<Cask[]>();
  const [search, setSearch] = React.useState<string>('');
  const [results, setResults] = React.useState<Cask[]>([]);

  return (
    <div className="flex flex-col items-center h-full py-4">
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
            value={search}
            onChange={event => {
              setSearch(event.currentTarget.value);
              const matches = matchSorter(casks, event.currentTarget.value, {
                keys: ['token', 'name'],
              });
              setResults(matches);
            }}
          />
        </label>
      </form>

      <div className="w-full max-w-screen-lg pt-4 mx-auto">
        {!search ? null : !results.length ? (
          <p>No Results</p>
        ) : (
          <ul className="grid grid-cols-4 gap-4 auto-rows-fr">
            {results.map(cask => {
              const websiteUrl = new URL(cask.homepage).hostname;

              const website = websiteUrl.startsWith('www.')
                ? websiteUrl.slice(4)
                : websiteUrl;

              return (
                <li key={cask.token}>
                  <div className="flex flex-col h-full p-2 space-y-2 bg-gray-200 rounded dark:bg-gray-900">
                    <div className="flex-auto space-y-2">
                      <h2>{cask.name[0]}</h2>
                      {cask.desc && <p>{cask.desc}</p>}
                    </div>
                    <a href={cask.homepage}>{website}</a>
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
