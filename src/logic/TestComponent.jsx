/**
 * @jsx React.DOM
*/

(function() {
  'use strict';
  var React = require('react'),
    Paper        = mui.Paper, 
    FlatButton   = mui.FlatButton,
    RaisedButton = mui.RaisedButton,
    DatePicker   = mui.DatePicker;


  var SomeAwesomeComponent = React.createClass({

    render: function() {
      return (
          <Paper zDepth='2'>
              <FlatButton label="Cool" />
              <RaisedButton label="Cool" />
              <DatePicker hintText="Choose Date" />
          </Paper>
      );
    }

  });

  module.exports = SomeAwesomeComponent;
})();