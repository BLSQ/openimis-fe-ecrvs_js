import messages_en from "./translations/en.json";
import reducer from "./reducer";
import EcrvsMainMenu from "./menu/EcrvsMainMenu";
import HeraNotificationsPage from "./pages/HeraNotificationsPage";

const ROUTE_HERA_NOTIFICATIONS = "ecrvs/heraNotifications";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "reducers": [{ key: 'ecrvs', reducer }],
  "core.MainMenu": [EcrvsMainMenu],
  "core.Router": [
    { path: ROUTE_HERA_NOTIFICATIONS, component: HeraNotificationsPage },
  ],
}

export const EcrvsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}
