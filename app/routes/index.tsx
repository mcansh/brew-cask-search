import React from "react";
import { useRouteData } from "@remix-run/react";
import { matchSorter } from "match-sorter";
import { Cask } from "../../@types/cask-response";

function meta() {
  return {
    title: "Homebrew Cask Search",
    description: "Search homebrew casks",
  };
}

const Index: React.VFC = () => {
  let casks = useRouteData<Cask[]>();
  const [search, setSearch] = React.useState<string>("");
  const [results, setResults] = React.useState<Cask[]>([]);

  return (
    <div className="flex flex-col items-center h-full max-w-screen-sm py-4 mx-auto">
      <h1 className="text-2xl">Homebrew Cask Search</h1>
      <p>
        Quickly search for a cask in the{" "}
        <a
          className="text-indigo-400 transition-colors duration-75 ease-in-out hover:text-indigo-200 dark:hover:text-indigo-600 hover:underline"
          href="https://github.com/Homebrew/homebrew-cask"
        >
          homebrew
        </a>{" "}
        repo.
      </p>
      <form onSubmit={(event) => event.preventDefault()} className="w-full">
        <label>
          <span className="block">Search for a Cask</span>
          <input
            className="w-full px-4 py-1 text-black border border-current rounded dark:border-white"
            type="text"
            name="cask-search"
            id="cask-search"
            placeholder="Visual Studio Code"
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value);
              const matches = matchSorter(casks, event.currentTarget.value, {
                keys: ["token", "name"],
              });
              setResults(matches);
            }}
          />
        </label>
      </form>

      <div className="w-full pt-4">
        {!search ? null : !results.length ? (
          <p>No Results</p>
        ) : (
          <ul>
            {results.map((cask) => (
              <li key={cask.token}>
                <a
                  className="text-indigo-400 transition-colors duration-75 ease-in-out hover:text-indigo-200 dark:hover:text-indigo-600 hover:underline"
                  href={cask.homepage}
                >
                  {cask.name.join(", ")}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Index;
export { meta };
