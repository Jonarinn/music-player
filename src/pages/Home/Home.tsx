import React, { useEffect, useState } from "react";
import "./home.scss";
import { HistoryItem, OutletContextType } from "../../types";
import { Link, useOutletContext } from "react-router-dom";

const Home: React.FC = () => {
  const { userData } = useOutletContext() as OutletContextType;

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  if (userData)
    return (
      <div>
        <h1>Home</h1>
        <section>
          <h2>Recent Searches</h2>
          {userData.history && userData.history.length > 0 && (
            <article className="recent-search-wrapper">
              {userData.history.slice(0, 6).map((item: HistoryItem) => {
                return <RecentSearch key={item.id} item={item} />;
              })}
            </article>
          )}
        </section>
        <section>
          <h2>Your Artists</h2>
        </section>
      </div>
    );
  else return <></>;
};

type RecentSearchProps = {
  item: HistoryItem;
};

const RecentSearch: React.FC<RecentSearchProps> = ({ item }) => {
  return (
    <Link to={`/${item.type}/${item.id}`} className="recent-search">
      <img src={item.image} />
      <h3>{item.name}</h3>
    </Link>
  );
};
export default Home;
