import messages_en from "./translations/en.json";
import reducer from "./reducer";
import EcrvsMainMenu from "./menu/EcrvsMainMenu";
import HeraNotificationsPage from "./pages/HeraNotificationsPage";
import HeraSubscriptionsPage from "./pages/HeraSubscriptionsPage";

const ROUTE_HERA_NOTIFICATIONS = "ecrvs/heraNotifications";
const ROUTE_HERA_SUBSCRIPTIONS = "ecrvs/heraSubscriptions";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "reducers": [{ key: 'ecrvs', reducer }],
  "core.MainMenu": [EcrvsMainMenu],
  "core.Router": [
    { path: ROUTE_HERA_NOTIFICATIONS, component: HeraNotificationsPage },
    { path: ROUTE_HERA_SUBSCRIPTIONS, component: HeraSubscriptionsPage },
  ],
}

export const EcrvsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}
