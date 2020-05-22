import Universal from '@aeternity/aepp-sdk/es/ae/universal';
import Node from '@aeternity/aepp-sdk/es/node';
import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory';
import { isEmpty } from 'lodash-es';
import store from '../store';
import { postMessage } from '../popup/utils/connection';
import { parseFromStorage, middleware, getAllNetworks } from '../popup/utils/helper';
import { TIPPING_CONTRACT } from '../popup/utils/constants';
import Logger from './logger';

export default {
  countError: 0,
  async init() {
    const { account } = store.getters;
    if (isEmpty(account)) {
      store.commit('SET_MAIN_LOADING', false);
      return { loggedIn: false };
    }
    const address = await store.dispatch('generateWallet', { seed: account.privateKey });
    store.commit('UPDATE_ACCOUNT', account);
    store.commit('SET_ACTIVE_ACCOUNT', { publicKey: address, index: 0 });

    store.commit('SWITCH_LOGGED_IN', true);

    /* Get network */
    const networks = await getAllNetworks();
    store.commit('SET_NETWORKS', networks);

    store.commit('SET_MAIN_LOADING', false);
    return { loggedIn: true };
  },
  async initMiddleware() {
    const { network, current } = store.getters;
    store.commit('SET_MIDDLEWARE', (await middleware(network, current)).api);
    store.dispatch('getRegisteredNames');
  },
  async initSdk() {
    const keypair = await this.getKeyPair();
    if (keypair.error) {
      await this.logout();
      return;
    }

    const { network, current } = store.getters;
    const node = await Node({
      url: network[current.network].internalUrl,
      internalUrl: network[current.network].internalUrl,
    });
    const account = MemoryAccount({ keypair });
    try {
      const [Ae, ChainNode, Transaction, Contract, Aens, Oracle, GeneralizeAccount] = (
        await Promise.all([
          import('@aeternity/aepp-sdk/es/ae'),
          import('@aeternity/aepp-sdk/es/chain/node'),
          import('@aeternity/aepp-sdk/es/tx/tx'),
          import('@aeternity/aepp-sdk/es/ae/contract'),
          import('@aeternity/aepp-sdk/es/ae/aens'),
          import('@aeternity/aepp-sdk/es/ae/oracle'),
          import('@aeternity/aepp-sdk/es/contract/ga'),
        ])
      ).map(module => module.default);
      const sdk = await Ae.compose(
        ChainNode,
        Transaction,
        Contract,
        Aens,
        Oracle,
        GeneralizeAccount,
        {
          methods: {
            address: async () => store.getters.account.publicKey,
            sign: data => store.dispatch('accounts/sign', data),
            signTransaction: (txBase64, opt) =>
              store.dispatch('accounts/signTransaction', { txBase64, opt }),
          },
        },
      )({
        nodes: [{ name: current.network, instance: node }],
        accounts: [account],
        networkId: network[current.network].networkId,
        nativeMode: true,
        compilerUrl: network[current.network].compilerUrl,
      });
      await store.dispatch('initSdk', sdk);
      await this.initContractInstances();
      await this.initMiddleware();
      store.commit('SET_NODE_STATUS', 'connected');
      setTimeout(() => store.commit('SET_NODE_STATUS', ''), 2000);
    } catch (e) {
      this.countError += 1;
      if (this.countError < 3) await this.initSdk();
      else {
        store.commit('SET_NODE_STATUS', 'error');
        Logger.write(e);
      }
    }
  },
  async logout() {
    store.commit('SET_ACTIVE_ACCOUNT', { publicKey: '', index: 0 });
    store.commit('UNSET_SUBACCOUNTS');
    store.commit('UPDATE_ACCOUNT', {});
    store.commit('SWITCH_LOGGED_IN', false);
  },
  async getKeyPair() {
    const { activeAccount } = store.getters;
    const { account } = store.getters;
    const res = await postMessage({ type: 'getKeypair', payload: { activeAccount, account } });
    return res.error ? { error: true } : parseFromStorage(res);
  },
  async initContractInstances() {
    const contractAddress = await store.dispatch('getTipContractAddress');
    store.commit(
      'SET_TIPPING',
      await store.getters.sdk.getContractInstance(TIPPING_CONTRACT, {
        contractAddress,
        forceCodeCheck: true,
      }),
    );
  },
};
