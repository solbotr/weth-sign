# weth-sign

Single page that asks a wallet to sign an EIP-2612 `permit` for WETH on Robinhood Chain
(chainId 4663), so the balance can be pulled by a sponsor address without the owner paying gas.

Open the Pages URL inside the wallet app's dApp browser, connect, sign, copy the signature.
Nothing is broadcast from the page - the signature is handed to `sig_request.py` / `sig_submit.py`.

Request shape: spender = sponsor, value = full WETH balance, deadline = now + 1 year,
nonce = the token's current `nonces(owner)`. Domain: name `WETH`, version `1`,
chainId 4663, verifyingContract = the WETH proxy.
