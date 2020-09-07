import React from "react";
import styled from "styled-components/macro";
import { Switch, Route } from "react-router-dom";

import useFormInput from "../hooks/useFormInput";
import useFriendships from "../hooks/useFriendships";
import Tile from "../Tile/Tile";

const SettingsPage = ({
  friendshipId,
  friendshipHarmony,
  friendshipRandomness,
}) => {
  const [harmony, bindHarmony] = useFormInput(friendshipHarmony);
  const [randomness, bindRandomness] = useFormInput(friendshipRandomness);

  const { updateFriendship } = useFriendships();

  const handleSubmit = (e) => {
    e.preventDefault();

    updateFriendship(friendshipId, { harmony, randomness });
  };

  return (
    <Tile>
      <form onSubmit={handleSubmit} className="pure-form">
        <fieldset>
          <input
            {...bindHarmony}
            type="number"
            placeholder="Harmony Coefficient"
            min="0"
            max="2"
            step="any"
          />
          <input
            {...bindRandomness}
            type="number"
            placeholder="Randomness Factor"
            min="0"
            max="5"
            step="any"
          />

          <button type="submit" className="pure-button">
            Update Settings
          </button>
        </fieldset>
      </form>
    </Tile>
  );
};

export default SettingsPage;
