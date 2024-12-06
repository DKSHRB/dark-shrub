
document.addEventListener("DOMContentLoaded", async () => {
    const connectWalletButton = document.getElementById("connect-wallet-button");
    const walletAddressDisplay = document.getElementById("wallet-address");

    let web3Modal;
    let provider;

    async function initWeb3Modal() {
        const Web3Modal = window.Web3Modal.default;
        const WalletConnectProvider = window.WalletConnectProvider.default;
        const evmChains = window.evmChains;

        web3Modal = new Web3Modal({
            cacheProvider: false, // optional
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                        infuraId: "YOUR_INFURA_PROJECT_ID" // required
                    }
                }
            }
        });
    }

    async function connectWallet() {
        try {
            provider = await web3Modal.connect();
            const web3 = new Web3(provider);

            const accounts = await web3.eth.getAccounts();
            const walletAddress = accounts[0];

            walletAddressDisplay.style.display = "block";
            walletAddressDisplay.textContent = `Connected Wallet: ${walletAddress}`;
            connectWalletButton.textContent = "Connected";
            connectWalletButton.disabled = true;
        } catch (error) {
            alert('Error: Could not connect to wallet. Please check your wallet settings and try again.');
        }
    }

    connectWalletButton.addEventListener("click", async () => {
        await connectWallet();
    });

    await initWeb3Modal();
});
