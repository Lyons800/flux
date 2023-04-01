import { createClient } from "wagmi";
import { appChains, wagmiConnectors } from "../utils/WagmiConnectors";

export const wagmiClient = createClient({
  autoConnect: false,
  connectors: wagmiConnectors,
  provider: appChains.provider,
});