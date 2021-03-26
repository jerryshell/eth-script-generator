import React from 'react';
import './App.css';

function App() {
    return (
        <div>
            <div
                className="window"
                style={{width: '600px', margin: '0 auto'}}
            >
                <div className="title-bar">
                    <div className="title-bar-text">
                        ETH Script Generator
                    </div>
                </div>
                <div className="window-body">
                    <div className="field-row-stacked">
                        <label>Miner filepath</label>
                        <input type="text"/>
                    </div>
                    <div className="field-row-stacked">
                        <label>Fake name</label>
                        <input type="text"/>
                    </div>
                    <div className="field-row-stacked">
                        <label>Config</label>
                        <textarea rows={8}/>
                    </div>
                    <div className="field-row-stacked">
                        <label>Config file name</label>
                        <input type="text"/>
                    </div>
                    <div className="field-row-stacked">
                        <label>Kill at</label>
                        <input type="text"/>
                    </div>
                    <div className="field-row-stacked">
                        <label>Script</label>
                        <textarea rows={8}/>
                    </div>
                    <div className="field-row">
                        <button>Copy</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
