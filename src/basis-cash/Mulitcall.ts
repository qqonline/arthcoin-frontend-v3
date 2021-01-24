// import { createWatcher } from '@makerdao/multicall';
// import { EventEmitter } from 'ev';


interface IMulticallInput {
    target: string
    call: (string | number)[]
    returns: [string, ((val: any) => void)][]
}


// Contract addresses used in this example
const MKR_TOKEN = '0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd';
const MKR_WHALE = '0xdb33dfd3d61308c33c63209845dad3e6bfb2c674';
const MKR_FISH = '0x2dfcedcb401557354d0cf174876ab17bfd6f4efd';


export default class Multicall  {
    calls: IMulticallInput[]
    watcher: any
    rpcUrl: string

    constructor(rpcUrl: string) {
        // super()

        this.rpcUrl = rpcUrl
        this.calls = [
            {
                target: MKR_TOKEN,
                call: ['balanceOf(address)(uint256)', MKR_WHALE],
                returns: [['BALANCE_OF_MKR_WHALE', val => val / 10 ** 18]]
            }
        ]

        this.recreateWatcher()
    }


    addCall = (data: IMulticallInput): string => {
        this.calls.push(data)
        this.recreateWatcher()

        return ''
    }

    // removeCall
    recreateWatcher = () => {
        const config = {
            rpcUrl: this.rpcUrl,
            // multicallAddress: '0xc49ab4d7de648a97592ed3d18720e00356b4a806'
        };

        // createWatcher(this.calls, config)
    }
}