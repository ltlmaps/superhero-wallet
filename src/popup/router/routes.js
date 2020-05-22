import Index from './pages/Index';
import Account from './pages/Account';
import PopupSignTransaction from './pages/Popups/SignTx';
import PopupConnect from './pages/Popups/Connect';
import PopupAskAccounts from './pages/Popups/AskAccounts';
import PopupMessageSign from './pages/Popups/MessageSign';
import SignTransaction from './pages/SignTransaction';
import Settings from './pages/Settings';
import GeneralSettings from './pages/GeneralSettings';
import SecuritySettings from './pages/SecuritySettings';
import AboutSettings from './pages/AboutSettings';
import Tip from './pages/Tip';
import Retip from './pages/Retip';
import QrCodeReader from './pages/QrCodeReader';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ImportAccount from './pages/ImportAccount';
import Intro from './pages/Intro';
import Transactions from './pages/Transactions';
import Send from './pages/Send';
import Receive from './pages/Receive';
import SuccessTip from './pages/SuccessTip';
import Notifications from './pages/Notifications';
import Names from './pages/Names';
import AuctionBid from './pages/AuctionBid';
import Networks from './pages/Networks';
import CommentNew from './pages/CommentNew';
import NotFound from './pages/NotFound';
import ClaimTips from './pages/ClaimTips';
import DonateError from './pages/DonateError';
import Tokens from './pages/FungibleTokens/Index';
import DeployToken from './pages/FungibleTokens/Deploy';
import AddToken from './pages/FungibleTokens/Add';
import MintToken from './pages/FungibleTokens/Mint';
import Allowances from './pages/FungibleTokens/Allowances';
import ManageAllowances from './pages/FungibleTokens/ManageAllowances';
import AllAllowances from './pages/FungibleTokens/AllAllowances';

export default [
  {
    path: '/',
    component: Index,
    meta: {
      title: '',
      navigation: false,
      ifNotAuthOnly: true,
      notPersist: true,
    },
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    name: 'sign',
    path: '/sign-transaction/:type?',
    component: SignTransaction,
    props: true,
    meta: {
      notPersist: true,
    },
  },
  {
    name: 'popup-sign-tx',
    path: '/popup-sign-tx',
    component: PopupSignTransaction,
    props: true,
    meta: {
      notPersist: true,
    },
  },
  {
    name: 'connect',
    path: '/connect',
    component: PopupConnect,
    props: true,
    meta: {
      notPersist: true,
    },
  },
  {
    name: 'ask-accounts',
    path: '/ask-accounts',
    component: PopupAskAccounts,
    props: true,
    meta: {
      notPersist: true,
    },
  },
  {
    name: 'message-sign',
    path: '/message-sign',
    component: PopupMessageSign,
    props: true,
    meta: {
      notPersist: true,
    },
  },
  {
    path: '/settings',
    component: Settings,
    meta: {
      title: 'settings',
    },
  },
  {
    path: '/generalSettings',
    component: GeneralSettings,
    meta: {
      title: 'general',
    },
  },
  {
    path: '/securitySettings',
    component: SecuritySettings,
    meta: {
      title: 'security',
    },
  },
  {
    path: '/aboutSettings',
    component: AboutSettings,
    meta: {
      title: 'about',
    },
  },
  {
    path: '/tip',
    component: Tip,
    meta: {
      title: 'send',
    },
  },
  {
    path: '/retip',
    component: Retip,
    meta: {
      title: 'send',
      notPersist: true,
    },
  },
  {
    path: '/claim-tips',
    name: 'claim-tips',
    component: ClaimTips,
    meta: {
      title: 'claim-tips',
    },
  },
  {
    path: '/qrCodeReader',
    name: 'qrCodeReader',
    props: true,
    component: QrCodeReader,
    meta: {
      title: 'scanQr',
      notPersist: true,
    },
  },
  {
    path: '/termsOfService',
    component: TermsOfService,
    meta: {
      title: 'terms',
      ifNotAuth: true,
    },
  },
  {
    path: '/privacyPolicy',
    component: PrivacyPolicy,
    meta: {
      title: 'privacy',
    },
  },
  {
    path: '/importAccount',
    component: ImportAccount,
    meta: {
      title: 'importAccount',
      ifNotAuthOnly: true,
    },
  },
  {
    path: '/intro',
    component: Intro,
    meta: {
      ifNotAuthOnly: true,
      notPersist: true,
    },
  },

  {
    path: '/transactions',
    component: Transactions,
    meta: {
      title: 'activity',
    },
  },
  {
    path: '/send',
    name: 'send',
    props: true,
    component: Send,
    meta: {
      title: 'withdraw',
    },
  },
  {
    path: '/receive',
    component: Receive,
    meta: {
      title: 'topUp',
    },
  },
  {
    path: '/success-tip',
    component: SuccessTip,
    name: 'success-tip',
    props: true,
    meta: {
      title: 'send',
      notPersist: true,
    },
  },
  {
    path: '/notifications',
    component: Notifications,
    meta: {
      title: 'notifications',
      notPersist: true,
    },
  },
  {
    path: '/names',
    component: Names,
    props: true,
    name: 'names',
    meta: {
      title: 'names',
    },
  },
  {
    name: 'auction-bid',
    path: '/auction-bid',
    component: AuctionBid,
    props: true,
    meta: {
      title: 'bidding',
      notPersist: true,
    },
  },
  {
    path: '/networks',
    component: Networks,
    props: true,
    meta: {
      title: 'networks',
    },
  },
  {
    path: '/comment',
    component: CommentNew,
    meta: {
      title: 'comment-new',
      notPersist: true,
    },
  },
  {
    name: 'donate-error',
    path: '/donate-error',
    component: DonateError,
    props: true,
    meta: {
      title: 'donate-error',
      notPersist: true,
    },
  },
  {
    path: '/tokens',
    component: Tokens,
    meta: {
      title: 'fungible-tokens',
    },
  },
  {
    path: '/deploy-token',
    component: DeployToken,
    meta: {
      title: 'deploy-token',
      notPersist: true,
    },
  },
  {
    path: '/add-token',
    component: AddToken,
    meta: {
      title: 'add-token',
      notPersist: true,
    },
  },
  {
    path: '/mint-token',
    component: MintToken,
    meta: {
      title: 'mint-burn-token',
      notPersist: true,
    },
  },
  {
    path: '/allowances',
    component: Allowances,
    meta: {
      title: 'allowances',
      notPersist: true,
    },
  },
  {
    path: '/manage-allowances/:type',
    name: 'manage-allowances',
    component: ManageAllowances,
    props: true,
    meta: {
      title: 'allowances',
      notPersist: true,
    },
  },
  {
    path: '/all-allowances',
    component: AllAllowances,
    meta: {
      title: 'allowances',
      notPersist: true,
    },
  },
  {
    name: 'not-found',
    path: '*',
    component: NotFound,
    meta: {
      ifNotAuth: true,
    },
  },
];
