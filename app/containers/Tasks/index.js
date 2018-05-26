import React, { Component } from 'react';
import { apiFindTaskList } from './api';

export default class Tasks extends Component {
  componentDidMount = () => {
    apiFindTaskList();
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
      </div>
    );
  }
}
