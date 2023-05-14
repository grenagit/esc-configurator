import {
  createSlice,
  current,
} from '@reduxjs/toolkit';

import { loadSettings } from '../../utils/LocalStorage';

const initialState = {
  show: false,
  settings: loadSettings(),
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    show: (state) => {
      state.show = true;
    },
    hide: (state) => {
      state.show = false;
    },
    update: (state, action) => {
      const payload = action.payload;

      const settings = { ...current(state.settings) };
      const newSetting = { ...settings[payload.name] };
      newSetting.value = payload.value;
      settings[payload.name] = newSetting;
      state.settings = settings;

      localStorage.setItem('settings', JSON.stringify(settings));
    },
  },
});

export const {
  hide,
  show,
  update,
} = settingsSlice.actions;

export const selectShow = (state) => state.settings.show;
export const selectSettings = (state) => state.settings.settings;

export default settingsSlice.reducer;
