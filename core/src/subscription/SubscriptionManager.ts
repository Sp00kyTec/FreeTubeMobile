import { IStorage } from '../storage/IStorage';

export interface SubscribedChannel {
  id: string;
  name: string;
  thumbnail: string;
}

export interface Profile {
  _id: string;
  name: string;
  subscriptions: SubscribedChannel[];
}

export class SubscriptionManager {
  private storage: IStorage;
  private profiles: Profile[] = [];
  private activeProfileId: string;

  constructor(storage: IStorage, mainProfileId: string = 'MAIN_PROFILE') {
    this.storage = storage;
    this.activeProfileId = mainProfileId;
  }

  async loadProfiles(): Promise<Profile[]> {
    const loaded = await this.storage.load<Profile[]>('profileList');
    this.profiles = loaded || [{
      _id: this.activeProfileId,
      name: 'All Channels',
      subscriptions: []
    }];
    return this.profiles;
  }

  async saveProfiles(): Promise<void> {
    await this.storage.save('profileList', this.profiles);
  }

  getMainProfile(): Profile {
    return this.profiles.find(p => p._id === this.activeProfileId) || this.profiles[0];
  }

  getSubscribedChannelIdSet(): Set<string> {
    const mainProfile = this.getMainProfile();
    return new Set(mainProfile.subscriptions.map(channel => channel.id));
  }

  addChannelToProfiles(channel: SubscribedChannel, profileIds: string[] = [this.activeProfileId]): void {
    for (const id of profileIds) {
      const profile = this.profiles.find(p => p._id === id);
      if (profile && !profile.subscriptions.some(c => c.id === channel.id)) {
        profile.subscriptions.push(channel);
      }
    }
    this.saveProfiles();
  }

  removeChannelFromProfiles(channelId: string, profileIds: string[] = [this.activeProfileId]): void {
    for (const id of profileIds) {
      const profile = this.profiles.find(p => p._id === id);
      if (profile) {
        profile.subscriptions = profile.subscriptions.filter(c => c.id !== channelId);
      }
    }
    this.saveProfiles();
  }
}