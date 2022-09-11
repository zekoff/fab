import { Box, Input, Slider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Reward } from "../util/firestoreClasses";
import BrowseItems from "./BrowseItems";

const XP_DEFAULT = 20;
const XP_STEP = 5;
const XP_MAX = 100;
const COINS_DEFAULT = 100;
const COINS_STEP = 10;
const COINS_MAX = 1500;

function CreateReward({ includeItems, rewardCallback }) {
  const [xpAmount, setXpAmount] = useState(XP_DEFAULT);
  const [coinsAmount, setCoinsAmount] = useState(COINS_DEFAULT);
  const [items, setItems] = useState([]);

  const handleXpValueChange = (event) => {
    const xpValue = event.target.value
    setXpAmount(xpValue === '' ? '' : Number(xpValue));
    rewardCallback(Reward.fromObject({ xp: xpAmount, coins: coinsAmount, items: items }));
  };
  const handleXpSliderChange = (event, newValue) => {
    setXpAmount(newValue);
    rewardCallback(Reward.fromObject({ xp: xpAmount, coins: coinsAmount, items: items }));
  };
  const handleXpBlur = () => {
    if (!xpAmount) setXpAmount(0);
    if (xpAmount < 0) setXpAmount(0);
    if (xpAmount > XP_MAX) setXpAmount(XP_MAX);
    rewardCallback(Reward.fromObject({ xp: xpAmount, coins: coinsAmount, items: items }));
  };

  const handleCoinsValueChange = (event) => {
    const coinsValue = event.target.value;
    setCoinsAmount(coinsValue === '' ? '' : Number(coinsValue));
    rewardCallback(Reward.fromObject({ xp: xpAmount, coins: coinsAmount, items: items }));
  };
  const handleCoinsSliderChange = (event, newValue) => {
    setCoinsAmount(newValue);
    rewardCallback(Reward.fromObject({ xp: xpAmount, coins: coinsAmount, items: items }));
  };
  const handleCoinsBlur = () => {
    if (!coinsAmount) setCoinsAmount(0);
    if (coinsAmount < 0) setCoinsAmount(0);
    if (coinsAmount > COINS_MAX) setCoinsAmount(COINS_MAX);
    rewardCallback(Reward.fromObject({ xp: xpAmount, coins: coinsAmount, items: items }));
  };

  return (<>
    <Box sx={{ border: 1, borderRadius: 2, p: 2, m: 1 }}>
      <Typography gutterBottom>XP Amount</Typography>
      <Stack direction="row" spacing={2}>
        <Slider value={typeof xpAmount === 'number' ? xpAmount : 0}
          valueLabelDisplay="auto" marks
          onChange={handleXpSliderChange} step={XP_STEP} max={XP_MAX} />
        <Input value={xpAmount} onChange={handleXpValueChange}
          onBlur={handleXpBlur} endAdornment={"XP"}
          inputProps={{ step: XP_STEP, min: 0, max: XP_MAX, type: 'number' }} />
      </Stack>
    </Box>
    <Box sx={{ border: 1, borderRadius: 2, p: 2, m: 1 }}>
      <Typography gutterBottom>Coins</Typography>
      <Stack direction="row" spacing={2}>
        <Slider value={typeof coinsAmount === 'number' ? coinsAmount : 0}
          valueLabelDisplay="auto"
          onChange={handleCoinsSliderChange} step={COINS_STEP} max={COINS_MAX} />
        <Input value={coinsAmount} onChange={handleCoinsValueChange}
          onBlur={handleCoinsBlur} endAdornment={"coins"}
          inputProps={{ step: COINS_STEP, min: 0, max: COINS_MAX, type: 'number' }} />
      </Stack>
    </Box>
    {includeItems ? <BrowseItems selectedItemCallback={(item) => {
      console.log(item);
      setItems(items => {
        items.push(item.id);
        rewardCallback(Reward.fromObject({ xp: xpAmount, coins: coinsAmount, items: items }));
        return items;
      });
    }} /> : null}
  </>)
}

export default CreateReward;