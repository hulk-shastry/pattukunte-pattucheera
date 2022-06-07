import React from "react";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import withURLSync from "./algolia/URLSync";
import "./styles/App.css";
import { useLocalStorage } from "./hooks/useLocalStorage";
import PropTypes from "prop-types";
import { customStyles } from "./styles/styles";
import { ALGOLIA_CLIENT, dayCount, GAME_STATUS } from "./utils/constants";
import algoliasearch from "algoliasearch/lite";

import Game from "./components/Game";
import Stats from "./components/Stats";
import ImagesContainer from "./components/ImagesContainer";
import statsLogo from "./assets/stats.svg";
import rulesLogo from "./assets/rules.svg";
import RulesModal from "./components/RulesModal";
const searchClient = algoliasearch("latency", ALGOLIA_CLIENT);

const App = (props) => {
  const { searchState, createURL, onSearchStateChange } = props;
  const [currentIndexFromStorage, setCurrentIndexFromStorage] = useLocalStorage("currentIndex", 1);
  const [buttonLogic, setButtonLogic] = React.useState(false);
  const [currentIndexFromButton, setCurrentIndexFromButton] =
    React.useState(currentIndexFromStorage);
  const [currentGuesses, setCurrentGuesses] = useLocalStorage("currentGuesses", "");
  const [gameStatus, setGameStatus] = useLocalStorage("gameStatus", GAME_STATUS.RUNNING);
  const [day, setDay] = useLocalStorage("day", 1);
  const [openStatsModal, setOpenStatsModal] = React.useState(false);
  const [openRulesModal, setOpenRulesModal] = React.useState(false);
  const [guessDistribution, setGuessDistribution] = useLocalStorage("guessDistribution", "");
  const initialStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0
  };

  const [stats, setStats] = useLocalStorage("stats", JSON.stringify(initialStats));

  const statsObj = React.useMemo(() => {
    return typeof stats === "string" ? JSON.parse(stats) : stats;
  }, [stats]);

  React.useEffect(() => {
    if (day !== dayCount + 1) {
      setGameStatus(GAME_STATUS.RUNNING);
      setDay(dayCount + 1);
      setCurrentGuesses("");
      setCurrentIndexFromStorage(1);
    }
  }, [day, setCurrentGuesses, setCurrentIndexFromStorage, setDay, setGameStatus]);
  return (
    <div style={customStyles.backgroundStyle}>
      <div style={customStyles.headerStyle}>Pattukunte Pattucheera</div>
      <span style={customStyles.statsStyle}>
        <img
          className="stats-icon"
          onClick={() => setOpenStatsModal(true)}
          src={statsLogo}
          alt="stats"
        />
        <img
          className="rules-icon"
          onClick={() => setOpenRulesModal(true)}
          src={rulesLogo}
          alt="rules"
        />
      </span>
      <Stats
        openStatsModal={openStatsModal}
        setOpenStatsModal={setOpenStatsModal}
        statsObj={statsObj}
      />
      <RulesModal openRulesModal={openRulesModal} setOpenRulesModal={setOpenRulesModal} />
      <div style={customStyles.column}>
        <InstantSearch
          searchClient={searchClient}
          indexName="movies"
          searchState={searchState}
          createURL={createURL}
          onSearchStateChange={onSearchStateChange}>
          <Configure hitsPerPage={10} />
          <ImagesContainer
            buttonLogic={buttonLogic}
            setButtonLogic={setButtonLogic}
            currentIndexFromButton={currentIndexFromButton}
            currentIndexFromStorage={currentIndexFromStorage}
            setCurrentIndexFromButton={setCurrentIndexFromButton}
            gameStatus={gameStatus}
          />
          <Game
            currentIndex={currentIndexFromStorage}
            setCurrentIndex={setCurrentIndexFromStorage}
            currentIndexFromButton={currentIndexFromButton}
            setCurrentIndexFromButton={setCurrentIndexFromButton}
            guessDistribution={guessDistribution}
            setGuessDistribution={setGuessDistribution}
            currentGuesses={currentGuesses}
            setCurrentGuesses={setCurrentGuesses}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            day={day}
            setDay={setDay}
            setStats={setStats}
            stats={stats}
            gameStats={statsObj}
          />
        </InstantSearch>
      </div>
    </div>
  );
};

App.propTypes = {
  searchState: PropTypes.object,
  createURL: PropTypes.func,
  onSearchStateChange: PropTypes.func
};

export default withURLSync(App);
