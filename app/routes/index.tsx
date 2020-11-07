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
    <div>
      <h2>Homebrew Cask Search</h2>
      <p>
        Quickly search for a cask in the{" "}
        <a href="https://github.com/Homebrew/homebrew-cask">cask</a> repo.
      </p>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          <input
            type="text"
            name="cask-search"
            id="cask-search"
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

      {!search ? null : !results.length ? (
        <p>No Results</p>
      ) : (
        <ul>
          {results.map((cask) => (
            <li key={cask.token}>
              <a href={cask.homepage}>{cask.name.join(", ")}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Index;
export { meta };
