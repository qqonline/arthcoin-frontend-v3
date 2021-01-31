import { EventEmitter } from 'events'
const multicall = require('@makerdao/multicall')


interface IMulticallInput {
    key: string
    target: string
    call: (string | number)[]
    convertResult: (val: any) => any
}


export default class Multicall extends EventEmitter {
    calls: IMulticallInput[] = []
    watcher: any
    rpcUrl: string

    constructor(rpcUrl: string) {
        super()
        this.rpcUrl = rpcUrl
        this.calls = []
        this.recreateWatcher()
    }


    addCall = (data: IMulticallInput): string => {
        this.calls.push(data)
        this.recreateWatcher()
        this.watcher.tap(() => this.getMutlicallCalls([data]))
        return data.key
    }

    addCalls = (data: IMulticallInput[]): string[] => {
        data.forEach(d => this.calls.push(d))
        this.recreateWatcher()
        this.watcher.tap(() => this.getMutlicallCalls(data))
        return data.map(d => d.key)
    }

    private getMutlicallCalls = (calls: IMulticallInput[]) => {
        return calls.map(c => ({
            target: c.target,
            call: c.call,
            returns: [[c.key, c.convertResult]]
        }))
    }

    private processUpdates = (update: { type: any; value: any; }) => {
        console.log(`multi Update: ${update.type} = ${update.value}`);
        this.emit(update.type, update.value)
    }

    private recreateWatcher = () => {
        if (this.watcher) this.watcher.stop()

        const config = {
            rpcUrl: this.rpcUrl,
            multicallAddress: "0xeefba1e63905ef1d7acba5a8513c70307c1ce441"
        };

        console.log(this.getMutlicallCalls(this.calls))
        this.watcher = multicall.createWatcher(this.getMutlicallCalls(this.calls), config)
        this.watcher.subscribe(this.processUpdates);

        // Start the watcher polling
        this.watcher.start();

    }
}