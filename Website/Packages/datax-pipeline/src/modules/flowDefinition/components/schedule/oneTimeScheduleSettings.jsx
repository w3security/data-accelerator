// *********************************************************************
// Copyright (c) Microsoft Corporation.  All rights reserved.
// Licensed under the MIT License
// *********************************************************************
import React from 'react';
import PropTypes from 'prop-types';
import * as Helpers from '../../flowHelpers';
import * as Models from '../../flowModels';
import { TextField, Label, Dropdown } from 'office-ui-fabric-react';

export default class OneTimeScheduleSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={rootStyle}>
                {this.renderAlias()}
                {this.renderTimeRange()}
                {this.renderInterval()}
                {this.renderWindow()}
            </div>
        );
    }

    renderAlias() {
        return (
            <div style={sectionStyle}>
                <TextField
                    className="ms-font-m info-settings-textbox"
                    spellCheck={false}
                    label="Alias"
                    value={this.props.batch.id}
                    onChange={(event, value) => this.props.onUpdateBatchName(value)}
                    onGetErrorMessage={value => this.validateProperty(value)}
                />
            </div>
        );
    }

    renderTimeRange() {
        return (
            <div >
                {this.renderStartTime()}
                {this.renderEndTime()}
            </div>
        );
    }
    
    renderStartTime() {
        return (
            <div style={sectionStyle}>
                <TextField
                    className="ms-font-m"
                    spellCheck={false}
                    label="StartTime"
                    placeholder="required for One Time"
                    value={this.props.batch.properties.startTime}
                    onChange={(event, value) => this.props.onUpdateBatchStartTime(value)}
                    // disabled={!this.props.inputEventHubEnabled}
                />
            </div>
        );
    }

    renderEndTime() {
        return (
            <div style={sectionStyle}>
                <TextField
                    className="ms-font-m"
                    spellCheck={false}
                    label="EndTime"
                    placeholder="required for One Time"
                    value={this.props.batch.properties.endTime}
                    onChange={(event, value) => this.props.onUpdateBatchEndTime(value)}
                    // disabled={!this.props.inputEventHubEnabled}
                />
            </div>
        );
    }

    renderInterval() {
        return (
            <div style={watermarkContainerStyle}>
                {this.renderIntervalText()}
                {this.renderIntervalTypeDropdown()}
            </div>
        );
    }

    renderIntervalText() {
        return (
            <div style={watermarkValueStyle}>
                <TextField
                    className="ms-font-m"
                    spellCheck={false}
                    label="Interval"
                    value={this.props.batch.properties.interval}
                    onChange={(event, value) => this.props.onUpdateBatchIntervalValue(value)}
                />
            </div>
        );
    }

    renderIntervalTypeDropdown() {
        const options = Models.batchIntervalTypes.map(type => {
            return {
                key: type.key,
                text: type.name,
                disabled: type.disabled
            };
        });

        return (
            <div style={watermarkUnitDropdownStyle}>
                <Label className="ms-font-m">Unit</Label>
                <Dropdown
                    className="ms-font-m"
                    options={options}
                    selectedKey={this.props.batch.properties.intervalType}
                    onChange={(event, selection) => this.props.onUpdateBatchIntervalType(selection.key)}
                />
            </div>
        );
    }

    renderWindow() {
        return (
            <div style={watermarkContainerStyle}>
                {this.renderWindowText()}
                {this.renderWindowDropdown()}
            </div>
        );
    }

    renderWindowText() {
        return (
                
            <div style={watermarkValueStyle}>
                <TextField
                    className="ms-font-m"
                    spellCheck={false}
                    label="Window"
                    value={this.props.batch.properties.window}
                    onChange={(event, value) => this.props.onUpdateBatchWindowValue(value)}
                />
            </div>
        );
    }

    renderWindowDropdown() {
        const options = Models.batchIntervalTypes.map(type => {
            return {
                key: type.key,
                text: type.name,
                disabled: type.disabled
            };
        });

        return (
            <div style={watermarkUnitDropdownStyle}>
                <Label className="ms-font-m">Unit</Label>
                <Dropdown
                    className="ms-font-m"
                    options={options}
                    selectedKey={this.props.batch.properties.windowType}
                    onChange={(event, selection) => this.props.onUpdateBatchWindowType(selection.key)}
                />
            </div>
        );
    }

    validateProperty(value) {
        if (value === '') return '';
        return !Helpers.isNumberAndStringOnly(value) ? 'Letters, numbers, and underscores only' : '';
    }
}

// Props
OneTimeScheduleSettings.propTypes = {
    batch: PropTypes.object.isRequired,

    // functions
    onUpdateBatchName: PropTypes.func.isRequired,
    onUpdateBatchStartTime: PropTypes.func.isRequired,
    onUpdateBatchEndTime: PropTypes.func.isRequired,
    onUpdateBatchIntervalValue: PropTypes.func.isRequired,
    onUpdateBatchIntervalType: PropTypes.func.isRequired,
    onUpdateBatchWindowValue: PropTypes.func.isRequired,
    onUpdateBatchWindowType: PropTypes.func.isRequired,
};

// Styles
const rootStyle = {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30
};

const sectionStyle = {
    paddingBottom: 15
};


const watermarkContainerStyle = {
    display: 'flex',
    flexDirection: 'row'
};


const watermarkValueStyle = {
    flex: 1,
    marginRight: 10
};


const watermarkUnitDropdownStyle = {
    flex: 1,
    paddingBottom: 15
};