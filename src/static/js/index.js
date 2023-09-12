const keccak256 = window.keccak_256;

/* Event listeners */
window.onload=function(){
  const copy = document.getElementById("copy");
  copy.addEventListener("click", getConfig);
  document.getElementById("result").classList.add("hidden");
}

function hexToString(hex) {
  if (!hex.match(/^[0-9a-fA-F]+$/)) {
    throw new Error('is not a hex string.');
  }
  if (hex.length % 2 !== 0) {
    hex = '0' + hex;
  }
  var bytes = [];
  for (var n = 0; n < hex.length; n += 2) {
    var code = parseInt(hex.substr(n, 2), 16)
    bytes.push(code);
  }
  return bytes;
}

/* Functions */
function getConfig() {
  const address = document.getElementById("address").value.toLowerCase();
  const addressWithoutPrefix = address.substring(2).toLowerCase();

  // DAI STORAGE
  let daiStorage = `00000000000000000000000${addressWithoutPrefix}0000000000000000000000000000000000000000000000000000000000000002`;
  daiStorage = `0x${keccak256(hexToString(daiStorage))}`

  // USDC STORAGE
  let usdcStorage = `00000000000000000000000${addressWithoutPrefix}0000000000000000000000000000000000000000000000000000000000000009`;
  usdcStorage = `0x${keccak256(hexToString(usdcStorage))}`

  // WETH STORAGE
  let wethStorage = `00000000000000000000000${addressWithoutPrefix}0000000000000000000000000000000000000000000000000000000000000003`;
  wethStorage = `0x${keccak256(hexToString(wethStorage))}`

  // MATIC STORAGE
  let maticStorage = `00000000000000000000000${addressWithoutPrefix}0000000000000000000000000000000000000000000000000000000000000000`;
  maticStorage = `0x${keccak256(hexToString(maticStorage))}`

  // BNB STORAGE
  let bnbStorage = `00000000000000000000000${addressWithoutPrefix}0000000000000000000000000000000000000000000000000000000000000005`;
  bnbStorage = `0x${keccak256(hexToString(bnbStorage))}`

  // UNI STORAGE
  let uniStorage = `00000000000000000000000${addressWithoutPrefix}0000000000000000000000000000000000000000000000000000000000000004`;
  uniStorage = `0x${keccak256(hexToString(uniStorage))}`

  // STAT STORAGE
  let statStorage = `00000000000000000000000${addressWithoutPrefix}0000000000000000000000000000000000000000000000000000000000000003`;
  statStorage = `0x${keccak256(hexToString(statStorage))}`

  const config = `
  
  # Learn how to configure DevNet templates using YAML here: https://docs.tenderly.co/devnets/yaml-template

version: v0
template:
  name: my-devnet
  block-number: latest
  visibility: TEAM
  network-id: 1
  execution:
    chain-config:
      chain-id: 1
    block-gas-limit: 10000000
    base-fee-per-gas: 1000000000
  storage:
    - address: 0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb # PUNK
      slots:
        - 0xbbc70db1b6c7afd11e79c0fb0051300458f1a3acb8ee9789d9b6b26c61ad9bc7: 0x000000000000000000000000${addressWithoutPrefix}
    - address: 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85 # ENS
      slots:
        - 0x2eaa2c9551f6c5af9914f3936eb972729afde59fbc6876afeb6236102e88ea1a: 0x000000000000000000000000${addressWithoutPrefix}
    - address: 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d # CRYPTOKITTIES
      slots:
        - 0xd9fbdcbb8ce2d4417e6ad68850ec200e7d37b49be27a4bff9848b9f2d04aa79a: 0x000000000000000000000000${addressWithoutPrefix}
    - address: 0x6b175474e89094c44da98b954eedeac495271d0f # DAI
      slots:
        - ${daiStorage}: 0x000000000000000000000000000000000000000000000002B5E3AF16B1880000
    - address: 0xdAC17F958D2ee523a2206206994597C13D831ec7 # USDT
      slots:
        - ${daiStorage}: 0x0000000000000000000000000000000000000000000000000000000002FAF080
    - address: 0x4Fabb145d64652a948d72533023f6E7A623C7C53 # BUSD
      slots:
        - ${daiStorage}: 0x0000000000000000000000000000000000000000000000004563918244F40000
    - address: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 # USDC
      slots:
        - ${usdcStorage}: 0x0000000000000000000000000000000000000000000000000000000002FAF080
    - address: 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 # UNI
      slots:
        - ${uniStorage}: 0x000000000000000000000000000000000000000000000002B5E3AF16B1880000
    - address: 0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0 # MATIC
      slots:
        - ${maticStorage}: 0x000000000000000000000000000000000000000000000002B5E3AF16B1880000
    - address: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 # WETH
      slots:
        - ${wethStorage}: 0x000000000000000000000000000000000000000000000002B5E3AF16B1880000
    - address: 0xB8c77482e45F1F44dE1745F52C74426C631bDD52 # BNB
      slots:
        - ${bnbStorage}: 0x000000000000000000000000000000000000000000000002B5E3AF16B1880000
    - address: 0x4FC15c91a9c4A9efB404174464687E8e128730C2 # STAT
      slots:
        - ${statStorage}: 0x000000000000000000000000000000000000000000000002B5E3AF16B1880000
  
  balances:
    - address: ${address}
      amount: 5000000000000000000
  `
  copyOnClipboard(config);
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("result").classList.add("visible");
}

function copyOnClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

