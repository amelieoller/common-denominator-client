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
  friendshipVetoes,
}) => {
  const [harmony, bindHarmony] = useFormInput(friendshipHarmony);
  const [randomness, bindRandomness] = useFormInput(friendshipRandomness);
  const [vetoes, bindVetoes] = useFormInput(friendshipVetoes);

  const { updateFriendship } = useFriendships();

  const handleSubmit = (e) => {
    e.preventDefault();

    updateFriendship(friendshipId, { harmony, randomness, vetoes: +vetoes });
  };

  return (
    <Tile>
      <FormWrapper onSubmit={handleSubmit} className="pure-form">
        <InputWrapper>
          <div>
            <label htmlFor="harmony">Harmony</label>
            <input
              {...bindHarmony}
              id="harmony"
              type="number"
              placeholder="Harmony Coefficient"
              min="0"
              max="2"
              step="any"
            />
          </div>

          <div>
            <label htmlFor="randomness">Randomness</label>
            <input
              {...bindRandomness}
              id="randomness"
              type="number"
              placeholder="Randomness Factor"
              min="0"
              max="5"
              step="any"
            />
          </div>

          <div>
            <label htmlFor="vetoes">Vetoes (%)</label>
            <input
              {...bindVetoes}
              id="vetoes"
              type="number"
              placeholder="Vetoes"
              min="0"
              max="100"
            />
          </div>
        </InputWrapper>

        <button type="submit" className="pure-button">
          Update Settings
        </button>
      </FormWrapper>
    </Tile>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`;

export default SettingsPage;
