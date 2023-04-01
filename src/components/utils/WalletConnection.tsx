import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button } from "@chakra-ui/react";
import { configureChains, mainnet } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
 
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)

export function WalletConnection() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <Button variant="ghost" height="80%" px="5px" ml="16px">
        Connected to {address}
        <Button onClick={() => disconnect()} ml="4px">
          Disconnect
        </Button>
      </Button>
    )
  return (
    <Button
      variant="ghost"
      height="80%"
      px="5px"
      ml="16px"
      onClick={() => connect()}
    >
      Connect Wallet
    </Button>
  )
}
