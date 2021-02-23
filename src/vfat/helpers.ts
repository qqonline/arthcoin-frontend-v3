import { Contract } from 'ethers';
import { ERC20_ABI, UNI_ABI, DSTOKEN_ABI, BALANCER_POOL_ABI, JAR_ABI } from './abis'
import { BaseProvider } from '@ethersproject/providers';
import * as $ from 'jquery'
import * as ethcall from 'ethcall';


export interface IVFatApp {
    provider: BaseProvider
    YOUR_ADDRESS: string,
    ethcallProvider: ethcall.Provider
}

export async function init_ethers(provider: BaseProvider) {
    const App: IVFatApp = {
        provider,
        YOUR_ADDRESS: '0xb85c544A46Dde4c01705E5Cc722462233296dDD5', //(await provider.listAccounts())[0],
        ethcallProvider: new ethcall.Provider()
    }

    await App.ethcallProvider.init(App.provider);

    return App
}


export async function loadSynthetixPool(App: IVFatApp, tokens: any, prices: any, abi: any, address: any, rewardTokenFunction: any, stakeTokenFunction: any) {
    const info = await loadSynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
    return await printSynthetixPool(App, info);
}

export async function loadMultipleSynthetixPools(App: any, tokens: any, prices: any, pools: any[]) {
    let totalStaked = 0;
    const infos = await Promise.all(pools.map(p =>
        loadSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
    for (const i of infos) {
        let p = await printSynthetixPool(App, i);
        totalStaked += p.staked_tvl;
    }
    return { staked_tvl: totalStaked };
}


async function loadSynthetixPoolInfo(App: any, tokens: any, prices: any, stakingAbi: any, stakingAddress: any,
    rewardTokenFunction: any, stakeTokenFunction: any) {
    const STAKING_POOL = new Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }

    var newPriceAddresses = stakeToken.tokens.filter((x: string) =>
        x.toLowerCase() !== "0x0e3cc2c4fb9252d17d07c67135e48536071735d9" && //ARTH can't be retrieved from Coingecko
        !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        if (newPrices[key])
            prices[key] = newPrices[key];
    }

    var newTokenAddresses = stakeToken.tokens.filter((x: string) =>
        !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const calls = [STAKING_MULTI.periodFinish(), STAKING_MULTI.rewardRate()]
    const [periodFinish, rewardRate,] = await App.ethcallProvider.all(calls);
    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;


    return {
        stakingAddress,
        poolPrices,
        stakeTokenAddress,
        rewardTokenAddress,
        stakeTokenTicker,
        rewardTokenTicker,
        stakeTokenPrice,
        rewardTokenPrice,
        weeklyRewards,
        usdPerWeek,
        staked_tvl,
    }
}

export async function printSynthetixPool(App: IVFatApp, info: any) {
    const weeklyAPY = info.usdPerWeek / info.staked_tvl * 100;
    const dailyAPY = weeklyAPY / 7;
    const yearlyAPY = weeklyAPY * 52;


    // if (info.userStaked > 0) {
    //     info.poolPrices.print_contained_price(info.userStaked);
    //     const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
    //     const userDailyRewards = userWeeklyRewards / 7;
    //     const userYearlyRewards = userWeeklyRewards * 52;
    //     console.log(`Estimated ${info.rewardTokenTicker} earnings:`
    //         + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards * info.rewardTokenPrice)})`
    //         + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards * info.rewardTokenPrice)})`
    //         + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards * info.rewardTokenPrice)})`);
    // }

    return {
        weeklyAPY,
        dailyAPY,
        yearlyAPY,
        staked_tvl: info.poolPrices.staked_tvl,
    }
}


function getParameterCaseInsensitive(object: any, key: string) {
    return object[Object.keys(object)
        .find(k => k.toLowerCase() === key.toLowerCase())
    ];
}

function getPoolPrices(tokens: any[], prices: any, pool: any) {
    if (pool.poolTokens != null) return getBalancerPrices(tokens, prices, pool);
    if (pool.token0 != null) return getUniPrices(tokens, prices, pool);
    if (pool.token != null) return getWrapPrices(tokens, prices, pool);
    return getErc20Prices(prices, pool);
}

function getWrapPrices(tokens: any, prices: any, pool: any) {
    const wrappedToken = pool.token;
    if (wrappedToken.token0 != null) { //Uniswap
        const uniPrices = getUniPrices(tokens, prices, wrappedToken);
        // const poolUrl = `http://uniswap.info/pair/${wrappedToken.address}`;
        // const name = `Wrapped UNI <a href='${poolUrl}' target='_blank'>${uniPrices.stakeTokenTicker}</a>`;
        const price = (pool.balance / 10 ** wrappedToken.decimals) * uniPrices.price / (pool.totalSupply / 10 ** pool.decimals);
        const tvl = pool.balance / 1e18 * price;
        const staked_tvl = pool.staked * price;

        return {
            tvl: tvl,
            staked_tvl: staked_tvl,
            price: price,
            stakeTokenTicker: pool.symbol,
        }
    }

    else {
        const tokenPrice = getParameterCaseInsensitive(prices, wrappedToken.address)?.usd;
        const price = (pool.balance / 10 ** wrappedToken.decimals) * tokenPrice / (pool.totalSupply / 10 ** pool.decimals);
        const tvl = pool.balance / 1e18 * price;
        const staked_tvl = pool.staked * price;

        return {
            tvl: tvl,
            staked_tvl: staked_tvl,
            price: price,
            stakeTokenTicker: pool.symbol,

        }
    }
}


function getUniPrices(tokens: any, prices: any, pool: any) {
    var t0 = getParameterCaseInsensitive(tokens, pool.token0);
    var p0 = getParameterCaseInsensitive(prices, pool.token0)?.usd;
    var t1 = getParameterCaseInsensitive(tokens, pool.token1);
    var p1 = getParameterCaseInsensitive(prices, pool.token1)?.usd;
    if (p0 == null && p1 == null) {
        return undefined;
    }
    var q0 = pool.q0 / 10 ** t0.decimals;
    var q1 = pool.q1 / 10 ** t1.decimals;
    if (p0 == null) {
        p0 = q1 * p1 / q0;
        prices[pool.token0] = { usd: p0 };
    }
    if (p1 == null) {
        p1 = q0 * p0 / q1;
        prices[pool.token1] = { usd: p1 };
    }
    var tvl = q0 * p0 + q1 * p1;
    var price = tvl / pool.totalSupply;
    prices[pool.address] = { usd: price };
    var staked_tvl = pool.staked * price;
    const stakeTokenTicker = `[${t0.symbol}]-[${t1.symbol}]`;
    return {
        t0: t0,
        p0: p0,
        q0: q0,
        t1: t1,
        p1: p1,
        q1: q1,
        price: price,
        tvl: tvl,
        staked_tvl: staked_tvl,
        stakeTokenTicker: stakeTokenTicker,

    }
}


async function getUniPool(app: IVFatApp, pool: any, poolAddress: any, stakingAddress: any) {
    const decimals = await pool.decimals();
    const token0 = await pool.token0();
    const token1 = await pool.token1();
    let q0, q1, is1inch;
    try {
        const reserves = await pool.getReserves();
        q0 = reserves._reserve0;
        q1 = reserves._reserve1;
        is1inch = false;
    }
    catch { //for 1inch
        const c0 = new Contract(token0, ERC20_ABI, app.provider);
        const c1 = new Contract(token1, ERC20_ABI, app.provider);
        q0 = await c0.balanceOf(poolAddress);
        q1 = await c1.balanceOf(poolAddress);
        is1inch = true;
    }
    return {
        symbol: await pool.symbol(),
        name: await pool.name(),
        address: poolAddress,
        token0: token0,
        q0,
        token1: token1,
        q1,
        totalSupply: await pool.totalSupply() / 10 ** decimals,
        stakingAddress: stakingAddress,
        staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
        decimals: decimals,
        unstaked: await pool.balanceOf(app.YOUR_ADDRESS) / 10 ** decimals,
        contract: pool,
        tokens: [token0, token1],
        is1inch
    };
}

function getErc20Prices(prices: any, pool: any) {
    var price = getParameterCaseInsensitive(prices, pool.address)?.usd;
    var staked_tvl = pool.staked * price;
    return {
        staked_tvl: staked_tvl,
        price: price,
        stakeTokenTicker: pool.symbol,
    }
}

async function getToken(app: any, tokenAddress: any, stakingAddress: any) {
    try {
        const pool = new Contract(tokenAddress, UNI_ABI, app.provider);
        const uniPool = await getUniPool(app, pool, tokenAddress, stakingAddress);
        return uniPool;
    }
    catch (err) {
    }
    try {
        const bal = new Contract(tokenAddress, BALANCER_POOL_ABI, app.provider);
        const tokens = await bal.getFinalTokens();
        const balPool = await getBalancerPool(app, bal, tokenAddress, stakingAddress, tokens);
        return balPool;
    }
    catch (err) {
    }
    try {
        const jar = new Contract(tokenAddress, JAR_ABI, app.provider);
         return await getJar(app, jar, tokenAddress, stakingAddress);
    }
    catch (err) {
    }
    try {
        const erc20 = new Contract(tokenAddress, ERC20_ABI, app.provider);
        const erc20tok = await getErc20(app, erc20, tokenAddress, stakingAddress);
        return erc20tok;
    }
    catch (err) {
    }
    const dsToken = new Contract(tokenAddress, DSTOKEN_ABI, app.provider);
    return await getDSToken(app, dsToken, tokenAddress, stakingAddress);
}

async function getBalancerPool(app: { YOUR_ADDRESS: any; }, pool: Contract, poolAddress: any, stakingAddress: any, tokens: { map: (arg0: (t: any) => Promise<{ address: any; weight: number; balance: any; }>) => readonly [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]; }) {
    const decimals = await pool.decimals();
    const poolTokens = await Promise.all(tokens.map(async (t: any) => {
        return {
            address: t,
            weight: await pool.getNormalizedWeight(t) / 1e18,
            balance: await pool.getBalance(t)
        };
    }));
    return {
        symbol: await pool.symbol(),
        name: await pool.name(),
        address: poolAddress,
        poolTokens: poolTokens, //address, weight and balance
        totalSupply: await pool.totalSupply() / 10 ** decimals,
        stakingAddress: stakingAddress,
        staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
        decimals: decimals,
        unstaked: await pool.balanceOf(app.YOUR_ADDRESS) / 10 ** decimals,
        contract: pool,
        tokens: tokens //just the token addresses to conform with the other pool types
    };
}

async function getJar(app: { YOUR_ADDRESS: any; }, jar: Contract, address: any, stakingAddress: any) {
    const decimals = await jar.decimals();
    const token: any = await getToken(app, await jar.token(), address);
    return {
        address: address,
        name: await jar.name(),
        symbol: await jar.symbol(),
        totalSupply: await jar.totalSupply(),
        decimals: decimals,
        staked: await jar.balanceOf(stakingAddress) / 10 ** decimals,
        unstaked: await jar.balanceOf(app.YOUR_ADDRESS) / 10 ** decimals,
        token: token,
        balance: await jar.balance(),
        contract: jar,
        tokens: token.tokens
    }
}

async function getErc20(app: any, token: any, address: any, stakingAddress: any) {
    const decimals = await token.decimals();
    const staked = await token.balanceOf(stakingAddress);
    const unstaked = await token.balanceOf(app.YOUR_ADDRESS);
    const ret = {
        address: address,
        name: await token.name(),
        symbol: await token.symbol(),
        totalSupply: await token.totalSupply(),
        decimals: decimals,
        staked: staked / 10 ** decimals,
        unstaked: unstaked / 10 ** decimals,
        contract: token,
        tokens: [address]
    };
    return ret;
}

async function getDSToken(app: any, token: any, address: any, stakingAddress: any) {
    const decimals = await token.decimals();
    const staked = await token.balanceOf(stakingAddress);
    const unstaked = await token.balanceOf(app.YOUR_ADDRESS);
    const ret = {
        address: address,
        name: hex_to_ascii(await token.name()),
        symbol: hex_to_ascii(await token.symbol()),
        totalSupply: await token.totalSupply(),
        decimals: decimals,
        staked: staked / 10 ** decimals,
        unstaked: unstaked / 10 ** decimals,
        contract: token,
        tokens: [address]
    };
    return ret;
}

function hex_to_ascii(str1: any) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}


function getBalancerPrices(tokens: any, prices: any, pool: any) {
    var poolTokens = pool.poolTokens.map((t: { address: string; }) => getParameterCaseInsensitive(tokens, t.address));
    var poolPrices = pool.poolTokens.map((t: { address: string; }) => getParameterCaseInsensitive(prices, t.address)?.usd);
    var quantities = poolTokens.map((t: { decimals: number; }, i: string | number) => pool.poolTokens[i].balance / 10 ** t.decimals);
    var missing = poolPrices.filter((x: any) => !x);
    if (missing.length == poolPrices.length) {
        // eslint-disable-next-line no-throw-literal
        throw 'Every price is missing';
    }
    var notMissing = poolPrices.findIndex((p: any) => p);
    const getMissingPrice = (missingQuantity: any, missingWeight: any) =>
        quantities[notMissing] * poolPrices[notMissing] * missingWeight
        / pool.poolTokens[notMissing].weight / missingQuantity;
    missing.map((_: any, i: string | number) => {
        const newPrice = getMissingPrice(quantities[i], pool.poolTokens[i].weight);
        poolPrices[i] = newPrice;
        prices[poolTokens[i].address] = { usd: newPrice };
    });

    var tvl = poolPrices.map((p: number, i: string | number) => p * quantities[i]).reduce((x: any, y: any) => x + y, 0);
    var price = tvl / pool.totalSupply;
    prices[pool.address] = { usd: price };
    var staked_tvl = pool.staked * price;
    var tickers = pool.poolTokens.map((pt: { weight: number; }, i: string | number) => `[${poolTokens[i].symbol} ${pt.weight * 100}%]`)
    const stakeTokenTicker = tickers.join('-');
    return {
        tokens: poolTokens,
        prices: poolPrices,
        quantities: quantities,
        price: price,
        tvl: tvl,
        staked_tvl: staked_tvl,
        stakeTokenTicker: stakeTokenTicker,

    }
}



const lookUpTokenPrices = async function (id_array: any) {
    let ids = id_array.join('%2C')
    return $.ajax({
        url: 'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + ids + '&vs_currencies=usd',
        type: 'GET',
    })
}
