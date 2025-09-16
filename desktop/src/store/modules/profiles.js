import { SubscriptionManager } from '../../../core/src/subscription/SubscriptionManager';
import { ElectronStorageAdapter } from '../../../core/src/storage/ElectronStorageAdapter';

const storageAdapter = new ElectronStorageAdapter();
const subscriptionManager = new SubscriptionManager(storageAdapter, 'MAIN_PROFILE');

// Load on init
subscriptionManager.loadProfiles().catch(console.error);

const state = {
  profileList: subscriptionManager.profiles,
  activeProfile: 'MAIN_PROFILE'
};

const getters = {
  getSubscribedChannelIdSet: () => subscriptionManager.getSubscribedChannelIdSet(),
};

const mutations = {
  ADD_CHANNEL(state, { channel, profileIds }) {
    subscriptionManager.addChannelToProfiles(channel, profileIds);
    state.profileList = [...subscriptionManager.profiles];
  },
  REMOVE_CHANNEL(state, { channelId, profileIds }) {
    subscriptionManager.removeChannelFromProfiles(channelId, profileIds);
    state.profileList = [...subscriptionManager.profiles];
  },
};

const actions = {
  addChannel({ commit }, payload) {
    commit('ADD_CHANNEL', payload);
  },
  removeChannel({ commit }, payload) {
    commit('REMOVE_CHANNEL', payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};