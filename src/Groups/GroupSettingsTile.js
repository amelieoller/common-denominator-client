import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import Tile from "../Tile/Tile";

const StatusBar = ({ val, steps, max, label, description, handleUpdate }) => {
  const [value, setValue] = useState(val);

  const increment = () => updateValue(value + steps);
  const decrement = () => updateValue(value - steps);

  const updateValue = (newVal) => {
    if (newVal > max || newVal < 0) return;

    handleUpdate(newVal);
    setValue(newVal);
  };

  return (
    <StyledStatus>
      <StyledStatusBar>
        <i className="fas fa-plus" onClick={increment}></i>
        <StyledBar percentage={(value / max) * 100}>
          <div className="progress-bar progress"></div>
        </StyledBar>
        <i className="fas fa-minus" onClick={decrement}></i>
      </StyledStatusBar>
      <Label>{label}</Label>
      <Description>{description}</Description>
    </StyledStatus>
  );
};

const StyledStatus = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-size: 14px;
  line-height: 16px;
`;

const Description = styled.div`
  font-size: 11px;
  line-height: 11px;
  font-style: italic;
`;

const StyledStatusBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  i {
    cursor: pointer;
    color: #757575;
    font-size: 13px;
    padding: 3px;

    &:hover {
      color: #bfbfbf;
    }
  }
`;

const StyledBar = styled.div`
  background: #d5d5d5;
  border-radius: ${({ theme }) => theme.borderRadiusSmall};
  width: 25px;
  display: flex;
  overflow: hidden;
  height: 40px;
  align-items: flex-end;
  flex: 1;

  .progress-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    text-align: center;
    background-color: #007bff;
    transition: height 0.6s ease;
    height: ${({ percentage }) => `${percentage}%`};
    width: 100%;
  }
`;

const GroupSettingsTile = ({ group, firebase }) => {
  const [harmony, setHarmony] = useState(group.harmony);
  const [randomness, setRandomness] = useState(group.randomness);
  const [vetoes, setVetoes] = useState(group.vetoes);
  const [savingStarted, setSavingStarted] = useState(false);
  const [needsToBeSaved, setNeedsToBeSaved] = useState(false);

  const saveSettings = () => {
    if (needsToBeSaved) {
      setNeedsToBeSaved(false);

      firebase.group(group.uid).update({
        harmony: harmony,
        randomness: randomness,
        vetoes: vetoes,
        editedAt: firebase.fieldValue.serverTimestamp(),
      });
    }
  };

  useEffect(() => {
    let timeout;

    if (!needsToBeSaved && !savingStarted) {
      setSavingStarted(true);

      timeout = setTimeout(() => {
        setSavingStarted(false);
        setNeedsToBeSaved(true);
      }, 4000);
    }

    return () => {
      saveSettings();
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [harmony, randomness, vetoes, group.uid]);

  useEffect(() => {
    saveSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsToBeSaved]);

  const handleUpdate = (newVal, cb) => {
    cb(newVal);
  };

  return (
    <Tile>
      <StyledGroupSettings>
        {/* <span>Group Settings</span> */}
        <StyledStatusBars>
          <StatusBar
            val={harmony}
            max={10}
            steps={1}
            label="Harmony"
            description="Item values match more closely"
            firebase={firebase}
            handleUpdate={(newVal) => handleUpdate(newVal, setHarmony)}
          />
          <StatusBar
            val={randomness}
            max={5}
            steps={1}
            label="Randomness"
            description="Pick more by random"
            firebase={firebase}
            handleUpdate={(newVal) => handleUpdate(newVal, setRandomness)}
          />
          <StatusBar
            val={vetoes}
            max={10}
            steps={1}
            label="Vetoes"
            description="Amount of items that can be 0"
            firebase={firebase}
            handleUpdate={(newVal) => handleUpdate(newVal, setVetoes)}
          />
        </StyledStatusBars>
      </StyledGroupSettings>
    </Tile>
  );
};

const StyledGroupSettings = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledStatusBars = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  height: 100%;
`;

GroupSettingsTile.propTypes = {};

export default GroupSettingsTile;
