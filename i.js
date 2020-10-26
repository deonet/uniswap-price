const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const dbjson=
'C:/g/skim/public/db2.json';
const adapter = new FileSync(dbjson)	
const db = low(adapter)

let sleep2 = 1*60



const {
     ChainId,
     Token,
     WETH,
     Fetcher,
     Route,
     Trade,
     TokenAmount,
     TradeType
 } = require('@uniswap/sdk')
 const {
     getNetwork
 } = require('@ethersproject/networks')

 const {
     getDefaultProvider,
     InfuraProvider
 } = require('@ethersproject/providers')

 const getMidPrice = async (baseToken, baseDecimal, quoteToken, quoteDecimal, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         pair = await Fetcher.fetchPairData(quote, base, network),
         route = await new Route([pair], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6)

     return {
         base2quote: base2quote,
         quote2base: quote2base
     }

 }

 const getExecutionPrice = async (baseToken, baseDecimal, quoteToken, quoteDecimal, tradeAmount, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }
     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         pair = await Fetcher.fetchPairData(quote, base, network),
         route = await new Route([pair], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6),
         trade = new Trade(route, new TokenAmount(base, tradeAmount), TradeType.EXACT_INPUT)

     return trade.executionPrice.toSignificant(6)

 }
 const getMidPriceViaETH = async (baseToken, baseDecimal, quoteToken, quoteDecimal, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         quoteWETH = await Fetcher.fetchPairData(quote, WETH[chainId], network),
         WETHbase = await Fetcher.fetchPairData(WETH[chainId], base, network),
         route = await new Route([WETHbase, quoteWETH], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6)

     return {
         base2quote: base2quote,
         quote2base: quote2base
     }

 }
 const getExecutionPriceViaETH = async (baseToken, baseDecimal, quoteToken, quoteDecimal, tradeAmount, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }
     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
     quoteWETH = await Fetcher.fetchPairData(quote, WETH[chainId], network),
         WETHbase = await Fetcher.fetchPairData(WETH[chainId], base, network),
         route = await new Route([WETHbase, quoteWETH], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6),
         trade = new Trade(route, new TokenAmount(base, tradeAmount), TradeType.EXACT_INPUT)

     return trade.executionPrice.toSignificant(6)

 }

 const getMidPriceViaExactToken = async (baseToken, baseDecimal, quoteToken, quoteDecimal, midToken, midDecimal, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         mid = new Token(chainId, midToken, midDecimal)
         quoteMid = await Fetcher.fetchPairData(quote, mid, network),
         midBase = await Fetcher.fetchPairData(mid, base, network),
         route = await new Route([midBase, quoteMid], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6)

     return {
         base2quote: base2quote,
         quote2base: quote2base
     }

 }
 const getExecutionPriceViaExactToken = async (baseToken, baseDecimal, quoteToken, quoteDecimal, midToken, midDecimal, tradeAmount, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }
     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
 	 mid = new Token(chainId, midToken, midDecimal)
         quoteMid = await Fetcher.fetchPairData(quote, mid, network),
         midBase = await Fetcher.fetchPairData(mid, base, network),
         route = await new Route([midBase, quoteMid], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6),
         trade = new Trade(route, new TokenAmount(base, tradeAmount), TradeType.EXACT_INPUT)

     return trade.executionPrice.toSignificant(6)

 }


 const main = async ( array ) => {
	 
	 /**
	 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 = USDC
	 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 = WETH
	 0x6B175474E89094C44Da98b954EedeAC495271d0F = DAI
	 */
	 let dai = array[1]
	 
     let data
	 	 
	try {
		
		data = await getMidPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, dai , 18
			, 1 , array[0]
		)
        console.log('MidPrice (WETH)',data)
        
        if (data) {
            await updateToken([ dai , data , 
                'MidPrice' ]  )
        }

		 data = await getExecutionPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, 
			dai , 18, "1000000000000000000"
			, 1 , array[0]
		 )
		 console.log('ExecutionPrice',data)
		 data = await getMidPriceViaETH("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6, 
			dai , 18
			 , 1 , array[0]
		 )
		 console.log('MidPriceViaETH',data)

		 data = await getExecutionPriceViaETH("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6, 
			dai , 18, "1000000000"
			 , 1 , array[0]
		 )
		 console.log('ExecutionPriceViaETH',data)
	 
	} catch (error) {
		
	}
	 
 }
 
// main(['c6807416c10d4086977491f564e48de3',''])
 
function scaryClown() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('🤡');
    }, (sleep2 )*1000);
  });
}

async function msg() {

    db.read()

   let tokenCount = await db.get('tokens')
  .size()
  .value();
  console.log('token count:', tokenCount);
  
for (let index = 0; index < 5; index++) {
	//const element = array[index];
	
	let token = await db.get('tokens['+ ((tokenCount-1)-index) +']')
	.value();
	console.log('token:', token.title);

	let a = await main(['c6807416c10d4086977491f564e48de3' , token.addressUniq ])
	
}  

  const msg2 = await scaryClown();
  console.log('Message:', msg2);
  console.log(' \r\n\r ');
  
  msg()
}
msg(); // Message: 🤡 <-- after 2 seconds

async function updateToken(params) {
    let newData = []

    let object = params[1]
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            
            let key2 = params[2] + "_" + (key.toString())
            newData[key2] = element
            console.log( key2 )
            //newData[ key ] = element

        }
    }

    console.log('newData',newData) 

    db.get('tokens')
  .find({ addressUniq: params[0] })
  .assign( newData )
  .write();
    
}


 module.exports = {
     getMidPrice: getMidPrice,
     getExecutionPrice: getExecutionPrice,
     getMidPriceViaETH: getMidPriceViaETH,
     getExecutionPriceViaETH: getExecutionPriceViaETH,
     getMidPriceViaExactToken: getMidPriceViaExactToken,
     getExecutionPriceViaExactToken: getExecutionPriceViaExactToken,
 }
