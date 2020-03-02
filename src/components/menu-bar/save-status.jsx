import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import InlineMessages from '../../containers/inline-messages.jsx';

import {
    manualUpdateProject
} from '../../reducers/project-state';

import {
    filterInlineAlerts
} from '../../reducers/alerts';

import styles from './save-status.css';

// Wrapper for inline messages in the nav bar, which are all related to saving.
// Show any inline messages if present, else show the "Save Now" button if the
// project has changed.
// We decided to not use an inline message for "Save Now" because it is a reflection
// of the project state, rather than an event.
const SaveStatus = ({
    alertsList,
    projectChanged,
    onClickSave
}) => (
    filterInlineAlerts(alertsList).length > 0 ? (
        <InlineMessages />
    ) : projectChanged && (
        <div
            className={styles.saveNow}
            onClick={onClickSave}
        >
            <img className="icon" draggable="false"
                 style={{marginRight:6}}
                 src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTdweCIgaGVpZ2h0PSIxN3B4IiB2aWV3Qm94PSIwIDAgMTcgMTciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5ICg1MTAwMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+c2F2ZUAyeDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJTY3JhdGNoMy4wIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjgiPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNjcuMDAwMDAwLCAtMTQuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiBpZD0ic2F2ZSI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2OC4wMDAwMDAsIDE1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTEwLjUyMjY3MzIsMC43NSBMMS42NjY2NjY2NywwLjc1IEMxLjE2MDQwNTY1LDAuNzUgMC43NSwxLjE2MDQwNTY1IDAuNzUsMS42NjY2NjY2NyBMMC43NSwxMy4zMzMzMzMzIEMwLjc1LDEzLjgzOTU5NDQgMS4xNjA0MDU2NSwxNC4yNSAxLjY2NjY2NjY3LDE0LjI1IEwxMy4zMzMzMzMzLDE0LjI1IEMxMy44Mzk1OTQ0LDE0LjI1IDE0LjI1LDEzLjgzOTU5NDQgMTQuMjUsMTMuMzMzMzMzMyBMMTQuMjUsNC40NzczMjY4NCBMMTAuNTIyNjczMiwwLjc1IFogTTEzLjMzMzMzMzMsMTUuNzUgTDEuNjY2NjY2NjcsMTUuNzUgQzAuMzMxOTc4NTIxLDE1Ljc1IC0wLjc1LDE0LjY2ODAyMTUgLTAuNzUsMTMuMzMzMzMzMyBMLTAuNzUsMS42NjY2NjY2NyBDLTAuNzUsMC4zMzE5Nzg1MjEgMC4zMzE5Nzg1MjEsLTAuNzUgMS42NjY2NjY2NywtMC43NSBMMTAuODMzMzMzMywtMC43NSBDMTEuMDMyMjQ1NywtMC43NSAxMS4yMjMwMTExLC0wLjY3MDk4MjM3IDExLjM2MzY2MzQsLTAuNTMwMzMwMDg2IEwxNS41MzAzMzAxLDMuNjM2MzM2NTggQzE1LjY3MDk4MjQsMy43NzY5ODg4NiAxNS43NSwzLjk2Nzc1NDMgMTUuNzUsNC4xNjY2NjY2NyBMMTUuNzUsMTMuMzMzMzMzMyBDMTUuNzUsMTQuNjY4MDIxNSAxNC42NjgwMjE1LDE1Ljc1IDEzLjMzMzMzMzMsMTUuNzUgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMy43NSw4Ljc1IEwzLjc1LDE1IEMzLjc1LDE1LjQxNDIxMzYgMy40MTQyMTM1NiwxNS43NSAzLDE1Ljc1IEMyLjU4NTc4NjQ0LDE1Ljc1IDIuMjUsMTUuNDE0MjEzNiAyLjI1LDE1IEwyLjI1LDggQzIuMjUsNy41ODU3ODY0NCAyLjU4NTc4NjQ0LDcuMjUgMyw3LjI1IEwxMSw3LjI1IEMxMS40MTQyMTM2LDcuMjUgMTEuNzUsNy41ODU3ODY0NCAxMS43NSw4IEwxMS43NSwxNSBDMTEuNzUsMTUuNDE0MjEzNiAxMS40MTQyMTM2LDE1Ljc1IDExLDE1Ljc1IEMxMC41ODU3ODY0LDE1Ljc1IDEwLjI1LDE1LjQxNDIxMzYgMTAuMjUsMTUgTDEwLjI1LDguNzUgTDMuNzUsOC43NSBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjc1LDMuMjUgTDEwLDMuMjUgQzEwLjQxNDIxMzYsMy4yNSAxMC43NSwzLjU4NTc4NjQ0IDEwLjc1LDQgQzEwLjc1LDQuNDE0MjEzNTYgMTAuNDE0MjEzNiw0Ljc1IDEwLDQuNzUgTDMsNC43NSBDMi41ODU3ODY0NCw0Ljc1IDIuMjUsNC40MTQyMTM1NiAyLjI1LDQgTDIuMjUsMCBDMi4yNSwtMC40MTQyMTM1NjIgMi41ODU3ODY0NCwtMC43NSAzLC0wLjc1IEMzLjQxNDIxMzU2LC0wLjc1IDMuNzUsLTAuNDE0MjEzNTYyIDMuNzUsMCBMMy43NSwzLjI1IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="/>

            <FormattedMessage
                defaultMessage="Save Now"
                description="Title bar link for saving now"
                id="gui.menuBar.saveNowLink"
            />
        </div>
    ));

SaveStatus.propTypes = {
    alertsList: PropTypes.arrayOf(PropTypes.object),
    onClickSave: PropTypes.func,
    projectChanged: PropTypes.bool
};

const mapStateToProps = state => ({
    alertsList: state.scratchGui.alerts.alertsList,
    projectChanged: state.scratchGui.projectChanged
});

const mapDispatchToProps = dispatch => ({
    onClickSave: () => dispatch(manualUpdateProject())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveStatus);
