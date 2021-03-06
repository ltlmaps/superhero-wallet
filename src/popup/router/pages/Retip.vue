<template>
  <div class="popup">
    <div class="section-title">
      {{ $t('pages.tipPage.url') }}
    </div>

    <div class="url-bar">
      <UrlStatus :status="urlStatus" info />
      <a class="link-sm text-left">{{ tip.url }}</a>
    </div>

    <AmountSend
      :amountError="amountError"
      @changeAmount="val => (amount = val)"
      :value="amount"
      :errorMsg="amount && amount < minTipAmount"
    />
    <div class="tip-note-preview mt-15">
      {{ tip.title }}
    </div>

    <Button @click="sendTip" :disabled="amountError || !minCallFee || !tipping">
      {{ $t('pages.tipPage.confirm') }}
    </Button>
    <Button @click="cancel">
      {{ $t('pages.tipPage.cancel') }}
    </Button>

    <Loader size="big" :loading="loading" type="transparent" content="" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import BigNumber from 'bignumber.js';
import tipping from 'aepp-raendom/src/utils/tippingContractUtil';
import { MAGNITUDE, calculateFee, TX_TYPES } from '../../utils/constants';
import openUrl from '../../utils/openUrl';
import AmountSend from '../components/AmountSend';
import UrlStatus from '../components/UrlStatus';

export default {
  components: { AmountSend, UrlStatus },
  data: () => ({
    tip: {},
    amount: null,
    amountError: false,
    loading: false,
    minCallFee: null,
  }),
  computed: {
    ...mapGetters([
      'balance',
      'tipping',
      'current',
      'sdk',
      'account',
      'network',
      'currentCurrency',
    ]),
    ...mapState(['tippingAddress', 'minTipAmount']),
    maxValue() {
      const calculatedMaxValue = this.balance - this.minCallFee;
      return calculatedMaxValue > 0 ? calculatedMaxValue.toString() : 0;
    },
    urlStatus() {
      return this.$store.getters['tipUrl/status'](this.tip.url);
    },
    urlParams() {
      return new URL(this.$route.fullPath, window.location).searchParams;
    },
  },
  watch: {
    amount() {
      this.amountError = !+this.amount || this.amount < this.minTipAmount;
    },
  },
  async created() {
    this.loading = true;
    await this.$watchUntilTruly(() => this.sdk && this.tippingAddress);
    this.minCallFee = calculateFee(TX_TYPES.contractCall, {
      ...this.sdk.Ae.defaults,
      contractId: this.tippingAddress,
      callerId: this.account.publicKey,
    }).min;
    await this.$watchUntilTruly(() => this.tipping);
    const tipId = +this.urlParams.get('id');
    if (!tipId) throw new Error('"id" param is missed');
    const { decodedResult } = await this.tipping.methods.get_state();
    this.tip = tipping.getTipsRetips(decodedResult).tips.find(({ id }) => id === tipId);
    this.loading = false;
  },
  methods: {
    openCallbackOrGoHome(paramName) {
      const callbackUrl = this.urlParams.get(paramName);
      if (callbackUrl) openUrl(decodeURIComponent(callbackUrl));
      else this.$router.push('/account');
    },
    async sendTip() {
      this.amountError = !this.amount || !this.minCallFee || this.maxValue - this.amount <= 0;
      this.amountError = this.amountError || !+this.amount || this.amount < this.minTipAmount;
      if (this.amountError) return;
      const amount = BigNumber(this.amount).shiftedBy(MAGNITUDE);
      this.loading = true;
      try {
        const { hash } = await this.tipping.methods.retip(this.tip.id, {
          amount,
          waitMined: false,
        });
        if (hash) {
          await this.$store.dispatch('setPendingTx', {
            hash,
            amount: this.amount,
            domain: this.tip.url,
            time: Date.now(),
            type: 'tip',
          });
          this.openCallbackOrGoHome('x-success');
        }
      } catch (e) {
        this.$store.dispatch('modals/open', { name: 'default', type: 'transaction-failed' });
        e.payload = this.tip;
        throw e;
      } finally {
        this.loading = false;
      }
    },
    cancel() {
      this.openCallbackOrGoHome('x-cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../common/variables';
.url-bar {
  display: flex;
  align-items: center;

  a {
    color: $text-color;
    flex-grow: 1;
    text-decoration: none;
    width: 90%;
    margin-left: 10px;
  }
}
.section-title {
  margin-bottom: 8px;
  margin-top: 16px;
  font-size: 16px;
  color: $white-color;
  font-weight: 400;
  text-align: left;
}
</style>
