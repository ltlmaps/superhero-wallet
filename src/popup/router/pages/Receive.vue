<template>
  <div class="popup popup-no-padding">
    <div data-cy="top-up-container">
      <p class="primary-title text-left mt-20 f-14 mx-20" style="margin-left:20px !important">
        {{ $t('pages.receive.heading') }}
      </p>
      <AccountInfo />
      <qrcode-vue :value="account.publicKey" size="140" class="my-25 qrcode"></qrcode-vue>

      <Button @click="purchase">{{ $t('pages.receive.purchase') }}</Button>
      <Button @click="exchange">{{ $t('pages.receive.transferExchange') }}</Button>
      <Button data-cy="home" @click="navigateAccount">{{ $t('pages.receive.home') }}</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QrcodeVue from 'qrcode.vue';
import AccountInfo from '../components/AccountInfo';
import openUrl from '../../utils/openUrl';

export default {
  name: 'Receive',
  components: {
    QrcodeVue,
    AccountInfo,
  },
  data() {
    return {
      jellySwapUrl: 'https://app.jelly.market',
      shopUniverse: 'https://shop.aeternityuniverse.com',
    };
  },
  computed: mapGetters(['account']),
  methods: {
    navigateAccount() {
      this.$router.push('/account');
    },
    exchange() {
      openUrl(this.jellySwapUrl);
    },
    purchase() {
      openUrl(this.shopUniverse);
    },
  },
};
</script>
<style>
.qrcode canvas {
  border: 5px solid #fff;
}
</style>
