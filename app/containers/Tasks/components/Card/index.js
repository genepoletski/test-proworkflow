// Model custom card component taken from:
// https://github.com/rcdexta/react-trello
import React from 'react';
import PropTypes from 'prop-types';

Card.propTypes = {
  cardColor: PropTypes.string,
  escalationText: PropTypes.string,
  name: PropTypes.string,
  projecttitle: PropTypes.string,
  timeallocated: PropTypes.number,
  timetracked: PropTypes.number,
};

Card.defaultProps = {
  escalationText: '',
  name: '',
  projecttitle: '',
};

export default function Card(props) {
  const {
    timeallocated: allocatedTime,
    timetracked: spentTime,
  } = props;

  let dueTime = 0;

  if (allocatedTime && spentTime > allocatedTime) {
    dueTime = Math.abs(allocatedTime - spentTime);
  }

  let leftTime;

  if (allocatedTime) {
    leftTime = allocatedTime - spentTime;
  }

  return (
    <div>
      <header
        style={{
          borderBottom: '1px solid #eee',
          paddingBottom: 6,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: props.cardColor,
        }}
      >
        <div
          style={{
            paddingLeft: 4,
            paddingTop: 2,
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          {props.name}
        </div>

      </header>

      <div
        style={{
          fontSize: 12,
        }}
      >

        {/* ----- PROJECT TITLE ----- */}
        <div
          style={{
            paddingLeft: 4,
            fontWeight: 700,
          }}
        >
          {props.projecttitle}
        </div>

        {/* ----- TIME SPENT ----- */}
        <tcaption
          style={{
            display: 'inline-block',
            marginTop: 8,
            marginLeft: 4,
          }}
        >Time</tcaption>
        <table
          style={{
            marginTop: 4,
            marginLeft: 4,
            marginRight: 4,
            width: '100%',
          }}
        >
          <tbody
            style={{
              borderTop: '1px solid rgb(150,150,150)',
            }}
          >
            <tr>
              <td>spent</td>
              <td
                style={{
                  textAlign: 'center',
                }}
              >{spentTime}</td>
            </tr>

            <tr>
              <td>allocated</td>
              <td
                style={{
                  textAlign: 'center',
                }}
              >{allocatedTime}</td>
            </tr>

            {!dueTime ? (
              <tr
                style={{
                  borderTop: '1px solid rgb(150,150,150)',
                  color: leftTime ? 'rgb(60,118,61)' : '',
                }}
              >
                <td>left</td>
                <td
                  style={{
                    textAlign: 'center',
                  }}
                >{leftTime || 'n/a'}</td>
              </tr>
            ) : (
              <tr
                style={{
                  borderTop: '1px solid rgb(150,150,150)',
                  color: 'rgb(169,68,66)',
                }}
              >
                <td>due</td>
                <td
                  style={{
                    textAlign: 'center',
                  }}
                >{dueTime}</td>
              </tr>
            )}
          </tbody>
        </table>

        {}

        <div
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: props.cardColor,
            fontSize: 15,
            fontWeight: 'bold',
          }}
        >
          {props.escalationText}
        </div>
      </div>
    </div>
  );
}
